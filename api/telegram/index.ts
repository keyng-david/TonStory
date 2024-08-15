import { Request, Response } from "express";
import { Telegraf } from 'telegraf';
import { getOrCreateTelegramUser, formatTonStoryUser } from "../users/index.js";
import firestore from "../firestore.js";

// Retrieve the bot token from Firebase config
const botToken = process.env.tgbot;

if (!botToken) {
  throw new Error("Bot token is missing");
}

const bot = new Telegraf(botToken);

const telegramBotUpdate = async (req: Request, res: Response) => {
  try {
    console.log("Handling Telegram bot update...");
    const update = req.body;
    const { message } = update;

    if (message && message.text) {
      const userId = message.from.id;
      const userRef = firestore.collection("users").doc(userId.toString());

      // Fetch user data outside the transaction
      const userDoc = await userRef.get();
      let userData = userDoc.data();

      // Create user if not exists
      if (!userData) {
        const formattedUser = formatTonStoryUser(message.from);
        userData = await getOrCreateTelegramUser(formattedUser);

        // Save new user data
        await userRef.set(userData);
      }

      // Check for the "/start" command
      if (message.text === "/start") {
        const gameUrl = "https://ton-story.vercel.app/";  // Replace with your actual frontend URL

        // Send a message with an inline button to start the game
        await bot.telegram.sendMessage(userId, `Welcome, ${userData.firstName}!\n\nClick the button below to start the game:`, {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Launch", url: gameUrl }]
            ]
          }
        });
      } else {
        // Send a generic response if the message is not "/start"
        await bot.telegram.sendMessage(userId, "Sorry, I didn't understand that.");
      }
    }

    res.status(200).send("Update handled");
  } catch (error) {
    console.error("There was an error handling Telegram bot update", error);
    res.status(500).send("There was an error handling Telegram bot update");
  }
};

export default telegramBotUpdate;