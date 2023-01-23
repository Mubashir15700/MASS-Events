import jwt from 'jsonwebtoken';

const staffAuthorization = (req, res, next) => {
    const Auth = req.headers;
    const token = Auth.authorization.split(' ')[1];
    if (!token) {
        res.status(401).send({ "status": "failed", "message": "Unauthorized user, no token" });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userID = data.id;
        //console.log(data.userID);
        return next();
    } catch {
        res.status(401).send({ "status": "failed", "message": "Unauthorized User" });
    }
}

export default staffAuthorization;