import { aesEncrypter, argon2Encrypter } from "@features/encrypt";
import { getFileFromBase64 } from "@features/file";
import { message } from "antd";
import { useCallback, useState } from "react";

function useDecrypt(encryptedBase64Files: string[], fileNames: string[]) {
  const [password, setPassword] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const decrypt = useCallback(async () => {
    setLoading(true);
    const encryptKey = await argon2Encrypter.hash(password);
    try {
      const decryptedFiles: File[] = await Promise.all(
        encryptedBase64Files.map(async (encryptedBase64File, index) => {
          const decryptedBase64File = await aesEncrypter.decrypt(
            encryptedBase64File,
            encryptKey
          );
          const decryptedFile = getFileFromBase64(
            decryptedBase64File,
            fileNames[index]
          );

          console.log("done", decryptedFile);
          return decryptedFile;
        })
      );
      setFiles(decryptedFiles);
    } catch {
      message.error("파일 복호화에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, [password]);

  return { password, setPassword, files, decrypt, loading };
}

export { useDecrypt };
