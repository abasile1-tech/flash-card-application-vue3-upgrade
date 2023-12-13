import express from 'express';
const app = express();
const port = 3000;

const dist_folder = __dirname + "/../../client/dist/";

app.use(express.static(dist_folder));

app.get('/', (req, res) => {
  res.sendFile(dist_folder + "index.html");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});