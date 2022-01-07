/** @format */

import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Meet from './Meet';
import User from './User';
@Entity('message')
export default class Message extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	content: string;

	@Column()
	date: Date;

	@ManyToOne(() => User, user => user.meets)
	user: User;
    @ManyToOne(()=>Meet)
    @JoinColumn()
    meet:Meet
}
