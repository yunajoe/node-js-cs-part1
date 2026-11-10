import EventEmitter from "node:events";
class Store extends EventEmitter {
  constructor(initialState) {
    super();
    this.state = initialState;
  }

  getState() {
    return this.state;
  }
  setState(newState) {
    this.state = newState;
    this.emit("stateChange", this.state);
  }
}

const store = new Store({ count: 0 });

const component1 = {
  render() {
    console.log("컴퍼넌트 1 출력 카운트", store.getState().count);
  },
};

const component2 = {
  render() {
    console.log("컴포넌트 2 출력 카운트:", store.getState().count);
  },
};

store.on("stateChange", () => {
  component1.render();
  component2.render();
});

store.setState({ count: 1 });
