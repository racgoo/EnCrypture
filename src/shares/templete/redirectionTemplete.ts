const TARGET_ORIGIN = "http://localhost:5173";
const DECRYPT_PATH = "/#/decrypt";
const ENCRYPTED_DATA_READY_TYPE = "ENCRYPTED_DATA_READY";
const ENCRYPTED_DATA_MESSAGE_TYPE = "ENCRYPTED_DATA_MESSAGE";
const ENCRYPTED_DATA_DONE_TYPE = "ENCRYPTED_DATA_DONE";

const ENCRYPTED_DATA_TYPE = "ENCRYPTED_DATA";

function getRedirectionHtmlTemplete(
  encryptedFiles: string[],
  encryptedFileNames: string[]
) {
  const redirectionHtmlTemplete = `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <title>암호화 파일 복호화 전송 안내</title>
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
            <h2>암호화된 파일 복호화 안내</h2>
            <p>
              이 HTML 파일은 <b>암호화된 원본 파일</b>을<br>
              <b>EnCrypture 사이트의 복호화 페이지</b>로 안전하게 전송하여,<br>
              <b>EnCrypture 사이트의 로직으로 복호화</b>할 수 있도록 도와줍니다.
            </p>
          </div>
          <div class="explain">
            <ul style="padding-left: 1.2em; margin: 0;">
              <li>아래 버튼을 누르면 복호화 페이지가 새 창으로 열립니다.</li>
              <li>암호화된 파일 데이터가 자동으로 복호화 페이지로 전송됩니다.</li>
              <li>복호화 페이지에서 비밀번호를 입력하면 파일을 복원할 수 있습니다.</li>
            </ul>
          </div>
          <button id="sendBtn">복호화 페이지로 이동 및 데이터 전송</button>
        </div>
        <script>
          // encryptedFiles는 파일별 암호화 데이터 배열임
          const encryptedFiles = ${JSON.stringify(encryptedFiles, null, 2)};
          const encryptedFileNames = ${JSON.stringify(
            encryptedFileNames,
            null,
            2
          )};
          document.getElementById('sendBtn').onclick = function() {
            const targetOrigin = '${TARGET_ORIGIN}';
            const newWindow = window.open(targetOrigin + '${DECRYPT_PATH}', '_blank');

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
};
