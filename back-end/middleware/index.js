const admin = require("../config/firebase-config");

class MiddleWare {
  async decodeToken(req, res, next) {
    let token = await req.headers.authorization;

    if (token) {
      token = token.split(" ")[1];
      try {
        const decodeValue = await admin.auth().verifyIdToken(token);
        if (decodeValue) {
          return next();
        }
        return res.json({ message: "Unauthorized" });
      } catch (e) {
        return res.json({ message: "Internal Error" });
      }
    }
  }
}

module.exports = new MiddleWare();