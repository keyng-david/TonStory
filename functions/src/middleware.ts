import { Request, Response } from "express";
import * as functions from 'firebase-functions';
import { validate, parse } from '@tma.js/init-data-node';
import type { InitData } from '@tma.js/sdk';

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

    if (request.url === '/telegram-bot-update') {
      return next();
    }

    const [authType, authData = ''] = (request.header('authorization') || '').split(' ');

    switch (authType) {
      case 'tma':
        try {
          validate(authData, functions.config().tgbot.key, {
            expiresIn: 3600,
          });

          // Parse the auth data
          const parsedInitData = parse(authData);

          // If canSendAfter is a number, convert it to a Date
          const canSendAfterDate = parsedInitData.canSendAfter 
            ? new Date(parsedInitData.canSendAfter) 
            : undefined;

          // Set the init data
          setInitData(response, {
            ...parsedInitData,  // Spread parsedInitData fields
            canSendAfterDate,  // Override canSendAfterDate with correctly typed value
          });

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