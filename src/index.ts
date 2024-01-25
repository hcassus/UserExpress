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
      .then((userId: string) => res.send(userId).status(201))
      .catch((err) => {
        res.status(500).send(err.message)
      })

});

app.get('/users', (req: Request, res: Response) => {
  getUsers()
      .then((users: User[]) => res.send(users).status(200))
      .catch((reason) => res.status(500).send(reason))
});

const port = process.env.PORT || 3111;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
