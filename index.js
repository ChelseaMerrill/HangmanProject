import wordBank from "./word-bank.js";
import prompt from "readline-sync";
const answer = prompt.question("Does this work?");
console.log(wordBank[7]);
console.log(answer);