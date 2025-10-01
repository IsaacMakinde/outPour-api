import supabase from "../db/supabaseClient.js";

const commentModel = {
  getAll: async () => {
    const { data, error } = supabase.from("comments").select("*");

    if (error) {
      console.log("Error getting all comments");
      return null;
    }
    return data;
  },

  getById: async (id) => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("id", id);

    if (error) {
      console.log("Error getting comment");
      return null;
    }
    return data;
  },
  create: async (user_id, post_id, comment_content, comment_tone) => {
    const { data, error } = await supabase
      .from("comments")
      .insert([{ user_id, post_id, comment_content, comment_tone }])
      .select();

    if (error) {
      console.log("Error creating comment");
      return null;
    }
    return data;
  },
  update: async (id, user_id, post_id, comment_content, comment_tone) => {
    const res = await db.query(
      `UPDATE comments 
        SET user_id = $1,  post_id = $2, comment_content = $3,  comment_tone = $4 WHERE id = $5 
        RETURNING *`,
      [user_id, post_id, comment_content, comment_tone, id]
    );

    const { data, error } = await supabase
      .from("comments")
      .update({
        user_id: user_id,
        post_id: post_id,
        comment_content: comment_content,
        comment_tone: comment_tone,
      })
      .eq(id);

    if (error) {
      console.log("Error updating comment");
      return null;
    }
    return data;
  },

  delete: async (id) => {
    const { data, error } = supabase.from("posts").delete().eq("id", id);
    if (error) {
      console.log("Error deleting comment", id);
      return null;
    }

    return data;
  },
};

export default commentModel;
