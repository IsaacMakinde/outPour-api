// db/database.js
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false, // needed for Heroku SSL
});

// Initialize tables if they don’t exist
async function init() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      post_content TEXT,
      post_tone TEXT,
      user_id TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      comment_content TEXT,
      comment_tone TEXT,
      user_id TEXT,
      post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

init().catch((err) => console.error("DB init failed:", err));
