import supabase from "../db/supabaseClient.js";

const postModel = {
  getAll: async () => {
    const { data, error } = await supabase.from("posts").select("*");

    if (error) {
      console.log("Error getting all posts");
      return null;
    }

    return data;
  },

  getById: async (id) => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log("Error getting post", id);
      return null;
    }
    return data;
  },

  create: async (user_id, post_content, post_tone) => {
    const { data, error } = await supabase
      .from("posts")
      .insert([{ user_id, post_content, post_tone }])
      .select();

    if (error) {
      console.error("Error inserting post", error.message);
      return null;
    }

    return data[0];
  },

  update: async (id, user_id, post_content, post_tone) => {
    const { data, error } = await supabase
      .from("posts")
      .update({
        user_id: user_id,
        post_content: post_content,
        post_tone: post_tone,
      })
      .eq("id", id)
      .select();

    if (error) {
      console.log("Error updating post", id);
      return null;
    }
    return data;
  },

  delete: async (id) => {
    const { data, error } = supabase.from(`posts`).delete().eq("id", id);

    if (error) {
      console.log("Error deleting post", id);
      return null;
    }
    return data;
  },
};

export default postModel;
