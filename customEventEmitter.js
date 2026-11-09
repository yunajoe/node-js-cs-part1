// events.js 파일에 작성할 커스텀 EventEmitter 구현체
// 최신 자바스크립트 표준 모듈 시스템인 ESM을 사용하기 위해 export default를 사용합니다.

export default class CustomEventEmitter {
  listeners = {}; // 이벤트를 관리할 마스터 객체입니다.

  on(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
    return this;
  }

  once(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    const onceWrapper = (...args) => {
      fn(...args);
      this.off(eventName, onceWrapper);
    };
    this.listeners[eventName].push(onceWrapper);
  }

  emit(eventName, ...args) {
    let fns = this.listeners[eventName];
    if (!fns) return false;
    fns.forEach((f) => {
      f(...args);
    });
    return true;
  }

  off(eventName, fn) {
    let lis = this.listeners[eventName];
    if (!lis) return this;
    for (let i = this.listeners.length - 1; i >= 0; i--) {
      if (lis[i] === fn) {
        lis.splice(i, 1);
        break;
      }
    }
    return this;
  }
}
