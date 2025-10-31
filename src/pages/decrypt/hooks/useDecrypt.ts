import {
  aesEncrypter,
  argon2Encrypter,
  verifyHashKey,
} from "@features/encrypt";
import { getFileFromBase64 } from "@features/file";
import { message } from "antd";
import { useCallback, useState } from "react";
import { flushSync } from "react-dom";
import { localeTable } from "../locale";
import { useLocale } from "@shares/locale";

function useDecrypt(encryptedBase64Files: string[], fileNames: string[]) {
  const { t } = useLocale(localeTable);
  const [password, setPassword] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [decryptLoading, setDecryptLoading] = useState(false);
  const [decryptPercentage, setDecryptPercentage] = useState(0);

  const clientDecrypt = useCallback(async () => {
    setDecryptLoading(true);
    setDecryptPercentage(0);
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
          message.error(t("decrypt_error_message"));
          reject(error);
        } finally {
          setDecryptLoading(false);
        }
      });
    });

    setFiles(decryptedFiles);
    setDecryptLoading(false);
  }, [password, encryptedBase64Files, fileNames, t]);

  const serverDecrypt = useCallback(
    async (encryptionId: number) => {
      setDecryptLoading(true);
      setDecryptPercentage(0);

      const { hashKey, retryCount } = await verifyHashKey({
        encryptionId,
        password,
      });
      const encryptKey = hashKey;

      if (retryCount === 0) {
        message.error(t("too_many_attempts_message"));
        setDecryptLoading(false);
        return;
      }

      if (hashKey === "") {
        message.error(
          t("wrong_password_message") +
            "\n" +
            t("retry_count_message") +
            retryCount
        );
        setDecryptLoading(false);
        return;
      }

      const decryptedFiles = await new Promise<File[]>((resolve, reject) => {
        requestIdleCallback(async () => {
          try {
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
            message.error(t("decrypt_error_message"));
            reject(error);
          } finally {
            setDecryptLoading(false);
          }
        });
      });

      setFiles(decryptedFiles);
      setDecryptLoading(false);
    },
    [password, encryptedBase64Files, fileNames, t]
  );

  return {
    password,
    setPassword,
    files,
    clientDecrypt,
    serverDecrypt,
    decryptLoading,
    decryptPercentage,
  };
}

export { useDecrypt };
