require("dotenv").config();
const routes = require("./routes");
const session = require("express-session");
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.SRV_PORT;

const corsOptions = {
  origin: `http://localhost:3000`,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};
app.use(cors(corsOptions));
//app.use(cors()) -> 모든 접근 허용
app.use(
  session({
    secret: process.env.SRV_SESS_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(express.json());
app.use("/", routes);

app.listen(port, () => console.log(`App listening on port ${port}...`));
