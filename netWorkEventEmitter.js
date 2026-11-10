import EventEmitter from "node:events";

class MockSocket extends EventEmitter {
  constructor() {
    super();
  }
  connect() {
    this.emit("connect");
    setTimeout(() => {
      this.emit("data", { message: "서버에서 보내는 가짜 응답입니다!" });
    }, 1000);
  }
}

const socket = new MockSocket();
socket.on("connect", () => {
  console.log("소켓이 연결되었습니다.");
});

socket.on("data", (data) => {
  console.log("수신된 데이터:", data);
});

socket.connect();
