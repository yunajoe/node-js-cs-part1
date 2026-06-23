import broadcastMessage, { frequency } from "./communication.js";

broadcastMessage();
console.log(`현재 통신 주파수: ${frequency}`);
