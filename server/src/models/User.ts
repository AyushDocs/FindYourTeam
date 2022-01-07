/** @format */

import { BaseEntity, Column, Entity } from 'typeorm';
import Meet from './Meet';
export enum DeveloperTypes {
	ML = 'ML',
	AI = 'AI',
	BASIC_WEB_DEVELOP = 'WEB',
	NEXT_JS_WEB_DEVELOPER = 'NEXT_JS_WEB_DEVELOPER',
	REACT_WEB_DEVELOPER = 'REACT_WEB_DEVELOPER',
	CROSS_PLATFORM_APP = 'CROSS_PLATFORM_APP',
	ANDROID_APP_DEVELOPER = 'ANDROID_APP_DEVELOPER',
	IOS_APP_DEVELPOER = 'IOS_APP_DEVELPOER',
	OTHER = 'OTHER',
}
@Entity('usr_tbl')
export default class User extends BaseEntity {
	@Column({ unique: true, primary: true })
	email: string;

	@Column({ unique: true })
	name: string;

	@Column({ enum: DeveloperTypes, type: 'simple-array' })
	developerType: string[];

	@Column({ type: 'simple-array' })
	languagesSpoken: string[];
	meets: Meet[];
}
