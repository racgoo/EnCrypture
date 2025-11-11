import { aesEncrypter, argon2Encrypter } from "@features/encrypt";
import { getBase64FromFile } from "@features/file";

import { getEncryptionKey } from "@features/encrypt";
import { useLocale } from "@shares/locale";
import { useCallback } from "react";
import { flushSync } from "react-dom";
import { localeTable } from "../locale";

import { useReactiveRef, type ReactiveRef } from "@racgoo/reactive-kit/react";
import type { EncryptionType } from "../../../features/encrypt/type";
import { CLIENT_ENCRYPT_TYPE, SERVER_ENCRYPT_TYPE } from "../constants";

interface UseEncryptProps {
  fileRef: ReactiveRef<File[]>;
  passwordRef: ReactiveRef<string>;
}

interface EncryptResult {
  type: EncryptionType;
  encryptionId: number | null;
  encryptedFiles: string[];
}

interface EncryptionStatusType {
  percentage: number;
  message: string;
  done: boolean;
}

function useEncrypt({ fileRef, passwordRef }: UseEncryptProps) {
  const { t } = useLocale(localeTable);

  const encryptionStatusRef = useReactiveRef({
    percentage: 0,
    message: "",
    done: false,
  });

  const clearEncryptionStatus = useCallback(() => {
    encryptionStatusRef.current.done = false;
    encryptionStatusRef.current.percentage = 0;
    encryptionStatusRef.current.message = "";
  }, []);

  const clientEncrypt = useCallback(async (): Promise<EncryptResult> => {
    encryptionStatusRef.current.done = false;
    encryptionStatusRef.current.percentage = 0;
    encryptionStatusRef.current.message = t("argon2_encrypt_progress_message");
    const encryptedFiles = await new Promise<string[]>((resolve) => {
      requestIdleCallback(async () => {
        const encryptKey = await argon2Encrypter.hash(passwordRef.current);
        encryptionStatusRef.current.message = t("aes_encrypt_progress_message");
        const percentageUnit = 100 / fileRef.current.length;
        const encryptedFiles = await Promise.all(
          fileRef.current.map(async (file) => {
            const base64File = await getBase64FromFile(file);
            const encryptedBase64File = await aesEncrypter.hash(
              base64File,
              encryptKey
            );
            flushSync(() => {
              encryptionStatusRef.current.percentage = Math.floor(
                encryptionStatusRef.current.percentage + percentageUnit
              );
            });
            return encryptedBase64File;
          })
        );
        resolve(encryptedFiles);
        encryptionStatusRef.current.percentage = 100;
        encryptionStatusRef.current.message = t("encrypt_finished_message");
        encryptionStatusRef.current.done = true;
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
      encryptionStatusRef.current.done = false;
      encryptionStatusRef.current.percentage = 0;
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
          encryptionStatusRef.current.percentage = 100;
          encryptionStatusRef.current.message = t("encrypt_finished_message");
          encryptionStatusRef.current.done = true;
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
    clearEncryptionStatus,
    encryptionStatusRef,
  };
}

export { useEncrypt, type EncryptionStatusType };
