import EventEmitter from "node:events";

class TaskQueue extends EventEmitter {
  constructor() {
    super();
    this.queue = [];
  }

  addTask(task) {
    this.queue.push(task);
    this.emit("taskAdded");
  }

  startWorker() {
    this.on("taskAdded", () => {
      if (this.queue.length) {
        // 큐의 맨 앞에서부터 작업을 하나씩 빼내어 실행합니다. (FIFO)
        const task = this.queue.shift();
        task();
      }
    });
  }
}

const queue = new TaskQueue();

const task1 = () => {
  console.log("작업 1 실행");
};
const task2 = () => {
  console.log("작업 2 실행");
};

queue.addTask(task1);
queue.addTask(task2);

queue.startWorker();
