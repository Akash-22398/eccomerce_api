import express from "express";
import http from 'http';
import { dbConnection } from "./src/config/database";
import config from "./src/config/config";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./src/routes/index";


global.config = config;

const app = express();
const port = config.port || 7071;

app.use(cors({
  origin: '*'
})); 

app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/public', express.static('public'));

app.use(dbConnection);

global.db = {};
global.conn = undefined;
app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Hello, I am Working...");
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
