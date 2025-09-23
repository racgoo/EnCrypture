# 🔒 EnCrypture

**Advanced Web-Based File Encryption Solution with HTML Container Technology**

<div align="center">
  <img src="https://img.shields.io/badge/Encryption-AES--256-red.svg" alt="AES-256"/>
  <img src="https://img.shields.io/badge/Hashing-Argon2id-blue.svg" alt="Argon2id"/>
  <img src="https://img.shields.io/badge/Platform-Web-green.svg" alt="Web Platform"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License"/>
</div>

<div align="center">
  <img width="400" al<img width="1024" height="1024" alt="109d67a8-f770-451e-9e4d-22a8547224b2" src="https://github.com/user-attachments/assets/f4c8d012-e495-42e0-98d9-5ff2e4eaaec9" />
</div>

**Website**: [https://encrypture.racgoo.com](https://encrypture.racgoo.com)

**GitHub**: [https://github.com/racgoo/encrypture](https://github.com/racgoo/EnCrypture)

---

## 소개

**EnCrypture**는  
파일을 안전하게 암호화하고 복호화할 수 있는 혁신적인 웹 기반 암호화 솔루션입니다.

기존 ZIP, PDF 암호화와 달리 **HTML 컨테이너 기술**을 사용하여  
**브라우저만으로 모든 디바이스에서 암호화된 파일을 열람**할 수 있습니다.  
별도 프로그램 설치 없이 **보안**과 **범용 호환성**을 동시에 제공합니다.

> 💡 **혁신 포인트**:  
> - **데이터 완전 소유**: 암호화된 파일을 HTML 컨테이너로 패키징하여 사용자가 직접 보관  
> - **필요시에만 연결**: 복호화할 때만 EnCrypture 사이트의 기능을 활용  
> - **서버 독립적**: 클라우드 저장소나 서버에 의존하지 않는 완전한 로컬 제어 


---

## 지원 환경

- **데스크톱 브라우저**
  > Chrome, Firefox, Safari, Edge (완전 지원)
- **모바일 브라우저**
  > 현재 개발 중 (성능 최적화 진행 중)
- **운영체제**
  > Windows, macOS, Linux (브라우저만 있으면 OK)
---

## 주요 기능

- **🛡️ 이중 암호화 시스템**  
  Argon2id 해싱과 AES-256 암호화를 통한 최고 수준의 보안  
  브루트포스 공격 방지 및 레인보우 테이블 공격 차단

- **📱 HTML 컨테이너 기술**  
  암호화된 파일을 HTML로 패키징하여 브라우저에서 직접 실행  
  별도 프로그램 설치 불필요, 모든 디바이스에서 호환

- **🔄 PostMessage 통신**  
  HTML 파일과 웹사이트 간 안전한 데이터 전송  
  청크 단위 전송으로 대용량 파일 지원

- **🌐 클라이언트 사이드 암호화**  
  모든 암호화 과정이 브라우저에서 수행됨  
  서버에 원본 파일이나 비밀번호가 전송되지 않음

---

## 기술 스택

### **Frontend**
- React 18 + TypeScript
- Ant Design (UI 컴포넌트)
- React Router (라우팅)
- Vite (빌드 도구)

### **암호화**
- @noble/hashes (Argon2id 구현)
- crypto-js (AES-256 암호화)
- Web Crypto API (브라우저 네이티브 암호화)

### **통신**
- postMessage API (HTML-웹사이트 간 안전한 통신)
- 청크 단위 전송 (대용량 파일 지원)

---

## 사용법

### **1. 파일 암호화**

```bash
1. https://encrypture.racgoo.com 접속
2. "클라이언트 전용" 선택
3. 파일 업로드 (드래그 앤 드롭 지원)
4. 강력한 비밀번호 입력 (영문, 숫자, 특수문자 포함 6자 이상)
5. 암호화된 HTML 파일 다운로드
```

### **2. 파일 복호화**

```bash
1. 다운로드된 HTML 파일을 브라우저로 열기
2. "복호화 페이지로 이동" 버튼 클릭
3. EnCrypture 사이트가 자동으로 열리고 데이터 전송
4. 비밀번호 입력하여 원본 파일 복원 및 다운로드
```

---

## 보안 특징

### **브루트포스 공격 방지**
- Argon2id: 메모리 집약적 해싱으로 무차별 대입 공격 차단
- 시간 지연: 패스워드 검증 시 의도적 지연으로 공격 속도 제한
- 솔트 적용: 레인보우 테이블 공격 방지

### **완전한 개인정보 보호**
- 클라이언트 사이드 암호화: 서버에 원본 파일 미전송
- 제로 로그 정책: 비밀번호나 파일 정보 서버 저장 안함
- 오프라인 복호화: 인터넷 없이도 파일 접근 가능

---

## 지원 파일 형식

| 카테고리 | 지원 형식 |
|---------|----------|
| **이미지** | JPG, PNG, GIF, WebP, SVG, BMP |
| **문서** | PDF, DOC, DOCX, TXT, RTF, ODT |
| **압축** | ZIP, RAR, 7Z, TAR, GZ |
| **미디어** | MP4, AVI, MP3, WAV, MOV |
| **기타** | 모든 파일 형식 지원 |

---

## 브라우저 호환성

| 브라우저 | 데스크톱 | 모바일 | 비고 |
|---------|---------|--------|------|
| Chrome  | ✅ 완전 지원 | ⚠️ 개발 중 | 권장 브라우저 |
| Firefox | ✅ 완전 지원 | ⚠️ 개발 중 | 완전 호환 |
| Safari  | ✅ 완전 지원 | ⚠️ 개발 중 | macOS/iOS |
| Edge    | ✅ 완전 지원 | ⚠️ 개발 중 | Windows 권장 |

> ⚠️ **모바일 지원**: 현재 Argon2 해싱 성능 최적화 진행 중

---

## 현재 제한사항

- **모바일 성능**: Argon2 해싱으로 인한 처리 속도 저하
- **파일 크기**: 브라우저 메모리 한계에 따른 제약 (권장: 100MB 이하)
- **동시 처리**: 대량 파일 동시 암호화 시 브라우저 리소스 부족 가능

---

## 향후 개발 계획

- [ ] **Server측 uuid 기반 키 암호화 및 Retry 규칙 추가.
- [ ] **모바일 최적화**: Web Worker 기반 성능 개선
- [ ] **다국어 지원**: 영어, 일본어, 중국어 추가
- [ ] **클라우드 연동**: Google Drive, Dropbox 직접 업로드
- [ ] **배치 처리**: 대량 파일 일괄 암호화
- [ ] **압축 기능**: 암호화 전 파일 압축으로 크기 최적화

---


### **데이터 흐름**

1. **암호화 단계**
   - 사용자가 파일과 비밀번호 입력
   - Argon2id로 비밀번호 해싱
   - AES-256으로 파일 암호화
   - 암호화된 데이터를 HTML 컨테이너에 삽입

2. **HTML 컨테이너**
   - 암호화된 파일 데이터 포함
   - 복호화 UI 및 postMessage 통신 로직
   - 브라우저에서 독립적으로 실행 가능

3. **복호화 단계**
   - HTML 파일이 EnCrypture 사이트와 통신
   - 청크 단위로 안전하게 데이터 전송
   - 사용자 비밀번호로 복호화 수행
   - 원본 파일 복원 및 다운로드

---

## 라이선스

이 프로젝트는 **MIT 라이선스** 하에 배포됩니다.  
자세한 내용은 `LICENSE` 파일을 참조하세요.

---

## 문의

질문, 제안, 버그 리포트, 기여 모두 환영합니다!

**Website**: [https://encrypture.racgoo.com](https://encrypture.racgoo.com)  
**GitHub Issues**: [https://github.com/racgoo/encrypture/issues](https://github.com/racgoo/encrypture/issues)  
**Email**: [[📬 send mail lhsung98@naver.com]](mailto:lhsung98@naver.com)
