import supabase from "../db/supabaseClient.js";

const reflectionsModel = {
  getAll: async () => {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );
    const { data, error } = await supabase
      .from("reflections")
      .select("*")
      .gte("created_at", startOfDay.toISOString())
      .lt("created_at", endOfDay.toISOString())
      .order("updated_at", { ascending: false });

    if (error) {
      throw new Error(`Failed to get reflections ${error.message}`);
    }

    return data;
  },

  getByVerse: async (verse) => {
    const { data, error } = await supabase
      .from("reflections")
      .select("*")
      .eq("reference_verse", verse)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Failed to get reflections: ${error.message}`);
    }

    return data;
  },

  upsert: async (
    user_id,
    user_name,
    content,
    tone,
    reference_verse,
    word_count
  ) => {
    const { data, error } = await supabase
      .from("reflections")
      .upsert(
        {
          user_id: user_id,
          user_name: user_name,
          content: content,
          tone: tone,
          word_count: word_count,
          reference_verse: reference_verse,
          entry_date: new Date().toISOString().split("T")[0], //Today
          updated_at: new Date(),
        },
        { onConflict: ["user_id", "entry_date"] }
      )
      .select()
      .order("updated_at", { ascending: false })
      .single();

    if (error) {
      throw new Error(`Database upsert failed : ${error.message}`);
    }

    return data;
  },

  delete: async (id) => {
    const { data, error } = await supabase
      .from("reflections")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(`Database delete failed : ${error.message}`);
    }
    return data;
  },
};

export default reflectionsModel;
