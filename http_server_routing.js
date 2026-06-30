import http from "node:http";

const server = http.createServer((request, response) => {
  if (request.url === "/") {
    // 편지 봉투에 내용물이 일반 텍스트임을 명시합니다. (헤더 작성)
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    response.write("Hello World! 환영합니다.");
    response.end();
  }

  if (request.url === "/api/courses") {
    const courses = [1, 2, 3];
    // 편지 봉투에 내용물이 JSON 형식의 데이터임을 명시합니다.
    response.writeHead(200, { "Content-Type": "application/json" });

    // response.write()나 response.end() 메서드는  텍스트(String)나 바이너리 데이터(Buffer)만 이해한다. 다른 타입을 보내면은 서버가 강제 종료
    // response.write(courses);
    response.write(JSON.stringify(courses));
    response.end();
  }
});

server.listen(3000);
console.log("라우팅 서버가 3000번 포트에서 가동 중입니다...");
