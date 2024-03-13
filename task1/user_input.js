const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function getUserInput() {
    const name = await askQuestion("Enter your name: ");
    const count = parseInt(await askQuestion("How many favorite programming languages do you have? "));

    return { name, count };
}

async function getFavoriteLanguages(count) {
    const languages = [];

    for (let i = 0; i < count; i++) {
        const lang = await askQuestion(`Enter your favorite programming language #${i + 1}: `);
        languages.push(lang);
    }

    return languages;
}

function displayUserName(name) {
    console.log(`Hello, ${name}! Your favorite programming languages are:`);
}

function displayFavoriteLanguages(languages) {
    console.log("Your favorite languages are:");

    languages.forEach((lang) => {
        console.log(`- ${lang}`);
    });
}

function calculateCharCount(languages) {
    const totalChars = languages.join('').length;
    console.log(`The total characters are: ${totalChars}`);

}

async function displayLanguages() {
    const { name, count } = await getUserInput();
    const languages = await getFavoriteLanguages(count);

    displayUserName(name);
    displayFavoriteLanguages(languages);
    calculateCharCount(languages)

    rl.close();
}

displayLanguages();