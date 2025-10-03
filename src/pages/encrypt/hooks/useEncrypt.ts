import { aesEncrypter, argon2Encrypter } from "@features/encrypt";
import { getBase64FromFile } from "@features/file";
import { useLocale } from "@shares/locale";
import { useCallback, useState } from "react";
import { flushSync } from "react-dom";
import { localeTable } from "../locale";

interface UseEncryptProps {
  files: File[];
  password: string;
}

function useEncrypt({ files, password }: UseEncryptProps) {
  const { t } = useLocale(localeTable);
  const [percentage, setPercentage] = useState(0);
  const [message, setMessage] = useState("");

  const encrypt = useCallback(async () => {
    setPercentage(0);
    setMessage(t("argon2_encrypt_progress_message"));
    const encryptedFiles = await new Promise<string[]>((resolve) => {
      requestIdleCallback(async () => {
        const encryptKey = await argon2Encrypter.hash(password);
        setMessage(t("aes_encrypt_progress_message"));
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
        setMessage(t("encrypt_finished_message"));
      });
    });

    return encryptedFiles;
  }, [files, password, t]);

  return {
    encrypt,
    percentage,
    message,
  };
}

export { useEncrypt };
