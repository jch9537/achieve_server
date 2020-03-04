const crypto = require("crypto");
const oauthModel = require("../model/oauthModel");

module.exports = {
  signUpOrSignIn: (req, res) => {
    if (!(req.query.email || req.query.name)) {
      return res.redirect(`${process.env.CLNT_ADDRESS}/`);
    } else {
      let arg = {
        email: req.query.email,
        name: req.query.name,
        password: crypto
          .createHmac("sha512", process.env.SRV_CRYPTO_SALT)
          .update(process.env.OAUTH_PWD)
          .digest("base64")
      };
      oauthModel.signUpOrSignIn(arg, (err, result) => {
        if (err) {
          return res.redirect(`${process.env.CLNT_ADDRESS}/`);
        } else {
          if (!result.length) {
            req.session.userId = result.insertId;
            return res.redirect(
              `${process.env.CLNT_ADDRESS}/${req.session.userId}/main`
            );
          } else {
            req.session.userId = result[0].id;
            return res.redirect(
              `${process.env.CLNT_ADDRESS}/${req.session.userId}/main`
            );
          }
        }
      });
    }
  }
};
