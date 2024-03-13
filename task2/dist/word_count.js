"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
function countWords(phrase) {
    const words = phrase.toLowerCase().replace(/[.,]/g, '').split(' ');
    const wordCount = new Map();
    for (const word of words) {
        if (wordCount.has(word)) {
            wordCount.set(word, wordCount.get(word) + 1);
        }
        else {
            wordCount.set(word, 1);
        }
    }
    return wordCount;
}
function displayWordCount(wordCount) {
    console.log("words count: ");
    for (const [word, count] of wordCount.entries()) {
        console.log(`--> ${word}: ${count}`);
    }
}
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("Enter phrase: ", (phrase) => {
    const wordCount = countWords(phrase);
    displayWordCount(wordCount);
    rl.close();
});
