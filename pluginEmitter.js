import EventEmitter from "node:events";

class Application extends EventEmitter {
  constructor() {
    super();
  }
  triggerEvent(eventName, data) {
    this.emit(eventName, data);
  }
}

class Plugin1 extends EventEmitter {
  constructor(app) {
    super();
    app.on("someEvent", this.handleEvent.bind(this));
  }

  handleEvent(data) {
    console.log("플러그인 1이 이벤트를 수신했습니다:", data);
  }
}

class Plugin2 extends EventEmitter {
  constructor(app) {
    super();
    app.on("otherEvent", this.handleEvent.bind(this));
  }
  handleEvent(data) {
    console.log("플러그인 2가 다른 이벤트를 수신했습니다:", data);
  }
}

const app = new Application();
const plugin1 = new Plugin1(app);
const plugin2 = new Plugin2(app);

app.triggerEvent("someEvent", { message: "인사" });
app.triggerEvent("otherEvent", { message: "인사" });
