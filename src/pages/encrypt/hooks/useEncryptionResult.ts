import { useReactiveRef } from "@racgoo/reactive-kit/react";
import type { EncryptionResultType } from "..";
import { useCallback } from "react";
import { useType } from "./useType";

function useEncryptionResult() {
  const { type } = useType();
  const encryptionResultRef = useReactiveRef<EncryptionResultType>({
    type: type,
    id: null,
    files: [],
    fileNames: [],
  });

  const clearEncryptionResult = useCallback(() => {
    encryptionResultRef.current.type = type;
    encryptionResultRef.current.id = null;
    encryptionResultRef.current.files = [];
    encryptionResultRef.current.fileNames = [];
  }, [type]);

  const updateEncryptionResult = useCallback(
    ({ type, id, files, fileNames }: Partial<EncryptionResultType>) => {
      encryptionResultRef.current.type =
        type ?? encryptionResultRef.current.type;
      encryptionResultRef.current.id = id ?? encryptionResultRef.current.id;
      encryptionResultRef.current.files =
        files ?? encryptionResultRef.current.files;
      encryptionResultRef.current.fileNames =
        fileNames ?? encryptionResultRef.current.fileNames;
    },
    []
  );

  return { encryptionResultRef, clearEncryptionResult, updateEncryptionResult };
}

export { useEncryptionResult };
