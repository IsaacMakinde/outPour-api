import { db } from "../db/database.js";

const postModel = {
  getAll: async () => {
    const res = await db.query(`SELECT * FROM posts`);
    return res.rows;
  },

  getById: async (id) => {
    const res = await db.query(`SELECT * FROM posts WHERE id = $1`, [id]);
    return res.rows[0];
  },

  create: async (user_id, post_content, post_tone) => {
    const res = await db.query(
      `INSERT INTO posts (user_id, post_content, post_tone) 
        VALUES ($1, $2, $3)
        RETURNING *`,
      [user_id, post_content, post_tone]
    );

    return res.rows[0];
  },

  update: async (id, user_id, post_content, post_tone) => {
    const res = await db.query(
      `UPDATE posts 
        SET user_id = $1, post_content = $2, post_tone = $3 WHERE id = $4
        RETURNING *`,
      [user_id, post_content, post_tone, id]
    );

    return res.rows[0];
  },

  delete: async (id) => {
    db.query(`DELETE FROM posts WHERE id = $1`, [id]);
    return { message: `post ${id} deleted` };
  },
};

export default postModel;
