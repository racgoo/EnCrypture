import type { EncryptionType } from "@features/encrypt";
import { CLIENT_ENCRYPT_TYPE } from "@pages/encrypt/constants";
import {
  ENCRYPTED_DATA_DONE_TYPE,
  ENCRYPTED_DATA_MESSAGE_TYPE,
  ENCRYPTED_DATA_READY_TYPE,
  ENCRYPTION_META_DATA,
} from "@shares/templete/redirectionTemplete";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";

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
  const [dataLoading, setDataLoading] = useState(true);
  const [chunkCount, setChunkCount] = useState(0);
  const [allChunkCount, setAllChunkCount] = useState(Infinity);
  const [invalidNavigation, setInvalidNavigation] = useState(false);
  const [encryptionMetaData, setEncryptionMetaData] = useState<{
    encryptionId: number;
    encryptionType: EncryptionType;
  }>({
    encryptionId: 0,
    encryptionType: CLIENT_ENCRYPT_TYPE,
  });

  // 파일별 청크 정보 저장 (index: ChunkInfo)
  const chunkMap = useRef<Record<number, ChunkInfo>>({});
  // 완성된 파일 데이터 저장
  const completedFiles = useRef<{ data: string; filename: string }[]>([]);

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      if (event.data.type === ENCRYPTION_META_DATA) {
        setEncryptionMetaData(event.data.data);
        return;
      }

      // 메시지 타입 확인
      if (event.data.type === ENCRYPTED_DATA_MESSAGE_TYPE) {
        const {
          index,
          chunkIndex,
          totalChunks,
          data,
          filename,
          allChunkCount,
        } = event.data as {
          index: number;
          chunkIndex: number;
          totalChunks: number;
          data: string;
          filename: string;
          allChunkCount: number;
        };
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
        setChunkCount((prev) => prev + 1);
        setAllChunkCount(allChunkCount);

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

    const navigationType = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;

    if (navigationType.type !== "navigate") {
      setInvalidNavigation(true);
      return;
    }

    //handshake
    window.opener.postMessage({ type: ENCRYPTED_DATA_READY_TYPE }, "*");
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [handleMessage]);

  const loadDataPercentage = useMemo(() => {
    return Math.min(Math.floor((chunkCount / allChunkCount) * 100), 100);
  }, [chunkCount, allChunkCount]);

  return {
    dataLoaded,
    dataLoading,
    encryptedFiles,
    fileNames,
    loadDataPercentage,
    chunkCount,
    allChunkCount,
    invalidNavigation,
    encryptionMetaData,
  };
}

export { useLoadData };
