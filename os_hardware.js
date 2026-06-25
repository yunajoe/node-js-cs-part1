import os from "node:os";

const osType = os.type();
const osRelease = os.release();
const uptime = os.uptime();

const cpuInfo = os.cpus();
const totalMemory = os.totalmem();
const freeMemory = os.freemem();

// 바이트(Byte) 단위를 기가바이트(GB)로 변환하는 작업
const totalGB = (totalMemory / 1024 / 1024 / 1024).toFixed(2);
const freeGB = (freeMemory / 1024 / 1024 / 1024).toFixed(2);

console.log(`운영체제 종류: ${osType}`);
console.log(`운영체제 버전: ${osRelease}`);
console.log(`컴퓨터가 켜진 후 흐른 시간: ${uptime}초`);

console.log(`내 컴퓨터의 CPU 코어 개수: ${cpuInfo.length}개`);
console.log(`전체 메모리 용량: ${totalGB} GB`);
console.log(`현재 사용 가능한 여유 메모리: ${freeGB} GB`);
