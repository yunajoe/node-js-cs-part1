import fs from "node:fs";
import path from "node:path";

const currentFolder = import.meta.dirname;
const filePath = path.join(currentFolder, "message.txt");

const fileContent = fs.readFileSync(filePath, "utf8");

console.log(`읽어온 파일 내용: ${fileContent}`);
