function getFileFromBase64(base64: string, filename: string): File {
  // data:image/png;base64, 부분과 순수 base64 분리
  const [header, data] = base64.split(",");

  // MIME 타입 추출
  const mimeType = header.match(/:(.*?);/)?.[1] || "application/octet-stream";

  // base64를 Uint8Array로 변환
  const binaryString = atob(data);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // File 객체 생성
  return new File([bytes], filename, { type: mimeType });
}

export { getFileFromBase64 };
