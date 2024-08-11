import { Request, Response } from "express";
import * as functions from 'firebase-functions';
import { validate, parse } from '@tma.js/init-data-node';
import { InitData } from '@tma.js/sdk';
import { TonStoryUser, TelegramBotUser } from './types/index';

function mapUserToInitData(user: TonStoryUser | TelegramBotUser): Partial<InitData> {
  return {
    // map fields from your user interfaces to InitData structure
    authDate: new Date(),
    hash: 'someHash',
    queryId: undefined,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      languageCode: user.languageCode,
    },
  };
}

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

          const parsedInitData = parse(authData);

          const initData: Partial<InitData> = {
            ...mapUserToInitData(parsedInitData.user as any),
            canSendAfterDate: parsedInitData.canSendAfter ? new Date(parsedInitData.canSendAfter * 1000) : undefined,
          };

          setInitData(response, initData as InitData);
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