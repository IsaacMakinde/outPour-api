import eventModel from "../models/eventModel.js";

const eventController = {
  getEvents: async (req, res) => {
    try {
      const events = await eventModel.getAll();

      return res.status(200).json(events);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getEventById: async (req, res, next) => {
    try {
      const event = await eventModel.getById(req.params["id"]);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      return res.status(200).json(event);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  createEvent: async (req, res, next) => {
    try {
      const { title, date, place_id, description, pricing, category, venue } =
        req.body;
      const newEvent = await eventModel.create(
        title,
        date,
        place_id,
        description,
        pricing,
        category,
        venue,
        (creator_id = req.user.id)
      );
      return res.status(201).json(newEvent);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: `${err}` });
    }
  },

  update: async (req, res, next) => {
    const id = req.params(["id"]);
    const { title, date, place_id, description, pricing, category, venue } =
      req.body;
    try {
      const updatedEvent = await eventModel.update(
        id,
        title,
        date,
        place_id,
        description,
        pricing,
        category,
        venue,
        (creator_id = req.user.id)
      );
      if (!updatedEvent) {
        return res.status(404).json({ error: "Event not found" });
      }
      return res.json(updatedEvent);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  },

  delete: async (req, res, next) => {
    const id = await eventModel.delete(req.params["id"]);
    return res.status(200).json({ message: `Event ${id} deleted` });
  },

  getByCreatorId: async (req, res, next) => {
    const events = await eventModel.getByCreatorId(req.params["creator_id"]);
    if (!events) {
      return res.status(404);
    }
    return res.json(events);
  },
};

export default eventController;
