import eventGuestModel from "../models/eventGuestModel.js";

const eventGuestController = {
  getAllGuests: async (req, res) => {
    const guests = await eventGuestModel.getAll();
    return res.status(200).json(guests);
  },
  getGuestById: async (req, res, next) => {
    const guest = await eventGuestModel.getById(req.params["id"]);
    if (!guest) {
      return res.status(404).json({ error: "Event Guest not found" });
    }
    return res.json(guest);
  },
  getGuestsByEventId: async (req, res, next) => {
    const guests = await eventGuestModel.getByEventId(req.params["event_id"]);
    if (!guests) {
      return res.status(404).json({ error: "No guests found for this event" });
    }
    return res.json(guests);
  },
  addGuest: async (req, res, next) => {
    try {
      const { event_id, user_id, profile_img, status } = req.body;
      const newGuest = await eventGuestModel.addGuest(
        event_id,
        user_id,
        profile_img,
        status
      );
      return res.status(201).json(newGuest);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: `${err}` });
    }
  },

  updateGuest: async (req, res, next) => {
    const id = req.params(["id"]);
    const { event_id, user_id, profile_img, status } = req.body;
    try {
      const updatedGuest = await eventGuestModel.update(
        event_id,
        user_id,
        profile_img,
        status,
        id
      );
      if (!updatedGuest) {
        return res.status(404).json({ error: "Event Guest not found" });
      }
      return res.json(updatedGuest);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  },

  deleteGuest: async (req, res, next) => {
    const id = req.params["id"];
    await eventGuestModel.delete(id);
    return res.status(200).json({ message: `Event Guest ${id} deleted` });
  },
};

export default eventGuestController;
