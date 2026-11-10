import EventEmitter from "node:events";

class Task extends EventEmitter {
  constructor(name, taskFn) {
    super();
    this.name = name;
    this.taskFn = taskFn;
  }
  run(previousTask) {
    if (previousTask) {
      previousTask.on("complete", () => {
        this.taskFn()
          .then(() => this.emit("complete"))
          .catch((error) => this.emit("error", error));
      });
    } else {
      this.taskFn()
        .then(() => this.emit("complete"))
        .catch((error) => this.emit("error", error));
    }
  }
}

const task1 = new Task(
  "데이터 다운로드",
  () =>
    new Promise((resolve, reject) => {
      setTimeout(() => resolve("데이터 다운로드 완료"), 1000);
    }),
);

const task2 = new Task(
  "데이터 처리",
  (data) =>
    new Promise((resolve, reject) => {
      setTimeout(() => resolve("데이터 처리 완료"), 2000);
    }),
);

task1.on("complete", () => console.log("[1] 완료:", task1.name));
task2.on("complete", () => console.log("[2] 완료:", task2.name));

// ”task1이 끝나면 task2를 실행하도록 예약해 둬
task2.run(task1);
task1.run();
