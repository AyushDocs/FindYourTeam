/** @format */

import express from 'express';
import {handleGithubOauth, handleSpotifyOauth, redirectToGithub, redirectToSpotify} from './Controller';
const router = express.Router();

router.get('/github', redirectToGithub);
router.get('/github/callback', handleGithubOauth);
router.get('/spotify', async (req, res) => {
    console.log('in here');
    
	return redirectToSpotify(req, res);
});
router.get('/spotify/callback', handleSpotifyOauth);

export {router as AuthRouter};
