import jwt from 'jsonwebtoken';
import Staff from '../schema/staff-schema.js';

var checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  console.log("Auth:  ", authorization);
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // Get Token from header
      token = authorization.split(' ')[1];
      //console.log("Token:  ", token);

      // Verify Token
      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      //console.log("User:  ", userID);

      // Get User from Token
      req.user = await Staff.findById(userID).select('-password');
      //console.log("Req:  ", req.user);

      next();
    } catch (error) {
      res.status(401).send({ "status": "failed", "message": "Unauthorized User" });
    }
  }
  if (!token) {
    res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" });
  }
}

export default checkUserAuth;