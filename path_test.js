import path from "node:path";

// 현재 파일이 위치한 폴더의 경로
/**
 *  윈도우즈(Windows)는 역슬래시 (\), 맥(Mac)이나 리눅스(Linux)는 슬래시(/)
 *
 */
const currentFolder = import.meta.dirname; // /Users/yunajoe/Desktop/node-js-cs-part1
const safePath = path.join(currentFolder, "assets", "images", "profile.png");

console.log(`현재 실행 중인 폴더: ${currentFolder}`);
console.log(`안전하게 조립된 최종 경로: ${safePath}`);
