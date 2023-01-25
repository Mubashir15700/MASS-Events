import jwt from 'jsonwebtoken';
import Staff from '../schema/staff-schema.js';

const adminAuthorization = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("token from admin cookie: " + token);
  if (!token) {
    res.status(401).send({ "status": "failed", "message": "Unauthorized user, no token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);
    const currentUser = await Staff.findById(decoded.userID).select('-password');
    console.log(currentUser);
    return next();
  } catch {
    res.status(401).send({ "status": "failed", "message": "Unauthorized user" });
  }
}

export default adminAuthorization;