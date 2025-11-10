import { aesEncrypter, argon2Encrypter } from "@features/encrypt";
import { getBase64FromFile } from "@features/file";

import { useLocale } from "@shares/locale";
import { useCallback, useState } from "react";
import { flushSync } from "react-dom";
import { localeTable } from "../locale";
import { getEncryptionKey } from "@features/encrypt";

import { CLIENT_ENCRYPT_TYPE, SERVER_ENCRYPT_TYPE } from "../constants";
import type { EncryptionType } from "../../../features/encrypt/type";
import type { ReactiveRef } from "@racgoo/reactive-kit/react";

interface UseEncryptProps {
  fileRef: ReactiveRef<File[]>;
  passwordRef: ReactiveRef<string>;
}

interface EncryptResult {
  type: EncryptionType;
  encryptionId: number | null;
  encryptedFiles: string[];
}

function useEncrypt({ fileRef, passwordRef }: UseEncryptProps) {
  const { t } = useLocale(localeTable);
  const [percentage, setPercentage] = useState(0);
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  const clearEncryption = useCallback(() => {
    setDone(false);
    setPercentage(0);
    setMessage("");
  }, []);

  const clientEncrypt = useCallback(async (): Promise<EncryptResult> => {
    setDone(false);
    setPercentage(0);
    setMessage(t("argon2_encrypt_progress_message"));
    const encryptedFiles = await new Promise<string[]>((resolve) => {
      requestIdleCallback(async () => {
        const encryptKey = await argon2Encrypter.hash(passwordRef.current);
        setMessage(t("aes_encrypt_progress_message"));
        const percentageUnit = 100 / fileRef.current.length;
        const encryptedFiles = await Promise.all(
          fileRef.current.map(async (file) => {
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
        setDone(true);
      });
    });

    return {
      type: CLIENT_ENCRYPT_TYPE,
      encryptionId: null,
      encryptedFiles,
    };
  }, [t]);

  const serverEncrypt = useCallback(
    async (retryCount: number): Promise<EncryptResult> => {
      setDone(false);
      setPercentage(0);
      const { encryptionId, hashKey } = await getEncryptionKey({
        password: passwordRef.current,
        retryCount,
      });
      const encryptedFiles = await new Promise<string[]>((resolve) => {
        requestIdleCallback(async () => {
          const encryptedFiles = await Promise.all(
            fileRef.current.map(async (file) => {
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
          setDone(true);
        });
      });

      return {
        type: SERVER_ENCRYPT_TYPE,
        encryptionId,
        encryptedFiles,
      };
    },
    [t]
  );

  return {
    clientEncrypt,
    serverEncrypt,
    percentage,
    message,
    done,
    clearEncryption,
  };
}

export { useEncrypt };
