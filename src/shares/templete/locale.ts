const localeTable = {
  decrypt_guide_title: {
    ko: "암호화된 파일 복호화 안내",
    en: "Encrypted File Decryption Guide",
  },
  decrypt_guide_description: {
    ko: `이 HTML 파일은 암호화된 원본 파일을
EnCrypture 사이트의 복호화 페이지로 안전하게 전송하여,
EnCrypture 사이트의 로직으로 복호화할 수 있도록 도와줍니다.`,
    en: `This HTML file safely sends the encrypted original file
to the decryption page of the EnCrypture site,
allowing you to decrypt it using EnCrypture's logic.`,
  },
  decrypt_guide_explain_1: {
    ko: "아래 버튼을 누르면 복호화 페이지가 새 창으로 열립니다.",
    en: "Clicking the button below will open the decryption page in a new window.",
  },
  decrypt_guide_explain_2: {
    ko: "암호화된 파일 데이터가 자동으로 복호화 페이지로 전송됩니다.",
    en: "The encrypted file data will be automatically sent to the decryption page.",
  },
  decrypt_guide_explain_3: {
    ko: "복호화 페이지에서 비밀번호를 입력하면 파일을 복원할 수 있습니다.",
    en: "You can restore the file by entering the password on the decryption page.",
  },
  download_decrypt_page_button_text: {
    ko: "복호화 페이지로 이동 및 데이터 전송",
    en: "Go to Decrypt Page and Send Data",
  },
} as const;

export { localeTable };
