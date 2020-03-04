require("dotenv").config();
const routes = require("./routes");
const session = require("express-session");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const app = express();
const port = process.env.SRV_PORT;

const corsOptions = {
  // origin: "http://localhost:3000",
  origin: process.env.CLNT_ADDRESS,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};
app.use(cors(corsOptions));
//app.use(cors()) -> 모든 접근 허용
app.use(
  session({
    // secure: true,  // https에서만 접근가능
    // httpOnly: true,  // 사용자가 전송한 데이터에서 javascript코드를통해 (session/cookie사용억제)허용을 안하고 http만 허용
    secret: process.env.SRV_SESS_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
      // console.log(
      //   "구글전략1",
      //   accessToken,
      //   "구글전략2",
      //   refreshToken,
      //   "구글전략3",
      //   profile
      // );
      app.set("email", profile.emails[0].value);
      app.set("name", profile.displayName);
      done(null, profile);
    }
  )
);

app.use(express.json());
app.use("/", routes);

app.listen(port, () => console.log(`App listening on port ${port}...`));
