import { getAllPosts, getPostById, createPost } from "../models/postModel.js";

export async function getPosts(req, res) {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}

export async function getSinglePost(req, res) {
  try {
    const post = await getPostById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
}

export async function addPost(req, res) {
  try {
    const { userID, postContent, postTone } = req.body;
    const newPost = await createPost({ userID, postContent, postTone });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
}
