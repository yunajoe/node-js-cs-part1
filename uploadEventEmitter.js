import EventEmitter from "node:events";
import fs from "node:fs"; // 파일 시스템을 다루는 핵심 내장 모듈 추가!

class Uploader extends EventEmitter {
  constructor(filePath, targetPath) {
    super();
    this.filePath = filePath;
    this.targetPath = targetPath;
    // 파일의 전체 크기(바이트)를 하드디스크를 뒤져 미리 측정합니다.
    this.fileSize = fs.statSync(filePath).size;
    this.uploaded = 0;
  }

  startUpload() {
    this.emit("uploadStarted");
    // 파일을 한 번에 올리지 않고, 수도관(스트림)을 연결해 조금씩 흘려보냅니다.
    const stream = fs.createReadStream(this.filePath);
    const writeStream = fs.createWriteStream(this.targetPath);

    // 물결(청크)이 한 모금씩 도착할 때마다 터지는 이벤트
    stream.on("data", (chunk) => {
      this.uploaded += chunk.length; // 방금 도착한 바이트 수만큼 누적
      this.emit("progressUpdate", this.uploaded / this.fileSize); // 누적량 / 전체량 방출!
    });

    // 물이 다 말랐을 때(파일 끝) 터지는 이벤트
    stream.on("end", () => {
      this.emit("uploadComplete");
    });

    // 읽기 수도관과 쓰기 수도관을 직접 파이프(pipe)로 꽂아 연결합니다.
    stream.pipe(writeStream);
  }
}

const uploader = new Uploader("원본.txt", "복사본.txt");

const progressBar = {
  updateProgress(progress) {
    console.log(`업로드 진행률: ${Math.round(progress * 100)}%`);
  },
};

uploader.on("uploadStarted", () => console.log("업로드 시작됨"));
uploader.on("progressUpdate", (progress) =>
  progressBar.updateProgress(progress),
);
uploader.on("uploadComplete", () => console.log("업로드 완료"));

// 더미 파일이 필요하므로 주석 처리 (실제 환경에서 원본.txt를 만들고 실행하세요)
uploader.startUpload();
