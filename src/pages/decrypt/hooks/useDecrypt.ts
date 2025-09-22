import { aesEncrypter, argon2Encrypter } from "@features/encrypt";
import { getFileFromBase64 } from "@features/file";
import { message } from "antd";
import { useCallback, useState } from "react";
import { flushSync } from "react-dom";

function useDecrypt(encryptedBase64Files: string[], fileNames: string[]) {
  const [password, setPassword] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [decryptLoading, setDecryptLoading] = useState(false);
  const [decryptPercentage, setDecryptPercentage] = useState(0);

  const decrypt = useCallback(async () => {
    setDecryptLoading(true);
    setDecryptPercentage(0);
    console.log("hi");
    const decryptedFiles = await new Promise<File[]>((resolve, reject) => {
      requestIdleCallback(async () => {
        try {
          const encryptKey = await argon2Encrypter.hash(password);
          const percentageUnit = 100 / encryptedBase64Files.length;

          const decryptedFiles = await Promise.all(
            encryptedBase64Files.map(async (encryptedBase64File, index) => {
              const decryptedBase64File = await aesEncrypter.decrypt(
                encryptedBase64File,
                encryptKey
              );
              const decryptedFile = getFileFromBase64(
                decryptedBase64File,
                fileNames[index]
              );
              flushSync(() => {
                setDecryptPercentage((prev) =>
                  Math.floor(prev + percentageUnit)
                );
              });
              return decryptedFile;
            })
          );

          resolve(decryptedFiles);
          setDecryptPercentage(100);
        } catch (error) {
          message.error("파일 복호화에 실패했습니다.");
          reject(error);
        }
      });
    });

    setFiles(decryptedFiles);
    setDecryptLoading(false);
  }, [password, encryptedBase64Files, fileNames]);

  return {
    password,
    setPassword,
    files,
    decrypt,
    decryptLoading,
    decryptPercentage,
  };
}

export { useDecrypt };
