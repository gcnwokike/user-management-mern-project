const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //Get token from the header

  const token = req.header("x-auth-token");

  //Check if no token

  if (!token) {
    return res
      .status(401)
      .json({ msg: "No token detected Authorization Denied" });
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, "mysecretetoken");

    req.user = decoded.user;
    //console.log(req.user.oname);
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid: Authorization Denied" });
  }
};
