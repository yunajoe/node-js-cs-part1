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

// 프로미스(Promise)를 활용한 비동기 작업 정의
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

// task1이 완료되면 task2가 실행되도록 연결
task2.run(task1);
// 가장 앞단인 task1 실행
task1.run();
