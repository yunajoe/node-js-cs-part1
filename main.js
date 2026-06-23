import * as Configs from "./config.js"; // Named 여러 개를 거대한 객체 하나로 묶어서 import
import { DB_PORT as port } from "./config.js"; //  별칭 실습을 위해 따로 한 번 더 콕 집어 import (이름표 교체!)
import mainFunc from "./util.js"; // default를 내 맘대로 새 이름으로 import

mainFunc("홍길동");
console.log(`기본 호스트 정보: ${Configs.DB_HOST}`);
console.log(`연결 포트 정보: ${port}`);
