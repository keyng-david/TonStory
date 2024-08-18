import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import firestore from "../firestore.js";
import { TelegramBotUser, TelegramMiniAppUser, TonStoryUser } from "../types/index.js";

const jwtSecret = process.env.JWT_SECRET || 'your_secret_key';

if (!jwtSecret) {
  throw new Error("JWT secret is missing");
}

// Load user data using JWT
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

// Retrieve or create a Telegram user
export async function getOrCreateTelegramUser(
  user: TonStoryUser,
  referrer?: string
) {
  const docRef = firestore.collection("users").doc(user.id.toString());
  return await firestore.runTransaction(async (transaction) => {
    const doc = await transaction.get(docRef);
    if (!doc.exists) {
      // Update referrer points
      if (referrer) {
        const referrerDocRef = firestore.collection("users").doc(referrer);
        const referrerDoc = await transaction.get(referrerDocRef);
        if (referrerDoc.exists) {
          transaction.set(
            referrerDocRef.collection("referrals").doc(user.id.toString()),
            {
              userId: user.id,
              createdAt: new Date(),
            }
          );
          const referrerData = referrerDoc.data();
          if (referrerData) {
            transaction.update(referrerDocRef, {
              referrals: referrerData.referrals + 1,
            });
          } else {
            throw new Error("Referrer data is undefined");
          }
        }
      }

      transaction.set(docRef, user);
      return user;
    } else {
      return doc.data();
    }
  });
}

// Format the Telegram user data into the TonStory user format
export function formatTonStoryUser(
  user: TelegramMiniAppUser | TelegramBotUser
): TonStoryUser {
  // Determine if the user is a TelegramMiniAppUser
  const isMiniAppUser = (
    user: any // Replace 'any' with a more specific type if possible
  ): user is TelegramMiniAppUser => "allowsWriteToPm" in user;

  return {
    id: user.id,
    username: user.username,
    firstName: "firstName" in user ? user.firstName : user.first_name,
    lastName: "lastName" in user ? user.lastName : user.last_name,
    languageCode:
      "languageCode" in user ? user.languageCode : user.language_code,
    allowsWriteToPm: isMiniAppUser(user) ? user.allowsWriteToPm : false, // Default to false if not provided
    level: 1,
    stamina: 100,
    points: 0,
    weapon: 0,
    referrals: 0,
    referralURL: `https://t.me/TonStoryBot?start=user_${user.id}`,
    createdAt: new Date(),
  };
}