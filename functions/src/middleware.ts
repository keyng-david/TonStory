import { Request, Response } from "express";
import * as functions from 'firebase-functions';
import { validate, parse } from '@tma.js/init-data-node';
import { TonStoryUser, TelegramBotUser } from './types/index';

function setInitData(res: Response, initData: Partial<TonStoryUser | TelegramBotUser>): void {
  res.locals.initData = initData;
}

export const auth = async (request: Request, response: Response, next: any) => {
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
          const parsedData = parse(authData);
          
          // Type checking and property mapping
          let initData: Partial<TonStoryUser | TelegramBotUser> = {};

          if ('firstName' in parsedData) {
            // Assuming parsedData is TonStoryUser
            initData = {
              id: parsedData.id,
              firstName: parsedData.firstName,
              lastName: parsedData.lastName,
              username: parsedData.username,
              languageCode: parsedData.languageCode,
            };
          } else if ('first_name' in parsedData) {
            // Assuming parsedData is TelegramBotUser
            initData = {
              id: parsedData.id,
              firstName: parsedData.first_name,
              lastName: parsedData.last_name,
              username: parsedData.username,
              languageCode: parsedData.language_code,
            };
          }

          setInitData(response, initData);
          console.log('Successfully verified token');
          return next();
        } catch (e) {
          return next(e);
        }
      default:
        return next(new Error('Unauthorized'));
    }
  } catch {
    return response.status(401).json({
      error: new Error('Invalid request!'),
    });
  }
};