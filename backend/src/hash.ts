import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const password = process.argv[2];

if (!password) {
  console.error("❌ Please provide a password to hash.");
  process.exit(1);
}

bcrypt.hash(password, SALT_ROUNDS)
  .then((hash) => {
    console.log("🔐 Hashed password:");
    console.log(hash);
  })
  .catch((err) => {
    console.error("Error hashing password:", err);
  });
