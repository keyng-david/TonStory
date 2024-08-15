const { Request, Response } = require("express");
const firestore = require("../firestore");


export const updatePoints = async (req: Request, res: Response) => {
  console.log("Updating points...");
  const { user } = res.locals.initData;

  try {
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
  const { user } = res.locals.initData;

  try {
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