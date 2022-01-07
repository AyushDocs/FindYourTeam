/** @format */

import {BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import User from './User';
@Entity('meet')
export default class Meet extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;
	@Column()
	date: Date;

	@ManyToMany(() => User, user => user.meets)
	people: User[];
}
