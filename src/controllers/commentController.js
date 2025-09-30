import commentModel from "../models/commentModel.js";

const commentController = {
  getComments: async (req, res, next) => {
    const comments = await commentModel.getAll();
    return res.status(200).json(comments);
  },
  getCommentById: async (req, res) => {
    const comment = await commentModel.getById(req.params["id"]);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    return res.json(comment);
  },
  createComment: async (req, res, next) => {
    try {
      const { user_id, post_id, comment_content, comment_tone } = req.body;
      const newComment = await commentModel.create(
        user_id,
        post_id,
        comment_content,
        comment_tone
      );
      return res.status(201).json(newComment);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: `${err}` });
    }
  },

  updateComment: async (req, res, next) => {
    const id = req.params["id"];
    const { user_id, post_id, comment_content, comment_tone } = req.body;
    try {
      const updatedPost = await commentModel.update(
        user_id,
        post_id,
        comment_content,
        comment_tone
      );
      return res.status(200).json(updatedPost);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err });
    }
  },

  deleteComment: async (req, res) => {
    await commentModel.delete(req.params["id"]);
    return res.status(200).json({ message: `Comment ${id} deleted` });
  },
};

export default commentController;
