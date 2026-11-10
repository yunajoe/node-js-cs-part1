import { EventEmitter } from "node:events";

class Task extends EventEmitter {
  constructor() {
    super();
  }

  start() {
    this.emit("started");
    setTimeout(() => {
      this.emit("progress", 50);
      setTimeout(() => {
        this.emit("progress", 100);
        this.emit("complete");
      }, 1000);
    }, 2000);
  }
}

const task = new Task();

task.on("started", () => {
  console.log("작업이 시작되었습니다.");
});

task.on("progress", (progress) => {
  console.log(`현재 진행률: ${progress}%`);
});

task.on("completed", () => {
  console.log("작업이 성공적으로 완료되었습니다.");
});

task.start();
