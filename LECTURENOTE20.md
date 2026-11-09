# 20강 정리: 순수 JavaScript로 직접 구현하는 EventEmitter

## 1. 이번 강의의 핵심

Node.js의 `EventEmitter`는 특별한 마법이 아니라 다음 기술들의 조합으로 구현할 수 있어.

- 객체(Object): 이벤트 이름과 콜백 배열 관리
- 배열(Array): 이벤트별 콜백 저장
- 옵저버 패턴(Observer Pattern): 이벤트 발생 시 구독자에게 알림
- 클로저(Closure): `once()`에서 이벤트 정보와 원본 함수 기억
- Rest / Spread: 여러 인자를 전달
- 배열 조작: `splice()`를 이용한 리스너 제거

## 2. EventEmitter의 전체 구조

listeners 객체

이벤트를 관리하는 마스터 객체

hello

[함수 A, 함수 B]

message

[함수 C, 함수 D]

각 이벤트 이름을 키로 사용하고, 콜백 함수들을 배열에 저장

예를 들어 다음과 같은 구조야.

```
listeners = {
  hello: [함수A, 함수B],
  message: [함수C, 함수D]
}
```

## 3. 각 메서드의 역할

| 메서드   | 역할                       | 핵심 코드      |
| -------- | -------------------------- | -------------- |
| `on()`   | 이벤트 등록                | `push(fn)`     |
| `once()` | 한 번만 실행할 이벤트 등록 | `onceWrapper`  |
| `off()`  | 이벤트 등록 해제           | `splice(i, 1)` |
| `emit()` | 이벤트 발생 및 콜백 실행   | `f(...args)`   |

### ① on() — 이벤트 등록

```
on(eventName, fn) {
  this.listeners[eventName] = this.listeners[eventName] || []
  this.listeners[eventName].push(fn)
  return this
}
```

- 해당 이벤트 배열이 없으면 빈 배열 생성
- 콜백 함수를 배열에 추가
- `return this`로 메서드 체이닝 지원

관련 개념

- 단축 평가(Short-circuit Evaluation)
- 옵저버 패턴(Observer Pattern)
- 메서드 체이닝(Method Chaining)

### ② once() — 한 번만 실행

```
once(eventName, fn) {
  this.listeners[eventName] = this.listeners[eventName] || []

  const onceWrapper = (...args) => {
    fn(...args)
    this.off(eventName, onceWrapper)
  }

  this.listeners[eventName].push(onceWrapper)
  return this
}
```

- 원본 함수 `fn`을 직접 등록하지 않고 `onceWrapper`를 등록
- `emit()`으로 실행되면 원본 함수 실행
- 실행 후 `off()`를 호출하여 자기 자신을 배열에서 제거

관련 개념

- 클로저(Closure): 바깥 함수의 변수 기억
- 래퍼 함수(Wrapper Function): 원본 함수를 감싸 추가 기능 제공
- 렉시컬 this(Lexical this): 화살표 함수가 바깥의 `this` 사용

once() 실행 흐름

1. `once('hello', fn)` 호출
2. `onceWrapper` 생성 및 배열에 등록
3. `emit('hello')` 호출
4. `onceWrapper`가 `fn()` 실행
5. `off()`로 `onceWrapper` 제거
6. 다음 `emit()`에서는 실행할 리스너가 없음

### ③ off() — 이벤트 등록 해제

```
off(eventName, fn) {
  const lis = this.listeners[eventName]
  if (!lis) return this

  for (let i = lis.length - 1; i >= 0; i--) {
    if (lis[i] === fn) {
      lis.splice(i, 1)
      break
    }
  }

  return this
}
```

- 이벤트 배열을 가져옴
- 뒤에서부터 콜백을 탐색
- 일치하는 콜백을 `splice()`로 제거
- `break`로 탐색 종료

관련 개념

- 역방향 순회(Reverse Loop)
- `splice()`: 배열의 특정 위치 요소 삭제

### ④ emit() — 이벤트 발생

```
emit(eventName, ...args) {
  const fns = this.listeners[eventName]
  if (!fns) return false

  fns.forEach((f) => {
    f(...args)
  })

  return true
}
```

- 이벤트 이름에 해당하는 콜백 배열 조회
- 등록된 콜백들을 순서대로 실행
- `...args`로 여러 인자를 전달
- 이벤트가 없으면 `false`, 있으면 `true` 반환

관련 개념

- Rest Parameters: 여러 인자를 배열로 받음
- Spread Operator: 배열을 개별 인자로 펼침
- `forEach()`: 배열 순회

## 4. 핵심 JavaScript 개념

| 개념               | 의미                                                       |
| ------------------ | ---------------------------------------------------------- |
| ESM                | `import`, `export`를 사용하는 표준 모듈 시스템             |
| CommonJS           | `require`, `module.exports`를 사용하는 Node.js 모듈 시스템 |
| Hash Map           | 키를 통해 데이터를 빠르게 찾는 자료구조 패턴               |
| Big-O              | 알고리즘의 시간 복잡도 표현                                |
| Observer Pattern   | 상태 변화가 발생하면 구독자에게 알리는 패턴                |
| Short-circuit      | 앞의 조건에 따라 뒤의 표현식 실행 여부 결정                |
| Closure            | 함수가 생성 당시의 외부 변수에 접근할 수 있는 특성         |
| Wrapper            | 기존 함수에 추가 동작을 덧붙여 감싸는 함수                 |
| First-class Object | 함수를 값처럼 변수·배열에 저장하고 전달할 수 있는 특성     |
| Garbage Collection | 더 이상 참조되지 않는 메모리를 회수하는 기능               |

### Rest와 Spread 차이

```
// Rest: 여러 인자를 배열로 묶음
function test(...args) {
  console.log(args)
}

test(200, '성공')
// [200, '성공']

// Spread: 배열을 개별 인자로 펼침
const args = [200, '성공']

function print(code, message) {
  console.log(code, message)
}

print(...args)
// 200 '성공'
```

## 5. 시간 복잡도와 성능

| 개념 | 의미             | 예시                           |
| ---- | ---------------- | ------------------------------ |
| O(1) | 상수 시간        | 객체에서 키로 이벤트 배열 조회 |
| O(N) | 데이터 수에 비례 | 배열 전체를 순회하며 검색      |

강의의 핵심은 이벤트 이름으로 배열을 찾는 과정과, 배열 안에서 콜백을 탐색하는 과정은 다르다는 점이야.

- `listeners[eventName]`: 일반적으로 O(1)
- `forEach()`: 리스너 수에 비례하는 O(N)
- `off()`의 탐색: 최악의 경우 O(N)

## 6. 실무에서 알아둘 점

① 메모리 누수(Memory Leak)

`on()`으로 등록한 콜백은 배열에 계속 남아 있어. 더 이상 필요하지 않은 이벤트를 `off()`로 제거하지 않으면 메모리 사용량이 증가할 수 있어.

② 가비지 컬렉션(Garbage Collection)

배열이 콜백 함수를 계속 참조하고 있으면 해당 함수는 여전히 사용 중인 것으로 판단될 수 있어.

③ 싱글 스레드와 병목 현상(Bottleneck)

`emit()`은 콜백을 순서대로 실행해. 앞선 콜백이 무거운 동기 작업을 수행하면 뒤의 콜백도 실행이 지연돼.

④ 리스너 개수 경고

Node.js의 기본 EventEmitter는 이벤트별 리스너가 기본 최대 개수인 10개를 초과하면 메모리 누수 가능성을 알리는 경고를 표시할 수 있어. 이는 실행을 막는 제한은 아니야.

## 7. 강의 내용에서 기억할 핵심 주의사항

강의는 원리를 설명하기 위한 간단한 구현이야. 실제 Node.js 내장 EventEmitter와 완전히 동일한 구현은 아니야.

| 강의 설명                        | 정확히 구분할 점                                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------------------ |
| 객체 조회는 O(1)                 | 일반적으로 평균 O(1)이며 항상 보장되는 것은 아님                                                 |
| 해시맵은 메모리 주소를 직접 계산 | JavaScript 객체의 내부 구현은 엔진에 따라 다름                                                   |
| ESM은 비동기적 로딩              | ESM의 모듈 로딩·평가는 CommonJS와 다른 규칙을 따르지만 단순히 비동기적이라고만 설명하면 부정확함 |
| 클로저가 변수를 영원히 기억      | 필요한 외부 변수에 계속 접근할 수 있는 것이며, 영원히 메모리에 남는다는 뜻은 아님                |
| 커스텀 구현이 내장 모듈과 동일   | 핵심 원리만 재현한 단순 구현임                                                                   |

특히 `once()` 구현에서 원본 함수가 예외를 던지는 경우 제거 코드가 실행되지 않을 수 있어. 실무에서는 제거 시점과 예외 처리도 고려해야 해.

## 8. 최종 암기

## EventEmitter 핵심 흐름

1. listeners 객체에 이벤트 이름별 배열을 관리한다.
2. \*\*on()\*\*으로 콜백을 배열에 등록한다.
3. \*\*emit()\*\*으로 해당 이벤트의 콜백을 실행한다.
4. \*\*once()\*\*는 래퍼 함수를 등록하고 실행 후 제거한다.
5. \*\*off()\*\*는 등록된 콜백을 배열에서 제거한다.

가장 중요한 개념

EventEmitter는 객체와 배열에 콜백 함수를 저장하고, 이벤트가 발생하면 해당 콜백들을 실행하는 구조다.

이번 강의에서 가장 중요하게 이해해야 할 것은 객체 + 배열 + 함수 + 클로저 + 옵저버 패턴의 조합이야.
