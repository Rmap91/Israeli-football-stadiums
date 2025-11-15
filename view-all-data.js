const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/stadiums.db');

console.log('📊 Checking database structure...\n');

db.all('SELECT * FROM stadiums ORDER BY id', [], (err, rows) => {
  if (err) {
    console.error('Error:', err);
    return;
  }

  console.log(`Total rows: ${rows.length}\n`);
  
  // Show all rows
  rows.forEach(row => {
    console.log(`ID ${row.id}:`);
    console.log(`  Stadium: ${row.name_hebrew} (${row.name_english})`);
    console.log(`  Team: ${row.clubs_playing}`);
    console.log(`  City: ${row.city}`);
    console.log('');
  });

  db.close();
});
