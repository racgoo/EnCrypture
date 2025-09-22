import {
  ENCRYPTED_DATA_DONE_TYPE,
  ENCRYPTED_DATA_MESSAGE_TYPE,
  ENCRYPTED_DATA_READY_TYPE,
} from "@shares/templete/redirectionTemplete";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

type ChunkInfo = {
  totalChunks: number;
  receivedChunks: number;
  chunks: string[];
  filename: string;
};

function useLoadData() {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [encryptedFiles, setEncryptedFiles] = useState<string[]>([]);

  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [count, setCount] = useState(0);

  // 파일별 청크 정보 저장 (index: ChunkInfo)
  const chunkMap = useRef<Record<number, ChunkInfo>>({});
  // 완성된 파일 데이터 저장
  const completedFiles = useRef<{ data: string; filename: string }[]>([]);

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      // 메시지 타입 확인
      if (event.data.type === ENCRYPTED_DATA_MESSAGE_TYPE) {
        const { index, chunkIndex, totalChunks, data, filename } = event.data;
        // chunkMap에 해당 파일 인덱스가 없으면 초기화
        if (!chunkMap.current[index]) {
          chunkMap.current[index] = {
            totalChunks,
            receivedChunks: 0,
            chunks: Array(totalChunks).fill(""),
            filename,
          };
        }
        // filename이 있으면 저장(첫 청크에만 올 수도 있으니)
        if (filename && !chunkMap.current[index].filename) {
          chunkMap.current[index].filename = filename;
        }
        // 해당 청크 저장
        chunkMap.current[index].chunks[chunkIndex] = data;
        chunkMap.current[index].receivedChunks += 1;

        // count는 받은 청크 개수로 증가
        setCount((prev) => prev + 1);

        // 모든 청크를 다 받았으면 파일 완성
        if (
          chunkMap.current[index].receivedChunks ===
          chunkMap.current[index].totalChunks
        ) {
          const fileData = chunkMap.current[index].chunks.join("");
          const fileName = chunkMap.current[index].filename || "";
          completedFiles.current[index] = {
            data: fileData,
            filename: fileName,
          };
        }
      }

      if (event.data.type === ENCRYPTED_DATA_DONE_TYPE) {
        // 모든 파일 데이터가 완성됐는지 확인
        const total = event.data.total;
        let allDone = true;
        for (let i = 0; i < total; i++) {
          if (!completedFiles.current[i] || !completedFiles.current[i].data) {
            allDone = false;
            break;
          }
        }
        if (allDone) {
          // 파일명과 데이터 모두 아카이브해서 저장
          setEncryptedFiles(completedFiles.current.map((f) => f.data));
          setFileNames(completedFiles.current.map((f) => f.filename));
          setDataLoaded(true);
          setDataLoading(false);
        }
      }
    },
    [setEncryptedFiles, setFileNames]
  );

  useLayoutEffect(() => {
    setDataLoading(true);
    //handshake
    window.opener.postMessage({ type: ENCRYPTED_DATA_READY_TYPE }, "*");
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [handleMessage]);

  return { dataLoaded, dataLoading, count, encryptedFiles, fileNames };
}

export { useLoadData };
