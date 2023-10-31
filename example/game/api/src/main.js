import express from 'express'
import cors from 'cors';
import { faker } from '@faker-js/faker';
import { getBearerTokenFromReq } from './utils/getBearerTokenFromReq.js';


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


app.post('/signin', (req, res) => {
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

app.get('/me', (req, res) => {
  if (!req.me) {
    res.status(401).send({ error: 'Not logged' });
    return;
  }
  res.send(req.me);
});


app.post('/play-match', (req, res) => {
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

  res.json({
    victory,
    teamA,
    teamB,
  });
});



const port = 8000;
app.listen(port, () => {
  console.log(`Game API server is listening on port ${port}`)
})