const fs = require('fs');
const path = require('path');

// Function to read and parse TypeScript files
function readTSFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    // Extract the array from the TypeScript file using regex
    const match = content.match(/export const \w+Words: VocabularyWord\[\] = (\[[\s\S]*?\]);/);
    if (!match) {
        console.error(`Could not find word array in ${filePath}`);
        return [];
    }
    // Parse the array content
    try {
        // Replace TypeScript-specific syntax with valid JSON
        const jsonStr = match[1]
            .replace(/(\w+):/g, '"$1":') // Convert property names to strings
            .replace(/'/g, '"'); // Replace single quotes with double quotes
        return JSON.parse(jsonStr);
    } catch (err) {
        console.error(`Error parsing ${filePath}:`, err);
        return [];
    }
}

// Source directory (frontend)
const sourceDir = path.join(__dirname, '../../src/data');

// Process N5-N1 word files
const levels = ['n5', 'n4', 'n3', 'n2', 'n1'];
const allWords = [];

levels.forEach(level => {
    const filePath = path.join(sourceDir, `${level}-words.ts`);
    if (fs.existsSync(filePath)) {
        console.log(`Processing ${level} words...`);
        const words = readTSFile(filePath);
        allWords.push(...words);
        console.log(`Added ${words.length} words from ${level}`);
    } else {
        console.log(`Warning: ${level} words file not found at ${filePath}`);
    }
});

// Write the combined words to the backend data file
const outputPath = path.join(__dirname, '../data/words.js');
const outputContent = `module.exports = ${JSON.stringify(allWords, null, 2)};`;

fs.writeFileSync(outputPath, outputContent);
console.log(`Total words written to backend: ${allWords.length}`);
