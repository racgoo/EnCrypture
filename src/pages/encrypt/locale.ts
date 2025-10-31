const localeTable = {
  title: {
    ko: "파일 암호화",
    en: "File Encryption",
  },
  description_1: {
    ko: "여러 파일을 안전하게 암호화할 수 있습니다.",
    en: "A web service that allows you to safely encrypt multiple files.",
  },
  description_2: {
    ko: "이하의 파일만 업로드할 수 있습니다.",
    en: " files only can be uploaded.",
  },
  client_guide_1: {
    ko: "Argon2 알고리즘을 사용합니다.",
    en: "Uses the Argon2 algorithm.",
  },
  client_guide_2: {
    ko: "최소 암호 해독 시간을 보장하여 무차별 대입 공격에 안전합니다.",
    en: "Ensures a minimum password decryption time to prevent brute force attacks.",
  },
  client_guide_3: {
    ko: "AES-256 + 솔트 적용으로 레인보우 테이블 공격을 방지합니다.",
    en: "Uses AES-256 + salt to prevent rainbow table attacks.",
  },
  server_guide_1: {
    ko: "해싱된 사용자의 암호가 서버에 저장되어 열람 기간, 암호 입력 시도 제한 등 다양한 보안 기능을 제공합니다.",
    en: "The hashed user password is stored on the server, providing various security features such as viewing period and password input attempt limit.",
  },
  password_placeholder: {
    ko: "영문, 숫자, 특수문자 포함 6자 이상",
    en: "6+ chars, letters, numbers, special chars",
  },
  file_upload_dragger_text: {
    ko: "여기에 파일을 드래그하거나 클릭해서 업로드하세요",
    en: "Drag and drop files here or click to upload",
  },
  invalid_password_message: {
    ko: "비밀번호는 최소 6자리, 숫자/알파벳/특수문자를 각각 1개 이상 포함해야 합니다.",
    en: "The password must be at least 6 characters, contain at least one number, one letter, and one special character.",
  },
  file_size_error_message: {
    ko: "를 초과하는 파일은 업로드할 수 없습니다.",
    en: " files cannot be uploaded.",
  },
  start_encrypt_button_text: {
    ko: "암호화 시작",
    en: "Start Encryption",
  },
  download_decrypt_page_button_text: {
    ko: "복호화 페이지 다운로드",
    en: "Download Decrypt Page",
  },
  argon2_encrypt_progress_message: {
    ko: "Argon2를 사용하여 암호화 키를 생성중입니다.",
    en: "Generating encryption key using Argon2.",
  },
  aes_encrypt_progress_message: {
    ko: "AES-256-GCM을 사용하여 파일을 암호화중입니다.",
    en: "Encrypting files using AES-256-GCM.",
  },
  encrypt_finished_message: {
    ko: "암호화가 완료되었습니다.",
    en: "Encryption completed.",
  },
  retry_count_placeholder: {
    ko: "암호 입력 시도 제한 횟수 (기본 5회)",
    en: "Password input attempt limit (default 5 times)",
  },
  retry_count_description: {
    ko: "암호 입력 시도 제한 횟수를 설정합니다. (기본 5회)",
    en: "Set the password input attempt limit. (default 5 times)",
  },
  password_description: {
    ko: "암호를 입력하세요. 최소 6자리, 숫자/알파벳/특수문자를 각각 1개 이상 포함해야 합니다.",
    en: "Enter the password. It must contain at least one number, one letter, and one special character.",
  },
  client_argon2_caution: {
    ko: "클라이언트 암호화에서는 Argon2 알고리즘을 사용합니다. 모바일 환경에서는 Argon2 알고리즘이 동작하기 어려울 수 있습니다.",
    en: "The Argon2 algorithm may not work properly in mobile environments.",
  },
} as const;

export { localeTable };
