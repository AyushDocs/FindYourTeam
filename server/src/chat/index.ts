/** @format */

import { Server, Socket } from 'socket.io';
import Message from '../models/Message';
import { getRepository } from 'typeorm';
const events = {
	USER_CONNECTED: 'connection',
	NEW_USER_CONNECTED: 'new-user',
	SEND_MESSAGE: 'send-message',
	DISCONNECTED: 'disconnect',
};
const handleSocketConnection = async (io: Server,roomId:string) => {
	const messageRepository=getRepository(Message);

	io.on(events.USER_CONNECTED, (socket: Socket) => {
		socket.broadcast.emit(events.NEW_USER_CONNECTED)
		socket.join(roomId)
		socket.on(events.SEND_MESSAGE,async ({content}) => {
			await messageRepository.save({content,})
		});
	});
};

export default handleSocketConnection;
