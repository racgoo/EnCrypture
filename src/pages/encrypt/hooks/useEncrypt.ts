import { aesEncrypter, argon2Encrypter } from "@features/encrypt";
import { getBase64FromFile } from "@features/file";

import { useLocale } from "@shares/locale";
import { useCallback, useState } from "react";
import { flushSync } from "react-dom";
import { localeTable } from "../locale";
import { getEncryptionKey } from "@features/encrypt";

import { CLIENT_ENCRYPT_TYPE, SERVER_ENCRYPT_TYPE } from "../constants";
import type { EncryptionType } from "../../../features/encrypt/type";

interface UseEncryptProps {
  files: File[];
  password: string;
}

interface EncryptResult {
  type: EncryptionType;
  encryptionId: number | null;
  encryptedFiles: string[];
}

function useEncrypt({ files, password }: UseEncryptProps) {
  const { t } = useLocale(localeTable);
  const [percentage, setPercentage] = useState(0);
  const [message, setMessage] = useState("");

  const clientEncrypt = useCallback(async (): Promise<EncryptResult> => {
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

    return {
      type: CLIENT_ENCRYPT_TYPE,
      encryptionId: null,
      encryptedFiles,
    };
  }, [files, password, t]);

  const serverEncrypt = useCallback(async (): Promise<EncryptResult> => {
    setPercentage(0);
    const { encryptionId, hashKey } = await getEncryptionKey({
      password,
      retryCount: 5,
    });
    const encryptedFiles = await new Promise<string[]>((resolve) => {
      requestIdleCallback(async () => {
        const encryptedFiles = await Promise.all(
          files.map(async (file) => {
            const base64File = await getBase64FromFile(file);
            const encryptedBase64File = await aesEncrypter.hash(
              base64File,
              hashKey
            );
            return encryptedBase64File;
          })
        );
        resolve(encryptedFiles);
        setPercentage(100);
        setMessage(t("encrypt_finished_message"));
      });
    });

    return {
      type: SERVER_ENCRYPT_TYPE,
      encryptionId,
      encryptedFiles,
    };
  }, [files, password, t]);

  return {
    clientEncrypt,
    serverEncrypt,
    percentage,
    message,
  };
}

export { useEncrypt };
