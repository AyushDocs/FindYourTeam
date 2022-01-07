/** @format */

import creator, {Axios, AxiosResponse} from 'axios';

/** @format */
const axios = creator.create({baseURL: 'https://accounts.spotify.com/v1'});

export const getSpotifyRedirectUrl = () => {
	const client_id = process.env.SPOTIFY_CLIENT_ID;
	const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
	if (client_id === undefined || redirect_uri === undefined) return '';
	const state = 'vtiyf6btyvjjjjjjjjjjjjjjjjjjjjjjbn8yug';
	const scope = 'user-read-playback-state user-top-read user-modify-playback-state user-read-recently-played user-read-currently-playing user-read-private user-read-email playlist-read-private playlist-read-collaborative user-top-read user-read-recently-played';
	return `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${scope}&redirect_uri=${encodeURI(redirect_uri)}&state=${state}`;
};

export const next = async (access_token: string) => {
	try {
		const url = '/me/player/next';
		await axios.post(url, {}, {headers: {Authorization: `Bearer ${access_token}`}});
		return {success: true};
	} catch (error) {
		return {success: false};
	}
};
export const play = async (access_token: string) => {
	try {
		const url = '/me/player/play';
		await axios.post(url, {}, {headers: {Authorization: `Bearer ${access_token}`}});
		return {success: true};
	} catch (error) {
		return {success: false};
	}
};
export const pause = async (access_token: string) => {
	try {
		const url = '/me/player/pause';
		await axios.put(url, {}, {headers: {Authorization: `Bearer ${access_token}`}});
		return {success: true};
	} catch (error) {
		return {success: false};
	}
};
export const previous = async (access_token: string) => {
	try {
		const url = '/me/player/previous';
		await axios.post(url, {}, {headers: {Authorization: `Bearer ${access_token}`}});
		return {success: true};
	} catch (error) {
		return {success: false};
	}
};
export const getAllPlaylistsOfUser = async (access_token: string) => {
	try {
		//https://api.spotify.com/v1/me/playlists
		// const url = '/me/playlists';
		const url = 'https://api.spotify.com/v1/me/playlists';
		const res: AxiosResponse<{href: string; items: any[]; limit: number; next: string; offset: number; previous: string; total: number}> = await creator.get(url, {headers: {Authorization: `Bearer ${access_token}`}});
		return {success: true, data: res.data};
	} catch (error) {
		// console.log(error);
		
		return {success: false, data: undefined};
	}
};
export const getOnePlaylistOfUser = async (access_token: string, playlist_id: string) => {
	try {
		const url = `/playlists/${playlist_id}`;
		const res = await axios.get(url, {headers: {Authorization: `Bearer ${access_token}`}});
		return {success: false, data: res.data};
	} catch (error) {
		return {success: false, data: undefined};
	}
};
export const getSongsOfAPlaylist = async (access_token: string, playlist_id: string) => {
	try {
		const url = `/playlists/${playlist_id}/tracks`;
		const res = await axios.get(url, {headers: {Authorization: `Bearer ${access_token}`}});
		return {data: res.data, success: true};
	} catch (error) {
		return {success: false, data: undefined};
	}
};
export const search = async (access_token: string, query: string) => {
	//'album',
	class Item {
		href: string;
		items: any[];
		limit: number;
		next: string;
		offset: number;
		previous: string;
		total: number;
	}
	try {
		const url = `/me/playlists?=${query}&type=playlist,track`;
		const res: AxiosResponse<{playlists: Item; tracks: Item}> = await axios.get(url, {headers: {Authorization: `Bearer ${access_token}`}});
		return {success: true, data: res.data};
	} catch (error) {
		return {success: false, data: undefined};
	}
};
