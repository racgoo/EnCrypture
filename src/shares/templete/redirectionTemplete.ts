import type { LangType } from "@shares/locale";
import { localeTable } from "./locale";
import type { EncryptionType } from "@features/encrypt/type";

// const TARGET_ORIGIN = "http://localhost:5173";
const TARGET_ORIGIN = window.location.origin;
const DECRYPT_PATH = "decrypt";
const ENCRYPTED_DATA_READY_TYPE = "ENCRYPTED_DATA_READY";
const ENCRYPTION_META_DATA = "ENCRYPTION_META_DATA";
const ENCRYPTED_DATA_MESSAGE_TYPE = "ENCRYPTED_DATA_MESSAGE";
const ENCRYPTED_DATA_DONE_TYPE = "ENCRYPTED_DATA_DONE";

const ENCRYPTED_DATA_TYPE = "ENCRYPTED_DATA";

function getRedirectionHtmlTemplete(
  encryptedFiles: string[],
  encryptedFileNames: string[],
  lang: LangType,
  encryptionId: number | null,
  encryptionType: EncryptionType
) {
  const redirectionHtmlTemplete = `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <title>${localeTable.decrypt_guide_title[lang]}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          html, body {
            height: 100%;
            margin: 0;
            padding: 0;
          }
          body {
            min-height: 100vh;
            background: linear-gradient(135deg, #232526 0%, #414345 100%);
            color: #fff;
            font-family: 'Pretendard', 'Noto Sans KR', Arial, sans-serif;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .container {
            background: rgba(34, 34, 34, 0.95);
            border-radius: 18px;
            box-shadow: 0 4px 24px 0 #0004;
            padding: 2.5rem 1.5rem 2rem 1.5rem;
            max-width: 420px;
            width: 95vw;
            margin: 1.5rem auto;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .desc {
            margin-bottom: 2rem;
            text-align: center;
          }
          .desc h2 {
            margin: 0 0 0.5rem 0;
            font-size: 1.5rem;
            font-weight: 700;
            letter-spacing: -1px;
          }
          .desc p {
            margin: 0.5rem 0 0 0;
            font-size: 1.05rem;
            color: #b3b3b3;
            line-height: 1.6;
          }
          .explain {
            background: #1a1a1a;
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1.5rem;
            font-size: 0.98rem;
            color: #a0c4ff;
            text-align: left;
            word-break: keep-all;
          }
          button {
            margin-top: 1.5rem;
            padding: 1rem 2.2rem;
            font-size: 1.13rem;
            border-radius: 10px;
            border: none;
            background: linear-gradient(90deg, #1677ff 60%, #4096ff 100%);
            color: #fff;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 2px 8px #1677ff33;
            transition: background 0.2s, transform 0.1s;
          }
          button:active {
            transform: scale(0.97);
          }
          button:hover {
            background: linear-gradient(90deg, #4096ff 60%, #1677ff 100%);
          }
          @media (max-width: 600px) {
            .container {
              padding: 1.2rem 0.5rem 1.5rem 0.5rem;
              max-width: 98vw;
            }
            .desc h2 {
              font-size: 1.15rem;
            }
            .desc p, .explain {
              font-size: 0.93rem;
            }
            button {
              font-size: 1rem;
              padding: 0.85rem 1.2rem;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="desc">
            <h2>${localeTable.decrypt_guide_title[lang]}</h2>
            <p>
              ${localeTable.decrypt_guide_description[lang]}
            </p>
          </div>
          <div class="explain">
            <ul style="padding-left: 1.2em; margin: 0;">
              <li>${localeTable.decrypt_guide_explain_1[lang]}</li>
              <li>${localeTable.decrypt_guide_explain_2[lang]}</li>
              <li>${localeTable.decrypt_guide_explain_3[lang]}</li>
            </ul>
          </div>
          <button id="sendBtn">${
            localeTable.download_decrypt_page_button_text[lang]
          }</button>
        </div>
        <script>
          // encryptedFiles는 파일별 암호화 데이터 배열임
          const encryptionMetaData = ${JSON.stringify({
            encryptionId,
            encryptionType,
          })};
          const encryptedFiles = ${JSON.stringify(encryptedFiles)};
          const encryptedFileNames = ${JSON.stringify(encryptedFileNames)};

          document.getElementById('sendBtn').onclick = function() {
            const targetOrigin = '${TARGET_ORIGIN}';
            const newWindow = window.open(targetOrigin + '/${lang}/${DECRYPT_PATH}', '_blank');

            // READY 신호를 받을 때까지 대기 후 전송
            function handleMessage(event) {
              // 보안: origin 체크
              if (event.source !== newWindow || event.origin !== targetOrigin) return;
              if (event.data && event.data.type === '${ENCRYPTED_DATA_READY_TYPE}') {
                // 준비 완료 신호 받으면 파일 전송 시작
                sendFiles();
                window.removeEventListener('message', handleMessage);
              }
            }

            function sendFiles() {
              if (!newWindow || newWindow.closed) return;
              try {
                newWindow.postMessage({
                  type: '${ENCRYPTION_META_DATA}',
                  data: encryptionMetaData,
                }, targetOrigin);
                const allChunkCount = encryptedFiles.reduce((acc, file) => acc + Math.ceil(file.length / 1000), 0);
                encryptedFiles.forEach((file, idx) => {
                  // 파일을 1000자씩 분할
                  const chunkSize = 1000;
                  const totalChunks = Math.ceil(file.length / chunkSize);
                  for (let chunkIdx = 0; chunkIdx < totalChunks; chunkIdx++) {
                    const chunkData = file.slice(chunkIdx * chunkSize, (chunkIdx + 1) * chunkSize);
                    // 각 청크를 postMessage로 전송 (파일명도 같이 보냄)
                    newWindow.postMessage({
                      type: '${ENCRYPTED_DATA_MESSAGE_TYPE}',
                      data: chunkData,
                      index: idx,
                      chunkIndex: chunkIdx,
                      totalChunks: totalChunks,
                      total: encryptedFiles.length,
                      allChunkCount: allChunkCount,
                      filename: encryptedFileNames[idx], // 파일명 추가
                      source: 'localFile'
                    }, targetOrigin);
                  }
                });
                // 모든 파일 전송 후 완료 플래그 전송 (파일명 배열도 같이 보냄)
                newWindow.postMessage({
                  type: '${ENCRYPTED_DATA_DONE_TYPE}',
                  total: encryptedFiles.length,
                  filenames: encryptedFileNames, // 파일명 배열 추가
                  source: 'localFile'
                }, targetOrigin);
              } catch (e) {
                // 실패 시 재시도
                setTimeout(sendFiles, 100);
              }
            }

            // READY 신호를 기다림
            window.addEventListener('message', handleMessage);
          };
        </script>
      </body>
      </html>
      `;

  return redirectionHtmlTemplete;
}

export {
  getRedirectionHtmlTemplete,
  DECRYPT_PATH,
  ENCRYPTED_DATA_TYPE,
  TARGET_ORIGIN,
  ENCRYPTED_DATA_DONE_TYPE,
  ENCRYPTED_DATA_MESSAGE_TYPE,
  ENCRYPTED_DATA_READY_TYPE,
  ENCRYPTION_META_DATA,
};
