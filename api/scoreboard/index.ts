import { Request, Response } from "express";
import firestore from "../firestore.js";
import { verifyJWTToken } from '../auth.js';

export const getScoreboard = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).send("Unauthorized");

    verifyJWTToken(token);

    const usersRef = firestore.collection("users");
    const snapshot = await usersRef.orderBy("points", "desc").limit(10).get();

    const scoreboard = snapshot.docs.map((doc) => doc.data());

    res.status(200).json({
      message: "Scoreboard retrieved successfully",
      data: scoreboard,
    });
  } catch (error) {
    console.error("There was an error retrieving the scoreboard", error);
    res.status(500).send("There was an error retrieving the scoreboard");
  }
};