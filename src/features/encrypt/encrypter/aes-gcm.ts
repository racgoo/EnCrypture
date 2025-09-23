import CryptoJS from "crypto-js";

class AESEncrypter {
  async hash(base64Data: string, encryptKey: string): Promise<string> {
    return CryptoJS.AES.encrypt(base64Data, encryptKey).toString();
  }

  async decrypt(encryptedBase64: string, password: string): Promise<string> {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedBase64, password);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      if (!decrypted) {
        throw new Error("잘못된 비밀번호");
      }

      return decrypted;
    } catch {
      throw new Error("복호화 실패");
    }
  }
}

const aesEncrypter = new AESEncrypter();

export { aesEncrypter };
