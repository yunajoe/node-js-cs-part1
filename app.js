import { getInfo as getAppleInfo } from "./apple.js";
import { getInfo as getBananaInfo } from "./banana.js";
import * as MathTools from "./math.js";
import { log } from "./utils/logger.js";
import { add } from "./utils/math.js";

getAppleInfo();
getBananaInfo();
console.log(MathTools.add(5, 3));
console.log(MathTools.multiply(4, 2));

log(add(10, 20));
