import { argon2Encrypter } from "../encrypter";

async function verifyPassword(password: string, encryptKey: string) {
  return await argon2Encrypter.verify(password, encryptKey);
}

export { verifyPassword };
