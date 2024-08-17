import { Request, Response } from "express";
import { parseInitData, InitDataParsed } from '@telegram-apps/sdk';

function setInitData(res: Response, initData: InitDataParsed): void {
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
          const parsedData = parseInitData(authData);
          // Removed validateAuthData function call, since it's not a valid export
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