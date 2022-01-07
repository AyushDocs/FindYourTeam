/** @format */

import axios from 'axios';
import {Request, Response} from 'express';
import {getSpotifyRedirectUrl} from '../controller/spotify';

export const redirectToGithub = async (req: Request, res: Response) => {
	const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
	res.redirect(`https://github.com/login/oauth/authorize?scope=user&client_id=${GITHUB_CLIENT_ID}&redirect_uri=http://localhost:3001/auth/github/callback`);
};
export const handleGithubOauth = async (req: Request, res: Response) => {
	const client_id = process.env.GITHUB_CLIENT_ID;
	const client_secret = process.env.GITHUB_CLIENT_SECRET;

	const getAccessToken = async (_code: any) => {
		if (typeof _code !== 'string') return;
		const response = await axios.post(`https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${_code}`);
		return response.data;
	};
	const getCode = async (access_token_value: string | null) => {
		const data = await axios.get(`https://api.github.com/user`, {headers: {Authorization: `token ${access_token_value}`}});
		return data.data;
	};
	const githubCode = req.query.code;
	if (!githubCode) res.json({success: false});
	const paramsString = await getAccessToken(githubCode);
	let params = new URLSearchParams(paramsString);
	const access_token = params.get('access_token');
	const code = await getCode(access_token);
	res.redirect(`http://localhost:3000/?access_token=${access_token}`);
	res.end();
};

export const redirectToSpotify = async (req: Request, res: Response) => {
	console.log("am here"+getSpotifyRedirectUrl());
	
	return res.redirect(getSpotifyRedirectUrl());
};

export const handleSpotifyOauth = async (req: Request, res: Response) => {
	const code = req.query.code;
	const client_id = process.env.SPOTIFY_CLIENT_ID;
	const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
	const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
	if (typeof code !== 'string' || client_id === undefined || client_secret == undefined) return;
	let body = 'grant_type=authorization_code';
	body += '&code=' + code;
	body += '&redirect_uri=' + redirect_uri;
	body += '&client_id=' + client_id;
	body += '&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private';
	const options = {headers: {'Content-Type': 'application/x-www-form-urlencoded', Authorization: `Basic ${btoa(client_id + ':' + client_secret)}`}};
	const response = await axios.post('https://accounts.spotify.com/api/token', body, options);
	if (response.status === 401) refreshSpotifyToken();
	if (response.status !== 200 && response.status !== 401) console.log(response.statusText);
	const access_token = response.data.access_token;
	res.cookie('access_token', access_token);
	res.redirect(`http://localhost:3000/spotify?access_token=${access_token}`);
	res.end();
};
const refreshSpotifyToken = () => {
	console.log('refresh');
};
