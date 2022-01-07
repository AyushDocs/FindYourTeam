/** @format */

import { NextFunction, Request, Response } from 'express';

export default async (req:Request, res:Response, next:NextFunction) => {
	console.log('request sent to url' + req.url);
	next();
};
