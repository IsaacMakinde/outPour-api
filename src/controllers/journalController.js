import journalModel from "../models/journalModel.js";

const journalController = {
  getJournals: async (req, res, next) => {
    const journals = await journalModel.getAll();
    return res.status(200).json(journals);
  },
  // :id
  getJournalById: async (req, res, next) => {
    const id = req.params["id"];
    const journal = await journalModel.getById(id);
    return res.status(200).json(journal);
  },

  // user/:id
  getJournalsByUser: async (req, res, next) => {
    const id = req.params["id"];
    const journals = await journalModel.getByUser(id);
    return res.status(200).json(journals);
  },

  createPost: async (req, res, next) => {
    try {
      const { user_id, content, tone, is_private, word_count } = req.body;
      const newJournal = await journalModel.create(
        user_id,
        content,
        tone,
        is_private,
        word_count
      );
      return res.status(201).json(newJournal);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: `${err}` });
    }
  },
  // :id
  updateJournal: async (req, res, next) => {
    const id = req.params(["id"]);
    const { user_id, content, tone, is_private, word_count } = req.body;
    try {
      const updatedJournal = await journalModel.update(
        id,
        user_id,
        content,
        tone,
        is_private,
        word_count
      );

      return res.json(updatedJournal);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  },
  // user/:id
  upsertJournal: async (req, res) => {
    const { user_id, content, tone, is_private, word_count } = req.body;

    try {
      const updatedEntry = await journalModel.upsert(
        user_id,
        content,
        tone,
        is_private,
        word_count
      );

      return res.status(200).json(updatedEntry);
    } catch (err) {
      console.error("Error upserting journal:", err);
      return res.status(500).json({ error: "Failed to upsert journal entry" });
    }
  },

  // :id
  deleteJournal: async (req, res, next) => {
    const id = req.params["id"];
    await journalModel.delete(id);
    return res.status(200).json({ message: `Journal ${id} deleted` });
  },
};

export default journalController;
