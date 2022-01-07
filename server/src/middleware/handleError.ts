/** @format */

import { NextFunction, Request, Response } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		next();
	} catch (error) {
		console.log(error.message);
		res.send({ success: false }).status(500);
	}
};
