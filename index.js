// [비교] 과거의 CommonJS 방식 (동기적 로딩)
const eventEmitter = require("events");
module.exports = CustomEventEmitter;

// [비교] 현재의 ESM 방식 (비동기적, 구조적 로딩 - 우리가 실무에서 사용할 방식)
export default class CustomEventEmitter {}
