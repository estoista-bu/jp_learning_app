const fs = require('fs');
const path = require('path');
const { db } = require('@prisma/client');

// Define directory and files
const dirPath = path.join(__dirname, 'src/data');
const files = fs.readdirSync(dirPath).filter(file =>
  file.startsWith('n') &&
  file.endsWith('.ts') &&
  !file.startsWith('index')
);

// Process each file
files.forEach(file => {
  const filePath = path.join(dirPath, file);
  const content = fs.readFileSync(filePath, 'utf8');

  try {
    // Parse JSON and handle errors
    const data = JSON.parse(content);
    if (!Array.isArray(data)) {
      console.warn(`Invalid JSON format in ${filePath}`);
      return;
    }

    // Add fallback for malformed entries
    const fallbackData = data || [{ id: 'fallback', word: 'N/A' }];
    const processedData = fallbackData.map(entry => ({
      id: entry.id,
      word: entry.word,
      length: entry.length,
      category: entry.category,
      source: entry.source
    }));

    // Write to file (optional, for debugging)
    fs.writeFileSync(filePath, JSON.stringify(processedData, null, 2));

    // Log success
    console.log(`Processed ${file}`);
    // Insert into the database
    db.words.create({
      data: {
      word: entry.word,
      category: entry.category,
        length: entry.length,
        source: entry.source,
      },
    });
  } catch (error) {
    console.error(`Error parsing ${filePath}: ${error.message}`);
    // Optionally skip malformed entries
    const fallbackData = [{ id: 'fallback', word: 'N/A' }];
    const processedData = fallbackData.map(entry => ({
      id: entry.id,
      word: entry.word,
      length: entry.length,
      category: entry.category,
      source: entry.source
    }));

    // Write to file (optional, for debugging)
    fs.writeFileSync(filePath, JSON.stringify(processedData, null, 2));
    console.log(`Skipped malformed entry in ${file}`);
  }
});

console.log("Seeding process complete.");

