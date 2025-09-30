import { db } from "../db/database.js";

const commentModel = {
  getAll: async () => {
    const res = db.query(`SELECT * FROM comments`);
    return res.rows;
  },

  getById: async (id) => {
    const res = await db.query(`SELECT * FROM comments WHERE id = $1`, [id]);
    return res.rows[0];
  },
  create: async (user_id, post_id, comment_content, comment_tone) => {
    const res = await db.query(
      `INSERT INTO comments (user_id, post_id, comment_content, comment_tone) 
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
      [user_id, post_id, comment_content, comment_tone]
    );

    return res.rows[0];
  },
  update: async (id, user_id, post_id, comment_content, comment_tone) => {
    const res = await db.query(
      `UPDATE comments 
        SET user_id = $1,  post_id = $2, comment_content = $3,  comment_tone = $4 WHERE id = $5 
        RETURNING *`,
      [user_id, post_id, comment_content, comment_tone, id]
    );
    return res.row[0];
  },

  delete: async (id) => {
    db.query(`DELETE FROM comments WHERE id = $1`, [id]);
    return { message: `comment ${id} deleted` };
  },
};

export default commentModel;
