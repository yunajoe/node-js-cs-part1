import EventEmitter from "node:events";

class Button extends EventEmitter {
  constructor(text) {
    super();
    this.text = text;
  }

  click() {
    this.emit("click");
  }
}

const button = new Button("클릭하세요");
button.on("click", () => {
  console.log("버튼이 클릭되었습니다!");
});

button.click();
