import express, {Express, Request, Response} from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { User } from './user';
import { addUser, getUsers } from './user_service';

dotenv.config();

const app: Express = express();
app.use(cors())
  .use(express.json())
  .options('*', cors());

app.post('/users', (req: Request, res: Response) => {
  const user = req.body
  addUser(user)
      .then((user : User) => res.send(user).status(201))
      .catch(() => res.send({}).status(500))

});

app.get('/users', (req: Request, res: Response) => {
  getUsers()
      .then((users: User[]) => res.send(users).status(200))
      .catch(() => res.send({}).status(500))
});

const port = process.env.PORT || 3111;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
