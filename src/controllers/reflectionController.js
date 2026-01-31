import reflectionsModel from "../models/reflectionsModel.js";

const reflectionController = {
  getReflections: async (req, res, next) => {
    try {
      const reflections = await reflectionsModel.getAll();
      console.log(reflections);
      return res.status(200).json(reflections);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getReflectionByVerse: async (req, res, next) => {
    // will need error handling
    try {
      const { reference } = req.body;
      const reflections = await reflectionsModel.getByVerse(reference);
      return res.status(200).json(reflections);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  createReflection: async (req, res, next) => {
    try {
      const { tone, content, word_count, reference_verse } = req.body;
      const newReflection = await reflectionsModel.upsert({
        content,
        tone,
        reference_verse,
        word_count,
        user_id: req.user.creator_uid,
        user_name: req.user.display_name,
      });
      return res.status(200).json(newReflection);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  delete: async (req, res, next) => {
    const id = req.params["id"];
    await reflectionsModel.delete(id);
    return res.status(200).json({ message: `Reflection ${id} deleted` });
  },
};

export default reflectionController;
