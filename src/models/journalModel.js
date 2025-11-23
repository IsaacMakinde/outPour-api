import supabase from "../db/supabaseClient.js";

const journalModel = {
  getAll: async () => {
    const { data, error } = await supabase.from("journals").select("*");

    if (error) {
      console.log("Error getting all journals", error.message);
      return null;
    }

    return data;
  },

  getById: async (id) => {
    const { data, error } = await supabase
      .from("journals")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log("Error getting journal");
      return null;
    }
    return data;
  },

  getByUser: async (user_id) => {
    const { data, error } = await supabase
      .from("journals")
      .select("*")
      .eq("user_id", user_id);

    if (error) {
      console.log("Error getting by user", error.message);
    }

    return data;
  },

  create: async (user_id, content, tone, is_private, word_count) => {
    const { data, error } = await supabase
      .from("journals")
      .insert([{ user_id, content, tone, is_private, word_count }])
      .select();

    if (error) {
      console.log("Error inserting post", error.message);
    }

    return data[0];
  },

  update: async (id, user_id, content, tone, is_private, word_count) => {
    const { data, error } = await supabase
      .from("journals")
      .update({
        id,
        user_id: user_id,
        content: content,
        tone: tone,
        is_private,
        word_count,
        updated_at: new Date(),
      })
      .eq("id", id)
      .select();

    if (error) {
      console.log("Error updating journals", id);
      return null;
    }

    return data;
  },

  upsert: async (user_id, content, tone, is_private, word_count) => {
    const { data, error } = await supabase
      .from("journals")
      .upsert(
        {
          user_id,
          content,
          tone,
          is_private,
          word_count,
          entry_date: new Date().toISOString().split("T")[0], // today's date
          updated_at: new Date(),
        },
        { onConflict: ["user_id", "entry_date"] } // important
      )
      .select();

    if (error) {
      console.log("Error upserting journal", error.message);
      return null;
    }

    return data?.[0];
  },

  delete: async (id) => {
    const { data, error } = supabase.from("jorunal").delete.eq("id", id);

    if (error) {
      console.log("Error deleting journal", id);
      return null;
    }

    return data;
  },
};

export default journalModel;
