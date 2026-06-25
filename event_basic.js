import EventEmitter from "node:events";

//  우리만의 독립적인 진동벨 시스템(신호 발생기 인스턴스)을 새롭게 만들어 myEmitter 변수에 담는다.
const myEmitter = new EventEmitter();

//  이벤트를 구독(Listen)하는 과정
myEmitter.on("orderComplete", () => {
  console.log("알림: 고객님의 주문이 완료되었습니다. 음식을 수령해 주세요!");
});

console.log("주문을 접수하고 다른 손님의 주문을 받는 중입니다...");

// 이벤트 방출
/**
 * 주방장이 진동벨 버튼을 꾹 누르는 행위와 같습니다. 괄호 안에 이름을 넣어 신호를 방출하는 찰나의 순간, 아까 .on에서 조용히 귀를 기울이고 있던 메서드가 이를 감지하고 등록해 둔 함수를 번개처럼 실행
 */
myEmitter.emit("orderComplete");
