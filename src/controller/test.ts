const fs = require('fs')
const words = fs.readFileSync('./words.txt', 'utf-8');
console.log(words);