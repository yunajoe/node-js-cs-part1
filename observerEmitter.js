import EventEmitter from "node:events";
class Observable extends EventEmitter {
  constructor(subscribeFunction) {
    super();
    this.subscribeFunction = subscribeFunction;
  }

  subscribe(onNext, onError, onComplete) {
    const subscription = this.subscribeFunction(onNext, onError, onComplete);
    return {
      unsubscribe: () => {
        subscription.unsubscribe();
      },
    };
  }
  next(value) {
    this.emit("next", value);
  }
  error(error) {
    this.emit("error", error);
  }
  complete() {
    this.emit("complete");
  }
}

const observable = new Observable((onNext, onError, onComplete) => {
  // 비동기 데이터 스트림을 흉내 냅니다.
  const t1 = setTimeout(() => onNext("데이터 값 1"), 1000);
  const t2 = setTimeout(() => onNext("데이터 값 2"), 2000);
  const t3 = setTimeout(() => onComplete(), 3000);
  return {
    // 구독 취소 시 모든 타이머를 꺼버립니다.
    unsubscribe: () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      console.log("구독이 성공적으로 해지되었습니다.");
    },
  };
});

const subscription = observable.subscribe(
  (value) => console.log("수신됨:", value),
  (error) => console.error("에러:", error),
  () => console.log("모든 스트림 수신 완료"),
);

// 만약 구독을 중간에 끊고 싶다면 아래 코드를 실행합니다:
// subscription.unsubscribe();
