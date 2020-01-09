const routes = require("./routes");

const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const corsOptions = {
  origin: `http://localhost:3000`,
  methods: ["GET", "POST", "PUT", "DELETE"]
};
app.use(cors(corsOptions));
//app.use(cors()) -> 모든 접근 허용

app.use(express.json());
app.use("/", routes);

app.listen(port, () => console.log(`App listening on port ${port}...`));
