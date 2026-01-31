import supabase from "../db/supabaseClient.js";

const eventGuestModel = {
  getAll: async () => {
    const { data, error } = await supabase.from("event_guests").select("*");

    if (error) {
      console.log("Error getting all event guests");
      return null;
    }

    return data;
  },

  getById: async (id) => {
    const { data, error } = await supabase
      .from("event_guests")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log("Error getting event guest", id);
      return null;
    }
    return data;
  },

  getByEventId: async (event_id) => {
    const { data, error } = await supabase
      .from("event_guests")
      .select("*")
      .eq("event_id", event_id);

    if (error) {
      console.log("Error getting event guests for event", event_id);
      return null;
    }
    return data;
  },

  addGuest: async (event_id, user_id, profile_img, status) => {
    const { data, error } = await supabase
      .from("event_guests")
      .insert([
        {
          event_id,
          user_id,
          profile_img,
          status,
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting event guest", error.message);
      return null;
    }

    return data[0];
  },

  updateGuest: async (id, event_id, user_id, profile_img, status) => {
    const { data, error } = await supabase
      .from("event_guests")
      .update({
        event_id,
        user_id,
        profile_img,
        status,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating event guest", error.message);
      return null;
    }

    return data;
  },

  delete: async (id) => {
    const { data, error } = await supabase
      .from("event_guests")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting event guest", error.message);
      return null;
    }

    return data;
  },
};

export default eventGuestModel;
