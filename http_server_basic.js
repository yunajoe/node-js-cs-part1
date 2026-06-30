import http from "node:http";

const server = http.createServer((req, res) => {
  console.log("서버!");
  res.end();
});

/**
 * connection 이벤트가 발생하는 시점:
   서버가 대기하고 있다가, 실제 웹 브라우저(클라이언트)가 우리 서버에 딱 접속하는 그 순간! Node.js 내부에서 자동으로 "앗, 손님 들어왔다! connection 이벤트 발생!" 하고 
   이벤트를 터트립니다.
 */

/**
 * server.on() 메서드는 Node.js의 핵심 개념인 이벤트 리스너(Event Listener)를 등록하는 함수입니다.
   쉽게 말해, 서버에게 "앞으로 ~한 일이 일어나면(이벤트), 내가 준 이 함수(콜백 함수)를 실행해줘!"라고 예약(구독)해 두는 역할
 */
server.on("connection", () => {
  console.log("알림: 새로운 사용자가 서버에 접속했습니다!");
});

server.listen(3000); // 3000번 포트 문 열고 손님 받을 준비 해!" 라고 명령을 내리는 것

console.log("서버가 3000번 포트에서 요청을 기다리고 있습니다...");
