/** @format */

import { NextFunction, Request, Response } from 'express';

var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodb$oy';

const fetchuser = (req: Request, res: Response, next:NextFunction) => {
	const token = req;
	if (!token) {
		res.status(401).send({ error: 'Please authenticate using a valid token' });
	}
	try {
		const data = jwt.verify(token, JWT_SECRET);
		req.body = data;
		next();
	} catch (error) {
		res.status(401).send({ error: 'Please authenticate using a valid token' });
	}
};

export default fetchuser;
