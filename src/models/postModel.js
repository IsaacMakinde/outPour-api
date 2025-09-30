import { db } from "../db/database.js";

const postModel = {
  getAllPost: () => {
    return db.prepare(`SELECT * FROM posts`).all();
  },

  getPostById: (id) => {
    return db.prepare(`SELECT * FROM posts WHERE id = ?`).get(id);
  },
  create: (userID, postContent, postTone) => {
    return db
      .prepare(
        `INSERT INTO posts (userID, postContent, postTone) VALUES (?, ?, ?)`
      )
      .run(userID, postContent, postTone);
  },
};

// export async function getAllPosts() {
//   return db.prepare("SELECT * FROM posts ORDER BY createdAT DESC").all();
// }

// export async function getPostById(id) {
//   return db.prepare("SELECT * FROM posts WHERE id = ?", [id]);
// }

// export async function createPost({ userID, postContent, postTone }) {
//   const db = await initDB();
//   const result = await db.run(
//     "INSERT INTO posts (userID, postContent, postTone) VALUES (?, ?, ?)",
//     [userID, postContent, postTone]
//   );

//   return { id: result.lastID, userID, postContent, postTone };
// }

export default postModel;
