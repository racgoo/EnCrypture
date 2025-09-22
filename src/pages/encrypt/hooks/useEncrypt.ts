import { aesEncrypter, argon2Encrypter } from "@features/encrypt";
import { getBase64FromFile } from "@features/file";
import { useCallback, useState } from "react";
import { flushSync } from "react-dom";

interface UseEncryptProps {
  files: File[];
  password: string;
}

function useEncrypt({ files, password }: UseEncryptProps) {
  const [percentage, setPercentage] = useState(0);
  const [message, setMessage] = useState("");

  const encrypt = useCallback(async () => {
    setPercentage(0);
    setMessage("Argon2를 사용하여 암호화 키를 생성중입니다.");
    const encryptedFiles = await new Promise<string[]>((resolve) => {
      requestIdleCallback(async () => {
        const encryptKey = await argon2Encrypter.hash(password);
        setMessage("AES-256-GCM을 사용하여 파일을 암호화중입니다.");
        const percentageUnit = 100 / files.length;
        const encryptedFiles = await Promise.all(
          files.map(async (file) => {
            const base64File = await getBase64FromFile(file);
            const encryptedBase64File = await aesEncrypter.hash(
              base64File,
              encryptKey
            );
            flushSync(() => {
              setPercentage((prev) => Math.floor(prev + percentageUnit));
            });
            return encryptedBase64File;
          })
        );
        resolve(encryptedFiles);
        setPercentage(100);
        setMessage("암호화가 완료되었습니다.");
      });
    });

    return encryptedFiles;
  }, [files, password]);

  return {
    encrypt,
    percentage,
    message,
  };
}

export { useEncrypt };
