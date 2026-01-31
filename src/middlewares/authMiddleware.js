// middlewares/authMiddleware.ts
import admin from "../services/firebase.js"; // your firebase-admin init
import userModel from "../models/userModel.js";
export const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const user = await userModel.upsertFromAuth({
      auth_provider: "firebase",
      display_name:
        decodedToken.name || decodedToken.email?.split("@")[0] || "Anonymous",
      email: decodedToken.email || null,
      avatar_url: decodedToken.picture || process.env.DEFAULT_AVATAR_URL,
      creator_uid: decodedToken.uid,
    });

    if (!user) {
      return res.status(500).json({ error: "User resolution failed" });
    }

    req.user = {
      id: user.id,
      display_name: user.display_name,
      email: user.email,
      avatar_url: user.avatar_url,
      creator_uid: user.creator_uid,
    }; // attach user info
    next(); // pass control to the controller
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ error: "Unauthorized" });
  }
};
