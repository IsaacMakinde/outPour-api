import userModel from "../models/userModel.js";

const userController = {
  getUsers: async (req, res) => {
    const users = await userModel.getAll();
    return res.status(200).json(users);
  },

  getUserById: async (req, res, next) => {
    const user = await userModel.getById(req.params["id"]);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  },
};

export default userController;
