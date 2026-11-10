import EventEmitter from "node:events";
import http from "node:http";
import { Server } from "socket.io"; // 양방향 통신을 위한 외부 라이브러리

// HTTP 서버 위에 Socket.io 서버를 덮어씌웁니다.
const server = http.createServer();
const io = new Server(server);

const messageEmitter = new EventEmitter();

io.on("connection", (socket) => {
  // 사용자가 연결되었을 때 클라이언트 브라우저로 신호 전송
  socket.emit("connected");

  // 클라이언트(사용자)가 폼에 글을 쓰고 메시지를 전송하면
  socket.on("message", (message) => {
    // 1. 서버가 받아서 내부의 마스터 허브로 이벤트를 쏘아 올립니다.
    messageEmitter.emit("newMessage", message);
  });

  // 내부 허브에서 새 메시지 이벤트가 감지되면
  messageEmitter.on("newMessage", (message) => {
    // 2. 해당 연결(소켓)을 타고 다시 클라이언트 화면으로 메시지를 뿌려줍니다.
    socket.emit("message", message);
  });
});

server.listen(3000, () => {
  console.log("3000번 포트에서 실시간 채팅 서버가 실행 중입니다.");
});
