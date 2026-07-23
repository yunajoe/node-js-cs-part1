# 전 세계 개발자들의 앱스토어: NPM과 package.json

### 1. 개요 및 배경

- 핵심 역할: Node.js는 자바스크립트를 브라우저 밖으로 이끌어 OS, 파일 시스템, 네트워크 등 컴퓨터 핵심 시스템을 직접 제어할 수 있게 함.
- NPM(Node Package Manager): 스마트폰의 '앱스토어' 역할을 하는 거대한 무료 패키지 저장소.
- 개발 패러다임 변화: 검증된 코드를 가져와 조합함으로써 개발 속도와 생산성, 코드 재사용성 극대화.

---

### 2. 프로젝트의 시작: npm init -y

- 빈 폴더를 Node.js 프로젝트로 선언할 때 사용하는 기초 CLI 명령어.
- 명령어 구조:

```
npm: Node Package Manager 호출
init: 프로젝트 초기화(initialize)
-y: 설정 질문에 모두 기본값(yes)으로 자동 응답
```

- 결과물: 프로젝트 설계도이자 주민등록등본 역할을 하는 package.json 생성.

---

### 3. package.json과 ESM 선언

- 컴퓨터와 개발자 간 표준 데이터 교환 형식인 JSON 구조로 프로젝트 정보를 저장.
- 주요 프로퍼티

```
name / version: 소프트웨어 고유 식별자 및 유의적 버전.
type: 모듈 시스템 규격 선언 ("module" 지정 시 ESM 표준 사용).
main: 프로그램의 entry point(진입점 실행 파일, 예: index.js).
scripts: 자주 쓰는 길고 복잡한 CLI 명령어를 단축키로 등록하는 공간.
license: 오픈소스 저작권 권한 명시 (MIT, ISC 등).
```

- 모던 Node.js 설정 필수 포인트
  package.json에 **"type": "module"**을 명시해야 require() 방식 대신 모던 JS 표준인 import / export (ESM) 문법을 정상 사용할 수 있습니다.

### 4. 외부 패키지 설치: npm install <패키지명>

- 설치 명령 실행 시(줄임말 npm i <패키지명>) 프로젝트 구조에 3가지 주요 변화가 발생합니다.

| 구분                    | 역할 및 주요 특징                                                           |
| :---------------------- | :-------------------------------------------------------------------------- |
| **`node_modules/`**     | 다운로드한 외부 라이브러리의 실제 원본 코드가 보관되는 부품 창고.           |
| **`package.json`**      | `"dependencies"`(의존성) 항목이 추가되며 필요한 패키지 이름과 버전 기록.    |
| **`package-lock.json`** | 설치 당시 정확한 패키지 버전과 의존성 관계를 엄격하게 고정한 '상세 영수증'. |

---

### 5. [실습] 패키지 불러오기 및 사용 원리

```javascript
import chalk from "chalk"; // relative path(./) 없이 이름만 명시
console.log(chalk.blue("NPM의 세계에 오신 것을 환영합니다!"));
console.log(chalk.red.bold("에러 메시지 예시입니다."));
```

- import 시 상대 경로(./)를 지정하지 않고 패키지 이름(chalk)만 입력하면, Node.js 엔진이 node_modules/ 내부를 자동으로 탐색하여 해당 모듈을 찾아옵니다.
