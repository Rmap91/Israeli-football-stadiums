const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/stadiums.db');

console.log('🔧 Fixing stadium assignments...\n');

// Stadium updates needed
const fixes = [
  // Fix מרים - keep only מכבי נתניה
  {
    action: 'UPDATE',
    id: 9,
    oldStadium: 'מרים',
    newStadium: 'קריית-שמונה',
    newStadiumEn: 'קריית-שמונה (Kiryat Shmona Municipal)',
    team: 'עירוני קריית שמונה',
    reason: 'Kiryat Shmona plays at their own stadium, not Marim'
  },
  {
    action: 'UPDATE',
    id: 13,
    oldStadium: 'מרים',
    newStadium: 'הרצליה',
    newStadiumEn: 'הרצליה (Herzliya Municipal)',
    team: 'מכבי הרצליה',
    reason: 'Herzliya plays at their own stadium, not Marim'
  },
  
  // Fix אצטדיון גרין - keep only מכבי בני ריינה
  {
    action: 'UPDATE',
    id: 8,
    oldStadium: 'אצטדיון גרין',
    newStadium: 'טבריה',
    newStadiumEn: 'טבריה (Tiberias Municipal)',
    team: 'עירוני טבריה',
    reason: 'Tiberias plays at their own stadium'
  },
  {
    action: 'UPDATE',
    id: 20,
    oldStadium: 'אצטדיון גרין',
    newStadium: 'נוף-הגליל',
    newStadiumEn: 'נוף-הגליל (Nof HaGalil)',
    team: 'הפועל נוף-הגליל',
    reason: 'Nof HaGalil plays at their own stadium'
  },
  
  // Fix אצטדיון רמת-גן
  {
    action: 'UPDATE',
    id: 25,
    oldStadium: 'אצטדיון רמת-גן',
    newStadium: 'רעננה',
    newStadiumEn: 'רעננה (Ra\'anana Municipal)',
    team: 'הפועל רעננה',
    reason: 'Ra\'anana plays at their own stadium'
  },
  
  // Fix אצטדיון שכונת התקווה
  {
    action: 'UPDATE',
    id: 19,
    oldStadium: 'אצטדיון שכונת התקווה',
    newStadium: 'כפר שלם',
    newStadiumEn: 'כפר שלם (Kfar Shalem)',
    team: 'הפועל כפר שלם',
    reason: 'Kfar Shalem plays at their own stadium'
  },
  
  // Fix האצטדיון העירוני עפולה - ID 26 should stay, ID 24 (Hadera) should change
  {
    action: 'UPDATE',
    id: 24,
    oldStadium: 'האצטדיון העירוני עפולה',
    newStadium: 'חדרה',
    newStadiumEn: 'חדרה (Hadera Municipal)',
    team: 'הפועל חדרה',
    reason: 'Hadera plays at their own stadium, not in Afula'
  },
  
  // Fix טוטו עכו
  {
    action: 'UPDATE',
    id: 22,
    oldStadium: 'טוטו עכו',
    newStadium: 'קריית-ים',
    newStadiumEn: 'קריית-ים (Kiryat Yam)',
    team: 'מ.ס. קריית-ים',
    reason: 'Kiryat Yam plays at their own stadium'
  }
];

console.log(`Found ${fixes.length} stadium assignments to fix\n`);

fixes.forEach((fix, index) => {
  console.log(`${index + 1}. ${fix.team}`);
  console.log(`   From: ${fix.oldStadium} → To: ${fix.newStadium}`);
  console.log(`   Reason: ${fix.reason}\n`);
});

console.log('\n⚠️ WARNING: This will modify the database!');
console.log('Run with --execute flag to apply changes: node fix-stadium-assignments.js --execute\n');

if (process.argv.includes('--execute')) {
  console.log('🚀 Applying fixes...\n');
  
  let completed = 0;
  fixes.forEach(fix => {
    db.run(
      'UPDATE stadiums SET name_hebrew = ?, name_english = ? WHERE id = ?',
      [fix.newStadium, fix.newStadiumEn, fix.id],
      (err) => {
        if (err) {
          console.error(`❌ Error updating ID ${fix.id}:`, err);
        } else {
          console.log(`✅ Updated ID ${fix.id}: ${fix.team} → ${fix.newStadium}`);
        }
        
        completed++;
        if (completed === fixes.length) {
          console.log('\n✅ All fixes applied!');
          db.close();
        }
      }
    );
  });
} else {
  db.close();
}
