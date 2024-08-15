import { Request, Response } from "express";
import firestore from "../firestore.js";
import { TelegramBotUser, TelegramMiniAppUser, TonStoryUser } from "../types.js";

export const loadUserData = async (req, res) => {
  console.log("Updating points...");
  const { user } = res.locals.initData;

  try {
    const formattedUser = formatTonStoryUser(user);
    const userData = await getOrCreateTelegramUser(formattedUser);
    res.status(200).json({
      message: "User data loaded successfully",
      data: userData,
    });
  } catch (error) {
    console.error("There was an error loading user", error);
    res.status(500).send("There was an error loading user");
  }
};

/**
 * Retrieves or creates a Telegram user.
 * @param user - The user data.
 * @param referrer - The referrer ID.
 * @returns The user data.
 */
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

/**
 * Formats the TonStory user data.
 * @param user - The Telegram user data.
 * @returns The formatted TonStory user data.
 */
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

// Ensure there's a newline at the end of the file