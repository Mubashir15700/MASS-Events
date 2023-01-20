import jwt from 'jsonwebtoken';

const adminAuthorization = (req, res, next) => {
  const token = req.cookies.jwt;
  if(!token) {
    res.status(401).send({ "status": "failed", "message": "Unauthorized user, no token" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = data.id;
    return next();
  } catch {
    res.status(401).send({ "status": "failed", "message": "Unauthorized user" });
  }
}

export default adminAuthorization;