import fs from "node:fs";
import path from "node:path";

const currentFolder = import.meta.dirname;
console.log("currentFolder", currentFolder);
const filePath = path.join(currentFolder, "message.txt");
console.log("filePath", filePath);

fs.writeFileSync(filePath, "안녕하세요! Node.JS가 파일 시스템에 접근했습니다.");
