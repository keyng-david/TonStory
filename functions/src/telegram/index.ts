import { Request, Response } from "express";
import firestore from "../firestore";
import { bot } from "./bot";
import { getOrCreateTelegramUser } from "../users";
import { formatTonStoryUser } from "../users";

export const telegramBotUpdate = async (req: Request, res: Response) => {
  try {
    console.log("Handling Telegram bot update...");
    const update = req.body;
    const { message } = update;

    if (message && message.text) {
      const userId = message.from.id;
      const userRef = firestore.collection("users").doc(userId.toString());

      await firestore.runTransaction(async (transaction) => {
        const userDoc = await transaction.get(userRef);
        let userData;

        if (!userDoc.exists) {
          const formattedUser = formatTonStoryUser(message.from);
          userData = await getOrCreateTelegramUser(formattedUser);
        } else {
          userData = userDoc.data();
        }

        if (message.text === "/start") {
          await bot.sendMessage(userId, `Welcome, ${userData.firstName}!`);
        } else {
          await bot.sendMessage(userId, "Sorry, I didn't understand that.");
        }
      });
    }

    res.status(200).send("Update handled");
  } catch (error) {
    console.error("There was an error handling Telegram bot update", error);
    res.status(500).send("There was an error handling Telegram bot update");
  }
};