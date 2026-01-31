import supabase from "../db/supabaseClient.js";

const eventModel = {
  getAll: async () => {
    const { data, error } = await supabase.from("event").select("*");

    if (error) {
      console.log("Error getting all events");
      throw error;
    }

    return data;
  },
  getById: async (id) => {
    const { data, error } = await supabase
      .from("event")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log("Error getting event", id);
      throw error;
    }
    return data;
  },
  create: async (
    title,
    date,
    place_id,
    description,
    pricing,
    category,
    venue,
    creator_id
  ) => {
    const { data, error } = await supabase
      .from("event")
      .insert([
        {
          title,
          date,
          place_id,
          description,
          pricing,
          category,
          venue,
          creator_id,
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting event", error.message);
      throw error;
    }

    return data[0];
  },

  update: async (
    id,
    title,
    date,
    place_id,
    description,
    pricing,
    category,
    venue
  ) => {
    const { data, error } = await supabase
      .from("event")
      .update({
        title,
        date,
        place_id,
        description,
        pricing,
        category,
        venue,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating event", error.message);
      throw error;
    }

    return data;
  },

  delete: async (id) => {
    const { data, error } = await supabase
      .from("event")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error deleting event", error.message);
      throw error;
    }

    return data[0];
  },

  getByCreatorId: async (creator_id) => {
    const { data, error } = await supabase
      .from("event")
      .select("*")
      .eq("creator_id", creator_id);

    if (error) {
      console.log("Error getting events by creator", creator_id);
      throw error;
    }
    return data;
  },
};

export default eventModel;
