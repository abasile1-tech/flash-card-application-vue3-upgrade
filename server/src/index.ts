import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import history from 'connect-history-api-fallback';
import decks from './routes/api/decks';
import users from './routes/api/users';

const app = express();

const dist_folder = __dirname + "/../../client/dist/";

app.use(history());
app.use(express.static(dist_folder));

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use("/api/decks", decks);
app.use("/api/users", users);

app.get('/', (req, res) => {
  res.sendFile(dist_folder + "index.html");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});