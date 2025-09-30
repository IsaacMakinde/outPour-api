import postModel from "../models/postModel.js";

const postController = {
  getPosts: async (req, res) => {
    const posts = await postModel.getAll();
    return res.status(200).json(posts);
  },
  getPostById: async (req, res, next) => {
    const post = await postModel.getById(req.params["id"]);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.json(post);
  },

  createPost: async (req, res, next) => {
    try {
      const { user_id, post_content, post_tone } = req.body;
      const newPost = await postModel.create(user_id, post_content, post_tone);
      return res.status(201).json(newPost);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: `${err}` });
    }
  },

  updatePost: async (req, res, next) => {
    const id = req.params(["id"]);
    const { user_id, post_content, post_tone } = req.body;
    try {
      const updatedPost = await postModel.update(
        user_id,
        post_content,
        post_tone,
        id
      );
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      return res.json(updatedPost);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  },

  delete: async (req, res, next) => {
    await postModel.delete(req.params["id"]);
    return res.status(200).json({ message: `Post ${id} deleted` });
  },
};

export default postController;
