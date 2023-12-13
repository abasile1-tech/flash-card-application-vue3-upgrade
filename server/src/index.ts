import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

const dist_folder = __dirname + "/../../client/dist/";

app.use(express.static(dist_folder));

// Middleware
app.use(bodyParser.json());
app.use(cors());

import decks from "./routes/api/decks";

app.use("/api/decks", decks);

app.get('/', (req, res) => {
  res.sendFile(dist_folder + "index.html");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});