import { getInfo as getAppleInfo } from "./apple.js";
import { getInfo as getBananaInfo } from "./banana.js";

import { log } from "./utils/logger.js";
import { add } from "./utils/math.js";

import * as MathTools from "./math.js";
// 대표 기능인 connect는 중괄호 없이 밖으로, 일반 기능인 apiVersion은 중괄호 안에 적습니다.
import connect, { apiVersion } from "./service.js";

getAppleInfo();
getBananaInfo();
console.log(MathTools.add(5, 3));
console.log(MathTools.multiply(4, 2));

log(add(10, 20));

console.log(`현재 API 버전: ${apiVersion}`);
connect();
