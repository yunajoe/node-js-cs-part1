import EventEmitter from "node:events";

class alertEmitter extends EventEmitter {}

const my = new alertEmitter();

// 1. 단일 인자 테스트
my.on("알림발생", () => {
  console.log("새로운 알림이 성공적으로 처리되었습니다 1.");
});

my.on("알림발생", () => {
  console.log("새로운 알림이 성공적으로 처리되었습니다 2.");
});

my.on("알림발생", (x) => {
  console.log("새로운 알림이 성공적으로 처리되었습니다 3.");
  console.log(x);
});

console.log("--- 기본 알림발생 이벤트 ---");
my.emit("알림발생");
my.emit("알림발생", "전달할 단일 텍스트 데이터");

// 2. 다중 인자 테스트
my.on("상태업데이트", (상태코드, 메시지) => {
  console.log(`응답 상태코드: ${상태코드}, 상세 메시지: ${메시지}`);
});

console.log("\\\\n--- 다중 인자 전달 이벤트 ---");
// 이벤트 방출 시 인자를 무한히 콤마로 연결하여 넘길 수 있습니다.
my.emit("상태업데이트", 200, "모든 작업이 정상적으로 완료되었습니다.");

// 3. 에러 처리 테스트 (Node.js의 예약된 이벤트)
// 치명적인 대참사를 막기 위한 필수 방어막
my.on("error", (err) => {
  // 서버가 죽는 대신 여기서 에러를 우아하게 처리합니다.
  console.error("시스템 에러가 안전하게 감지되었습니다:", err.message);
});

console.log("\\\\n--- 에러 발생 이벤트 ---");
my.emit("error", new Error("데이터베이스 연결이 끊어졌습니다."));

// once 한번 실행
my.once("단한번알림", () => {
  console.log("이 알림은 딱 한 번만 출력됩니다.");
});

my.emit("단한번알림"); // 첫 번째 방출: 정상 실행됨
my.emit("단한번알림"); // 두 번째 방출: 이미 함수가 삭제되어 무시됨
my.emit("단한번알림"); // 세 번째 방출: 무시됨

// 1. 현재 특정 이벤트에 몇 개의 함수가 등록되어 있는지 셉니다.
// 마스터 객체 내부 배열의 length(길이)를 반환하는 것과 같습니다.
console.log(my.listenerCount("알림발생"));

// 2. 누군가 새로운 이벤트를 등록할 때마다 이를 감지하는 예약된 이벤트입니다.
my.on("newListener", (이벤트이름, 리스너함수) => {
  console.log(`새로운 리스너가 추가되었습니다: ${이벤트이름}`);
});
