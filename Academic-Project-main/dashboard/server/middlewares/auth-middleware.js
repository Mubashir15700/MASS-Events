import jwt from 'jsonwebtoken';

const authorization = (req, res, next) => {
  const token = req.cookies.jwt;
  if(!token) {
    res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = data.id;
    return next();
  } catch {
    res.status(401).send({ "status": "failed", "message": "Unauthorized User" });
  }
}

export default authorization;