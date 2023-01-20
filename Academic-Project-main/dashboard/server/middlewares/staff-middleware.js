import jwt from 'jsonwebtoken';

const staffAuthorization = (req, res, next) => {
    let token;
    const Auth = req.headers;
    if (Auth) {
        try {
            token = Auth.authorization.split(' ')[1];
            //console.log(token);
            const data = jwt.verify(token, process.env.JWT_SECRET_KEY);

            req.userID = data.id;
            return next();

        } catch {
            res.status(401).send({ "status": "failed", "message": "Unauthorized User" });
        }
    } else {
        res.status(401).send({ "status": "failed", "message": "Unauthorized user, no token" });
    }
}

export default staffAuthorization;