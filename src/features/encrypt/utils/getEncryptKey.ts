import { argon2Encrypter } from "../encrypter";

async function getEncryptKey(password: string) {
  return await argon2Encrypter.hash(password);
}

export { getEncryptKey };
