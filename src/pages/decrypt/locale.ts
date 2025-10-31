const localeTable = {
  title: {
    ko: "파일 복호화",
    en: "File Decryption",
  },
  wrong_access_message: {
    ko: "잘못된 접근입니다. 복호화 페이지를 통해 접근해주세요.",
    en: "Wrong access. Please access through the decrypt page.",
  },
  progress_message: {
    ko: "진행률",
    en: "Progress",
  },
  password_placeholder: {
    ko: "암호를 입력하세요",
    en: "Enter the password",
  },
  decrypt_button_text: {
    ko: "복호화하기",
    en: "Decrypt",
  },
  decrypt_error_message: {
    ko: "파일 복호화에 실패했습니다.",
    en: "File decryption failed.",
  },
  data_loading_message: {
    ko: "데이터 로드중...",
    en: "Data loading...",
  },
  data_loading_sub_message: {
    ko: "암호화된 파일을 안전하게 불러오고 있습니다.",
    en: "Securely loading encrypted files.",
  },
  decrypt_result_title: {
    ko: "복호화된 파일 목록",
    en: "Decrypted File List",
  },
  decrypt_result_download_all_files_tooltip: {
    ko: "모든 파일을 한 번에 다운로드합니다.",
    en: "Download all files at once.",
  },
  decrypt_result_download_all_files_text: {
    ko: "모두 다운로드",
    en: "Download All",
  },
  decrypt_result_download_file_tooltip: {
    ko: "이 파일만 다운로드",
    en: "Download this file only",
  },
  single_download_button_text: {
    ko: "다운로드",
    en: "Download",
  },
  wrong_password_message: {
    ko: "비밀번호가 일치하지 않습니다.",
    en: "The password does not match.",
  },
  too_many_attempts_message: {
    ko: "비밀번호 입력 시도 횟수를 초과했습니다.",
    en: "The number of password input attempts has been exceeded.",
  },
  retry_count_message: {
    ko: "남은 시도 횟수: ",
    en: "Remaining attempts: ",
  },
} as const;

export { localeTable };
