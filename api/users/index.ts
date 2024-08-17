import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import firestore from "../firestore.js";
import { TelegramBotUser, TelegramMiniAppUser, TonStoryUser } from "../types/index.js";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT secret is missing");
}

export const loadUserData = async (req: Request, res: Response) => {
  console.log("Loading user data...");

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Authorization token missing");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as { id: string };
    const userRef = firestore.collection("users").doc(decoded.id);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).send("User not found");
    }

    const userData = userDoc.data();
    res.status(200).json({
      message: "User data loaded successfully",
      data: userData,
    });
  } catch (error) {
    console.error("There was an error loading user data", error);
    res.status(500).send("There was an error loading user data");
  }
};