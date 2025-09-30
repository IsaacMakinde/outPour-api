import Database, { Database } from "better-sqlite3";

// Open SQLite connection

export const db = new Database("./database.sqlite");

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    postContent TEXT,
    userID TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    );
    `
).run();
