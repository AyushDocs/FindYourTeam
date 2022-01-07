/** @format */

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { ConnectionOptions, createConnection } from 'typeorm';
import { AuthRouter } from './auth/AuthRoutes';
import handleSocketConnection from './chat';
import handleError from './middleware/handleError';
import logger from './middleware/logger';
import Meet from './models/Meet';
import Message from './models/Message';
import User from './models/User';
import spotifyRouter from './routes/spotify_routes'
import cookieParser from 'cookie-parser'
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const http = require('http').createServer(app);

export const io = require('socket.io')(http);
const main = async () => {
	console.log('trying to start server');
	const connectionConfig: ConnectionOptions = { database: 'dev', port: 5433, host: 'localhost', type: 'postgres', entities: [User, Meet, Message], synchronize: true, password: '123456', username: 'postgres' };
	try {
	    await createConnection(connectionConfig);
		console.log('successfully connected to db');
	} catch (error) {
		console.log('failed to connect to db \n');
		console.log(error);
		return;
	}
	try {
		app.get('/:roomId', async (req, res) => {
			const { roomId } = req.query;
			if (typeof roomId === 'string') await handleSocketConnection(io, roomId);
		});
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(bodyParser.json());
		app.use(cors({ credentials: true, origin: true }));
		app.use(logger)
		app.use(cookieParser());
		app.use(handleError)
		app.use('/api/auth',AuthRouter);
		app.use('/api/spotify',spotifyRouter)
		http.listen(port, () => console.log(`started server on port ${port}`));
	} catch (error) {
		console.log('error occured');
		console.error(error);
	}
};
main();
export default app;
