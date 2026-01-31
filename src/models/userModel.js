import supabase from "../db/supabaseClient.js";

const userModel = {
  getAll: async () => {
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
      console.log("Error getting all users");
      return null;
    }

    return data;
  },

  getById: async (id) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log("Error getting user", id);
      return null;
    }
    return data;
  },

  upsertFromAuth: async ({
    auth_provider,
    display_name,
    email,
    avatar_url,
    creator_uid,
  }) => {
    const { data, error } = await supabase
      .from("users")
      .upsert(
        {
          auth_provider,
          display_name,
          email,
          avatar_url,
          creator_uid,
        },
        {
          onConflict: "auth_provider,creator_uid",
        }
      )
      .select()
      .single();

    if (error) {
      console.error("Error upserting user", error.message);
      return null;
    }

    return data;
  },
};

export default userModel;
