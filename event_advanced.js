import EventEmitter from "node:events";

const serverEmitter = new EventEmitter();

//  .once() 메서드: 이벤트가 여러 번 발생해도 딱 한 번만 실행되고 사라집니다.
serverEmitter.once("userLogin", (username, ipAddress) => {
  console.log(
    `[보안 알림] ${username}님이 최초로 로그인하셨습니다. (IP: ${ipAddress})`,
  );
});

// .on() 메서드: 이벤트가 발생할 때마다 계속해서 실행
serverEmitter.on("dataReceived", (dataSize) => {
  console.log(`[통신] ${dataSize} 바이트의 데이터를 성공적으로 수신했습니다.`);
});

serverEmitter.emit("userLogin", "홍길동", "192.168.0.1");
serverEmitter.emit("userLogin", "홍길동", "192.168.0.1"); //  once로 등록되었기 때문에 이 신호는 무시

serverEmitter.emit("dataReceived", 1024);
serverEmitter.emit("dataReceived", 2048);
