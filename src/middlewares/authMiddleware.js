// middlewares/authMiddleware.ts
import admin from "../services/firebase.js"; // your firebase-admin init

export const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // attach user info
    next(); // pass control to the controller
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ error: "Unauthorized" });
  }
};
