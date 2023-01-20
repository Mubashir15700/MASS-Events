import jwt from 'jsonwebtoken';

const staffAuthorization = (req, res, next) => {
    let token;
    const { Authorization } = req.headers;
    console.log(req.headers);
    if (Authorization && Authorization.startWith("Bearer")) {
        try {

            token = Authorization.split(' ')[1];
            console.log(token);

            const data = jwt.verify(token, process.env.JWT_SECRET_KEY);

            req.userID = data.id;
            return next();

        } catch {
            res.status(401).send({ "status": "failed", "message": "Unauthorized User" });
        }
    } else {
        res.send(401).send({ "status": "failed", "message": "Unauthorized user, no token" });
    }
}

export default staffAuthorization;