import { Request, Response } from "express";
import * as functions from 'firebase-functions';
import { validate, parse } from '@tma.js/init-data-node';

function setParsedData(res: Response, parsedData: any): void {
  const initData = {
    id: parsedData.userId,
    firstName: parsedData.user?.firstName || parsedData.first_name,
    lastName: parsedData.user?.lastName || parsedData.last_name,
    username: parsedData.user?.username || parsedData.username,
    languageCode: parsedData.user?.languageCode || parsedData.language_code,
    // Add any other properties as needed from parsedData
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
          setParsedData(response, parsedData);
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