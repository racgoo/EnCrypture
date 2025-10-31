const baseURL = import.meta.env.VITE_SERVER_URL;

interface GetEncryptionKeyBody {
  password: string;
  retryCount: number;
}

interface GetEncryptionKeyResponse {
  encryptionId: number;
  hashKey: string;
}

export async function getEncryptionKey(params: GetEncryptionKeyBody) {
  const response = await fetch(`${baseURL}/encryption/generate-hash-key`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const data: GetEncryptionKeyResponse = await response.json();
  return data;
}

interface VerifyHashKeyBody {
  encryptionId: number;
  password: string;
}

interface VerifyHashKeyResponse {
  hashKey: string;
  retryCount: number;
}

export async function verifyHashKey(params: VerifyHashKeyBody) {
  const response = await fetch(`${baseURL}/encryption/verify-hash-key`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const data: VerifyHashKeyResponse = await response.json();
  return data;
}
