import * as StationSystems from "./modules/index.js";
import igniteCore, { MAX_TEMP as CRITICAL_CORE_TEMP } from "./reactor.js";

console.log(igniteCore);
console.log(CRITICAL_CORE_TEMP);

console.log(StationSystems.getPowerLevel());
console.log(StationSystems.routePower());
console.log(StationSystems.scanSector());
