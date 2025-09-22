import { useMetadataRepository } from "@features/repository";
import {
  ENCRYPTED_DATA_DONE_TYPE,
  ENCRYPTED_DATA_MESSAGE_TYPE,
  ENCRYPTED_DATA_READY_TYPE,
  ENCRYPTED_DATA_TYPE,
} from "@shares/templete/redirectionTemplete";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

type ChunkInfo = {
  totalChunks: number;
  receivedChunks: number;
  chunks: string[];
};

function useLoadData() {
  const { setMetadata } = useMetadataRepository();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [count, setCount] = useState(0);

  // 파일별 청크 정보 저장 (index: ChunkInfo)
  const chunkMap = useRef<Record<number, ChunkInfo>>({});
  // 완성된 파일 데이터 저장
  const completedFiles = useRef<string[]>([]);

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      // 메시지 타입 확인
      if (event.data.type === ENCRYPTED_DATA_MESSAGE_TYPE) {
        const { index, chunkIndex, totalChunks, data } = event.data;
        // chunkMap에 해당 파일 인덱스가 없으면 초기화
        if (!chunkMap.current[index]) {
          chunkMap.current[index] = {
            totalChunks,
            receivedChunks: 0,
            chunks: Array(totalChunks).fill(""),
          };
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
          completedFiles.current[index] = fileData;
        }
      }

      if (event.data.type === ENCRYPTED_DATA_DONE_TYPE) {
        // 모든 파일 데이터가 완성됐는지 확인
        const total = event.data.total;
        let allDone = true;
        for (let i = 0; i < total; i++) {
          if (!completedFiles.current[i]) {
            allDone = false;
            break;
          }
        }
        if (allDone) {
          // ENCRYPTED_DATA_TYPE에 전체 파일 배열 저장
          setMetadata(ENCRYPTED_DATA_TYPE, completedFiles.current.join(""));
          setDataLoaded(true);
          setDataLoading(false);
        }
      }
    },
    [setMetadata]
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

  return { dataLoaded, dataLoading, count };
}

export { useLoadData };
