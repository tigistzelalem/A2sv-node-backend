import * as readline from 'readline';

function countWords(phrase: string): Map<string, number> {
    const words = phrase.toLowerCase().replace(/[.,]/g, '').split(' ');

    const wordCount = new Map<string, number>();

    for (const word of words) {
        if (wordCount.has(word)) {
            wordCount.set(word, wordCount.get(word)! + 1);
        } else {
            wordCount.set(word, 1);
        }

    }
    return wordCount

}


function displayWordCount(wordCount: Map<string, number>): void {
    console.log("words count: ");
    for (const [word, count] of wordCount.entries()) {
        console.log(`--> ${word}: ${count}`)
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