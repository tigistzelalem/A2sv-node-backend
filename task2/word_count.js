function countWords(phrase) {
    var words = phrase.toLowerCase().replace(/[.,]/g, '').split(' ');
    var wordCount = new Map();
    for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
        var word = words_1[_i];
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
    for (var _i = 0, _a = wordCount.entries(); _i < _a.length; _i++) {
        var _b = _a[_i], word = _b[0], count = _b[1];
        console.log("--> ".concat(word, ": ").concat(count));
    }
}
var phrase = prompt("Enter phrase: ");
if (phrase) {
    var wordCount = countWords(phrase);
    displayWordCount(wordCount);
}
