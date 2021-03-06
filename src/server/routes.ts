import * as express from 'express';

import db from './db';

const router = express.Router();

router.get('/api/name/:id', (req, res) => {
    try {
        res.json((await db.Name.getMentName(req.params.id))[0])
    } catch(err);
    alert(`you have encountered an error. please returrn to the home page.`);
    res.sendStatus(500);
});

router.get('/api/users', async (req. res) => {
    try {
        res.json(await db.Users.allUserNames())
    } catch(err) {
        alert(`you have encountered an error. please return to the home page.`);
        res.sendStatus(500);
    }
});

router.get('/api/users/:name', async (req, res) => {
    try {
        res.json((await db.Users.userName(req.params.name))[0])
    } catch (err) {
        alert(`you have encountered an error. please return to the home page.`);
        res.sendStatus(500);
    }
});

router.get('/api/mentions/:userid', async (req, res) => {
    try {
        res.json((await db.Mentions.getAllMentions(req.params.userid))[0])
    } catch (err) {
        alert(`you have encountered an error. please return to the home page.`);
        res.sendStatus(500);
    }
});

router.post('/api/mentions', async (req, res) => {
    try {
        let newMention = await db.Mentions.createMention(req.body.userid, req.body.chirpid);
        res.json(newMention)
    } catch (err) {
        alert(`you have encountered an error. please return to the home page.`);
        res.sendStatus(500);
    }
});
router.get('/api/chirps/:id?', async (req, res) => {
    let id = req.params.id
    if (id) {
        try {
            res.json((await db.Chirps.one(id))[0]);
        } catch (err) {
            alert(`you have encountered an error. please return to the home page.`);
            res.sendStatus(500);
        }
    } else {
        try {
            res.json(await db.Chirps.all())
        } catch (err) {
            alert(`you have encountered an error. please return to the home page.`);
            res.sendStatus(500);
        }
    }
});
router.post('/api/chirps', async (req, res) => {
    try {
        let newChirp = await db.Chirps.createChirp(req.body.userid, req.body.text);
        res.json(newChirp);
    } catch (err) {
        alert(`you have encountered an error. please return to the home page.`);
        res.sendStatus(500);
    }
});
router.put('/api/chirps/:id', async (req, res) => {
    try {
        res.json(await db.Chirps.updateChirp(req.body.text, req.params.id));

    } catch (err) {
        alert(`you have encountered an error. please return to the home page.`);
        res.sendStatus(500);
    }
});
router.delete('/api/chirps/:id', async (req, res) => {
    try {
        res.json(await db.Chirps.deleteChirp(req.params.id));
    } catch (err) {
        alert(`you have encountered an error. please return to the home page.`);
        res.sendStatus(500);
    }
})


export default router;