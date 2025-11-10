import { useReactiveRef } from "@racgoo/reactive-kit/react";
import type { EncryptionConfigType } from "..";
import { useCallback } from "react";

const DEFAULT_RETRY_COUNT = 5;

function useEncryptionConfig() {
  const encryptionConfigRef = useReactiveRef<EncryptionConfigType>({
    loading: false,
    finished: false,
    retryCount: DEFAULT_RETRY_COUNT,
  });

  const clearEncryptionConfig = useCallback(() => {
    encryptionConfigRef.current.loading = false;
    encryptionConfigRef.current.finished = false;
    encryptionConfigRef.current.retryCount = DEFAULT_RETRY_COUNT;
  }, []);

  const updateEncryptionConfig = useCallback(
    ({ loading, finished, retryCount }: Partial<EncryptionConfigType>) => {
      encryptionConfigRef.current.loading =
        loading ?? encryptionConfigRef.current.loading;
      encryptionConfigRef.current.finished =
        finished ?? encryptionConfigRef.current.finished;
      encryptionConfigRef.current.retryCount =
        retryCount ?? encryptionConfigRef.current.retryCount;
    },
    []
  );

  return { encryptionConfigRef, clearEncryptionConfig, updateEncryptionConfig };
}

export { useEncryptionConfig };
