import { Request, Response } from "express";
import * as functions from 'firebase-functions';
import { validate, parse } from '@tma.js/init-data-node';
import { InitData } from '@tma.js/sdk';

function setInitData(res: Response, parsedData: InitDataParsed): void {
  const initData: InitData = {
    initData: parsedData.initData || '',
    canSendAfter: parsedData.canSendAfter || new Date(),
    chat: parsedData.chat || '',
    chatType: parsedData.chatType || '',
    userId: parsedData.userId || '',
    user: parsedData.user || '',
    hash: parsedData.hash || '',
  };
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
          setInitData(response, parsedData);
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