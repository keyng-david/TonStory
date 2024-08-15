const { Request, Response } = require("express");
const { Telegraf } = require('telegraf');
const { getOrCreateTelegramUser, formatTonStoryUser } = require("../users");
const firestore = require("../firestore");

// Retrieve the bot token from Firebase config
const botToken = process.env.tgbot;

if (!botToken) {
  throw new Error("Bot token is missing");
}

const bot = new Telegraf(botToken);

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

        if (userData) {
          if (message.text === "/start") {
            await bot.telegram.sendMessage(userId, `Welcome, ${userData.firstName}!`);
          } else {
            await bot.telegram.sendMessage(userId, "Sorry, I didn't understand that.");
          }
        } else {
          console.error("User data is undefined");
        }
      });
    }

    res.status(200).send("Update handled");
  } catch (error) {
    console.error("There was an error handling Telegram bot update", error);
    res.status(500).send("There was an error handling Telegram bot update");
  }
};

// Ensure there's a newline at the end of the file