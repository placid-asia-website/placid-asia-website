const bcrypt = require('bcryptjs');

const password = 'Placid2024!';
const hash = '$2b$10$'; // This will be replaced

// Let's check if the hash from database works
const testHash = '$2b$10$someHashValue'; // Placeholder

console.log('Testing password:', password);
console.log('Hash format:', hash);

// Test hashing
bcrypt.hash(password, 10).then(newHash => {
  console.log('New hash created:', newHash);
  
  // Test comparison
  bcrypt.compare(password, newHash).then(result => {
    console.log('Password matches new hash:', result);
  });
});
