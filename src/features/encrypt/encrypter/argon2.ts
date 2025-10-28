import { argon2idAsync } from "@noble/hashes/argon2.js";
import { bytesToHex } from "@noble/hashes/utils.js";
import {
  ENCRYPT_HASH_HASH_LEN,
  ENCRYPT_HASH_MEM,
  ENCRYPT_HASH_SALT,
  ENCRYPT_HASH_TIME,
} from "../constants";

class Argon2Encrypter {
  public async hash(password: string) {
    const hashUint8Array = await argon2idAsync(password, ENCRYPT_HASH_SALT, {
      m: ENCRYPT_HASH_MEM, // memory
      t: ENCRYPT_HASH_TIME, // time
      p: 1, // parallelism
      dkLen: ENCRYPT_HASH_HASH_LEN, // hash length
    });
    return bytesToHex(hashUint8Array);
  }

  public async verify(password: string, hash: string) {
    return (await this.hash(password)) === hash;
  }
}

const argon2Encrypter = new Argon2Encrypter();

export { argon2Encrypter };
