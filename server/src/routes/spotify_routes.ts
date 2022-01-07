/** @format */

import express, {Request, Response} from 'express';
import * as spotify from '../controller/spotify';
const router = express.Router();

router.post('/next', async (req: Request, res: Response) => {
	return res.send(spotify.next(req.params.access_token));
});
router.post('/play', async (req: Request, res: Response) => {
	return res.send(spotify.play(req.params.access_token));
});
router.post('/pause', async (req: Request, res: Response) => {
	return res.send(spotify.pause(req.params.access_token));
});
router.post('/previous', async (req: Request, res: Response) => {
	return res.send(spotify.previous(req.params.access_token));
});
router.get('/getAllPlaylistsOfUser', async (req: Request, res: Response) => {
	return res.send(spotify.getAllPlaylistsOfUser(req.params.access_token));
});
router.get('/getOnePlaylistOfUser', async (req: Request, res: Response) => {
	const id = req.query.playlist_id;
	if (typeof id !== 'string') return res.send({success: false, error: 'id is not a string'});
	return res.send(spotify.getOnePlaylistOfUser(req.params.access_token, id));
});
router.get('/getSongsOfAPlaylist', async (req: Request, res: Response) => {
	const id = req.query.playlist_id;
	if (typeof id !== 'string') return res.send({success: false, error: 'id is not a string'});
	return res.send(spotify.getSongsOfAPlaylist(req.params.access_token, id));
});
router.get('/search', async (req: Request, res: Response) => {
	const query = req.query.query;
	if (typeof query !== 'string') return res.send({success: false, error: 'id is not a string'});
	return res.send(spotify.search(req.params.access_token, query));
});
export default router;
