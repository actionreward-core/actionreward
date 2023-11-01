import express from 'express'
import cors from 'cors';
import { faker } from '@faker-js/faker';
import { getBearerTokenFromReq } from './utils/getBearerTokenFromReq.js';
import { ActionReward } from './sdk/index.js';

process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});


// Step 1 - Creating the ActionReward SDK instance
const actionReward = ActionReward({
  token: process.env.PROJECT_TOKEN,
});

const app = express()
app.use(cors());


const userTokens = new Map();

const fakePlayerMatchStats = (nickname) => {
  const kills = faker.number.int({
    min: 0,
    max: 20,
  });
  const deaths = faker.number.int({
    min: 0,
    max: 20,
  });
  const kd = Number(kills/(deaths || 1).toFixed(1));
  const score = kills * 100;
  return {
    nickname: nickname ?? faker.internet.userName(),
    kills,
    deaths,
    kd,
    score,
  };
}

app.use((req, res, next) => {
  const token = getBearerTokenFromReq(req);
  if (!token) {
    req.me = null;
  }
  req.me = userTokens.get(token) ?? null;
  next();
});


app.post('/api/signin', (req, res) => {
  const user = {
    id: faker.string.uuid(),
    nickname: faker.internet.userName(),
    avatar: faker.image.avatar(),
  };
  
  const token = faker.string.uuid();
  
  userTokens.set(token, user);
  res.send({
    token,
  });
});

app.get('/api/me', async (req, res) => {
  if (!req.me) {
    res.status(401).send({ error: 'Not logged' });
    return;
  }
  const me = { ...req.me };
  try {
    // Step 2 - Checking if the logged user on game already is connected with ActionRewards
    const { did } = await actionReward.getUser(me.id);
    me.did = did;
  } catch (error) {
    console.log('User does not have did yet');
  }
  if (!me.did) {
    // Step 3 - When user is not connected yet, we generate a connect QR Code
    const authRequest = await actionReward.connectAuthRequest({ userId: req.me.id });
    me.qrcodeBase64 = authRequest.qrcodeBase64;
  }
  res.send(me);
});


app.post('/api/play-match', async (req, res) => {
  const meStats = fakePlayerMatchStats(req.me.nickname);
  const teamA = [
    meStats,
    fakePlayerMatchStats(),
    fakePlayerMatchStats(),
  ].sort((a, b) => b.score - a.score);
  const teamB = [
    fakePlayerMatchStats(),
    fakePlayerMatchStats(),
    fakePlayerMatchStats(),
  ].sort((a, b) => b.score - a.score);
  const victory = teamA[0].score > teamB[0].score;

  // Step 4 - Every end of a match, we send an action to ActionRewards
  const action = await actionReward.sendAction({
    userId: req.me.id,
    actionKey: 'match-scoreboard',
    properties: {
      kills: meStats.kills,
      deaths: meStats.deaths,
      kd: meStats.kd,
      stage: 'dust',
      victory,
    }
  });

  const { qrcode } = action;

  res.json({
    victory,
    teamA,
    teamB,
    qrcode,
  });
});



const port = 8000;
app.listen(port, () => {
  console.log(`Game API server is listening on port ${port}`)
})