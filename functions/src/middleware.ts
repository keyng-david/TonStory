import { Request, Response } from "express";
import * as functions from 'firebase-functions';
import { validate, parse, type InitData, type InitDataParsed } from '@tma.js/init-data-node';

/**
 * Sets the init data in the response locals.
 * @param res - The response object.
 * @param initData - The init data to set.
 */
function setInitData(res: Response, initData: InitData): void {
  res.locals.initData = initData;
}

/**
 * Middleware to authenticate requests based on the Telegram init data.
 * @param request - The incoming request object.
 * @param response - The outgoing response object.
 * @param next - The next middleware function.
 */
export const auth = async (request: Request, response: Response, next: Function) => {
  try {
    console.log("Request to: ", request.url);
    console.log('Running auth middleware');

    // Bypass the middleware for Telegram bot updates
    if (request.url === '/telegram-bot-update') {
      return next();
    }

    // Extract the authorization header
    const [authType, authData = ''] = (request.header('authorization') || '').split(' ');

    switch (authType) {
      case 'tma':
        try {
          // Validate the init data using the Telegram bot key from Firebase functions config
          validate(authData, functions.config().tgbot.key, {
            expiresIn: 3600, // Token expiration time in seconds
          });

          // Parse the init data and cast it to InitData type
          const parsedInitData: InitDataParsed = parse(authData);
          const initData: InitData = {
            initData: parsedInitData.initData,
            canSendAfter: parsedInitData.canSendAfter,
            authDate: parsedInitData.authDate,
            hash: parsedInitData.hash,
            ...parsedInitData, // Include other properties from InitDataParsed
          };

          // Set the init data in the response locals for further use
          setInitData(response, initData);
          console.log('Successfully verified token');
          return next();
        } catch (e) {
          return next(e);
        }
      default:
        return next(new Error('Unauthorized'));
    }
  } catch (error) {
    return response.status(401).json({
      error: new Error('Invalid request!'),
    });
  }
};