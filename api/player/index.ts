import { Request, Response } from "express";
import firestore from "../firestore.js";
import { verifyJWTToken } from "../auth.js";  // Import JWT utility

export const updatePoints = async (req: Request, res: Response) => {
  console.log("Updating points...");

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send("Authorization header missing");
    }

    const token = authHeader.split(' ')[1]; // Extract token
    const decoded = verifyJWTToken(token); // Verify token

    if (!decoded) {
      return res.status(401).send("Invalid token");
    }

    const { user } = decoded;  // Assuming `user` is part of the payload
    const docRef = firestore.collection("users").doc(user.id.toString());

    await firestore.runTransaction(async (transaction) => {
      const doc = await transaction.get(docRef);
      if (!doc.exists) throw new Error("Document does not exist");
      const data = doc.data();
      if (!data) throw new Error("No data found in document");

      const { level, weapon, points, stamina } = data;
      const dmg = level + weapon;
      transaction.update(docRef, {
        points: points + dmg,
        stamina: stamina - 1,
      });
    });

    res.status(200).send("Points updated");
  } catch (error) {
    console.error("There was an error updating points", error);
    res.status(500).send("There was an error updating points");
  }
};

export const updateLevel = async (req: Request, res: Response) => {
  console.log("Updating level...");

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send("Authorization header missing");
    }

    const token = authHeader.split(' ')[1]; // Extract token
    const decoded = verifyJWTToken(token); // Verify token

    if (!decoded) {
      return res.status(401).send("Invalid token");
    }

    const { user } = decoded;  // Assuming `user` is part of the payload
    const docRef = firestore.collection("users").doc(user.id.toString());

    await firestore.runTransaction(async (transaction) => {
      const doc = await transaction.get(docRef);
      if (!doc.exists) throw new Error("Document does not exist");
      const data = doc.data();
      if (!data) throw new Error("No data found in document");

      const { level, points } = data;
      const newLevel = level + 1;
      const newStamina = newLevel * 1000;
      const newLevelCosts = newLevel * 1000;

      if (points < newLevelCosts) {
        throw new Error("Insufficient points to level up");
      }

      transaction.update(docRef, {
        points: points - newLevelCosts,
        level: newLevel,
        stamina: newStamina,
      });
    });

    res.status(200).send("Level updated");
  } catch (error) {
    console.error("There was an error updating level", error);
    res.status(500).send("There was an error updating level");
  }
};