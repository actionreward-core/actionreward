import express from 'express'
import { faker } from '@faker-js/faker';


const app = express()
const port = 8000


const userTokens = new Map();


app.post('/signin', (req, res) => {
  const user = {
    id: faker.string.uuid(),
    name: faker.person.firstName() + ' ' + faker.person.lastName(),
    avatar: faker.image.avatar(),
  };

  const token = faker.string.uuid();

  userTokens[token] = user;
  res.send({
    token,
  });
})

app.listen(port, () => {
  console.log(`Game API server is listening on port ${port}`)
})