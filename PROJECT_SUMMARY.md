# 고양이 웹사이트 프로젝트 작업 정리

## 프로젝트 개요
고양이를 주제로 한 웹사이트를 제작하고 GitHub Pages로 배포한 프로젝트

**배포된 사이트**: https://l1ll2lll3.github.io/cat-not-a-dog/

---

## 1단계: 웹페이지 제작

### 1.1 첫 번째 버전 (간단한 페이지)
**파일**: `cat-page.html`

- 단일 HTML 파일로 구성된 간단한 페이지
- 랜덤 고양이 이미지 표시
- "새로운 고양이 보기" 버튼 기능
- 고양이 관련 재미있는 사실 포함
- 보라색 그라데이션 배경과 애니메이션

### 1.2 두 번째 버전 (본격적인 웹사이트)
**파일**:
- `index.html` - 메인 HTML 구조
- `styles.css` - 스타일시트 (~450줄)
- `script.js` - JavaScript 기능 (~200줄)

**주요 섹션**:
1. **네비게이션 바** - 스크롤 기반 활성화
2. **홈 (Hero)** - 히어로 이미지와 CTA 버튼
3. **갤러리** - 필터 기능, 그리드 레이아웃, 더 보기 버튼
4. **품종** - 6가지 인기 고양이 품종 소개
5. **정보** - 8가지 고양이 재미있는 사실
6. **푸터** - 저작권 정보

**기술 스택**:
- HTML5
- CSS3 (Flexbox, Grid, 애니메이션)
- Vanilla JavaScript
- Cat as a Service API (https://cataas.com)

**주요 기능**:
- 반응형 디자인 (모바일/태블릿/데스크톱)
- 부드러운 스크롤 애니메이션
- 이미지 필터링 (전체/귀여운/자는/웃긴)
- 동적 이미지 로딩 (lazy loading)
- 호버 효과 및 트랜지션

---

## 2단계: 로컬 서버 실행 시도

### 시도 1: 기본 HTTP 서버
```bash
python3 -m http.server 8000
```

### 시도 2: WSL2에서 Windows 호스트 접속
```bash
python3 -m http.server 8000 --bind 0.0.0.0
```

**WSL2 IP**: `172.22.115.84`

**결과**: 접속 문제로 서버 종료

---

## 3단계: GitHub Pages 배포

### 3.1 환경 확인
- **현재 환경**: WSL2 (Ubuntu)
- **회사 Git 설정**: Windows 호스트에 있음
- **결론**: WSL과 Windows는 독립적 → 충돌 없음 ✅

### 3.2 Git 저장소 초기화
```bash
cd /mnt/c/Users/limsw/playWithClaude/Fri
git init
```

### 3.3 로컬 Git 설정 (이 저장소만 적용)
```bash
git config user.name "l1ll2lll3"
git config user.email "l1ll2lll3@naver.com"
```

### 3.4 첫 커밋
```bash
git add index.html styles.css script.js
git commit -m "Initial commit: 고양이 웹사이트"
```

### 3.5 SSH 키 생성 및 설정

**SSH 키 생성**:
```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
ssh-keygen -t ed25519 -C "l1ll2lll3@naver.com" -f ~/.ssh/id_ed25519 -N ""
```

**공개 키 확인**:
```bash
cat ~/.ssh/id_ed25519.pub
```

**GitHub에 SSH 키 등록**:
1. https://github.com/settings/ssh/new 접속
2. Title: `WSL Personal`
3. Key: SSH 공개 키 붙여넣기
4. "Add SSH key" 클릭

**GitHub known hosts 추가**:
```bash
ssh-keyscan github.com >> ~/.ssh/known_hosts
```

**SSH 연결 테스트**:
```bash
ssh -T git@github.com
# 결과: Hi l1ll2lll3! You've successfully authenticated...
```

### 3.6 GitHub 저장소 연결 및 푸시

**저장소 생성**: https://github.com/l1ll2lll3/cat-not-a-dog

**Remote 설정 및 푸시**:
```bash
git remote add origin git@github.com:l1ll2lll3/cat-not-a-dog.git
git branch -M main
git push -u origin main
```

**결과**: ✅ 성공적으로 푸시 완료

### 3.7 GitHub Pages 활성화

1. https://github.com/l1ll2lll3/cat-not-a-dog/settings/pages 접속
2. **Source** 설정:
   - Branch: `main`
   - Folder: `/ (root)`
3. "Save" 클릭
4. 1~2분 후 배포 완료

---

## 최종 결과

### 배포된 웹사이트
**URL**: https://l1ll2lll3.github.io/cat-not-a-dog/

### 저장소
**GitHub**: https://github.com/l1ll2lll3/cat-not-a-dog

### 프로젝트 구조
```
Fri/
├── index.html          # 메인 HTML
├── styles.css          # 스타일시트
├── script.js           # JavaScript
├── cat-page.html       # 초기 버전 (단순 페이지)
├── PROJECT_SUMMARY.md  # 이 문서
└── .git/              # Git 저장소
```

---

## 향후 업데이트 방법

### 파일 수정 후 배포
```bash
# 파일 수정 후
git add .
git commit -m "수정 내용 설명"
git push

# 1~2분 후 자동으로 웹사이트에 반영됨
```

### SSH 키 덕분에:
- 비밀번호 입력 불필요
- 회사 Git 설정과 완전 독립적
- 안전하고 편리한 배포

---

## 기술적 특이사항

### WSL2 환경
- Git 설정: WSL 내부에만 적용
- SSH 키: WSL 전용 (`~/.ssh/`)
- Windows 회사 설정과 완전 분리

### Git 설정 범위
- Global (전역): 설정 안 함 → 회사 설정과 충돌 없음
- Local (저장소별): 개인 계정 정보만 설정

### 인증 방식
- SSH 키 사용 → 토큰/비밀번호 불필요
- 저장소마다 다른 remote URL 가능
  - 회사: HTTPS
  - 개인: SSH

---

## 회사 계정과 개인 계정 함께 사용하기

### 방법 1: 저장소별 로컬 설정 (가장 간단)

각 저장소마다 다른 사용자 정보를 설정하는 방법입니다.

```bash
# 회사 프로젝트 디렉토리
cd ~/work/company-project
git config user.name "회사이름"
git config user.email "회사이메일@company.com"

# 개인 프로젝트 디렉토리
cd ~/personal/my-project
git config user.name "l1ll2lll3"
git config user.email "l1ll2lll3@naver.com"

# 설정 확인
git config user.name
git config user.email
```

**장점**: 간단하고 명확
**단점**: 새 저장소마다 수동 설정 필요

### 방법 2: Git Conditional Includes (자동화)

디렉토리 경로에 따라 자동으로 다른 설정을 적용합니다.

**1단계: 설정 파일 생성**

`~/.gitconfig-work` (회사용):
```ini
[user]
    name = 회사이름
    email = 회사이메일@company.com
```

`~/.gitconfig-personal` (개인용):
```ini
[user]
    name = l1ll2lll3
    email = l1ll2lll3@naver.com
```

**2단계: 메인 `.gitconfig` 수정**

`~/.gitconfig`:
```ini
# 기본 설정 (없어도 됨)

# 회사 프로젝트 (~/work/ 디렉토리 하위)
[includeIf "gitdir:~/work/"]
    path = ~/.gitconfig-work

# 개인 프로젝트 (~/personal/ 디렉토리 하위)
[includeIf "gitdir:~/personal/"]
    path = ~/.gitconfig-personal

# 또는 특정 경로
[includeIf "gitdir:/mnt/c/Users/limsw/playWithClaude/"]
    path = ~/.gitconfig-personal
```

**3단계: 테스트**
```bash
cd ~/work/some-project
git config user.email  # 회사이메일@company.com

cd ~/personal/my-project
git config user.email  # l1ll2lll3@naver.com
```

**장점**: 자동으로 적용, 실수 방지
**단점**: 초기 설정 필요

### 방법 3: 여러 SSH 키 사용 (고급)

회사 GitHub와 개인 GitHub에 각각 다른 SSH 키를 사용합니다.

**1단계: SSH 키 생성**

```bash
# 회사용 SSH 키
ssh-keygen -t ed25519 -C "회사이메일@company.com" -f ~/.ssh/id_ed25519_work

# 개인용 SSH 키 (이미 생성함)
# ~/.ssh/id_ed25519 (기존)
```

**2단계: GitHub에 각각 등록**
- 회사 GitHub 계정: `id_ed25519_work.pub` 등록
- 개인 GitHub 계정: `id_ed25519.pub` 등록

**3단계: SSH Config 설정**

`~/.ssh/config`:
```
# 개인 GitHub
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519

# 회사 GitHub (별칭 사용)
Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_work
```

**4단계: 저장소 remote URL 설정**

```bash
# 개인 프로젝트
git remote add origin git@github.com:l1ll2lll3/my-project.git

# 회사 프로젝트
git remote add origin git@github-work:company/work-project.git
```

**장점**: 완전히 분리된 인증, 가장 안전
**단점**: 설정이 복잡

### 방법 4: GitHub CLI 사용 (현대적)

GitHub CLI를 사용하면 여러 계정을 쉽게 전환할 수 있습니다.

```bash
# GitHub CLI 설치
# Ubuntu/WSL
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh

# 계정 로그인
gh auth login  # 개인 계정
gh auth login --hostname github.com  # 회사 계정 (추가)

# 계정 전환
gh auth switch

# 현재 계정 확인
gh auth status
```

### 추천 조합

**WSL2 환경에서의 추천 구성**:

1. **Windows (회사)**:
   - Git for Windows 사용
   - HTTPS + Personal Access Token
   - 회사 저장소만 관리

2. **WSL2 (개인)**:
   - Linux Git 사용
   - SSH 키 인증
   - 개인 저장소만 관리

**현재 이 프로젝트 설정 (적용됨)**:
- ✅ WSL2에서 개인 계정 설정
- ✅ SSH 키 사용
- ✅ Windows 회사 설정과 완전 분리

### 실수 방지 팁

**커밋 전 확인 습관**:
```bash
# .bashrc 또는 .zshrc에 추가
alias gitcheck='echo "User: $(git config user.name) <$(git config user.email)>"'

# 사용
cd ~/work/project
gitcheck  # User: 회사이름 <회사이메일@company.com>

cd ~/personal/project
gitcheck  # User: l1ll2lll3 <l1ll2lll3@naver.com>
```

**Git 후크 사용**:
`.git/hooks/pre-commit`:
```bash
#!/bin/bash
EMAIL=$(git config user.email)

if [[ $EMAIL != *"개인이메일"* ]]; then
    echo "경고: 개인 프로젝트인데 회사 이메일을 사용 중입니다!"
    echo "현재: $EMAIL"
    exit 1
fi
```

---

## 사용된 외부 리소스

- **Cat as a Service API**: https://cataas.com
  - 랜덤 고양이 이미지 제공
  - 필터 기능 지원 (cute, sleeping, funny)
  - 무료 사용 가능

- **GitHub Pages**: https://pages.github.com
  - 정적 사이트 무료 호스팅
  - HTTPS 자동 지원
  - 무제한 대역폭

---

## 프로젝트 완성일
**날짜**: 2025-10-31

**작업 환경**:
- OS: WSL2 (Linux 6.6.87.1-microsoft-standard-WSL2)
- 작업 디렉토리: `/mnt/c/Users/limsw/playWithClaude/Fri`
- Windows 경로: `C:\Users\limsw\playWithClaude\Fri`
