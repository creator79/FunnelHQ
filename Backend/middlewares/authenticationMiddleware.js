import jwt from 'jsonwebtoken';


 const authenticateToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    console.log(token);
    if (token) {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
            console.log(token);
        }
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: 'Token is not valid'
                });
            } else {
                console.log(decoded);
                req.decoded = decoded;
                next();
            }
        });
    } else {
        console.log(token);
        return res.json({
            success: 0,
            message: 'Auth token is not supplied'
        });
    }
}

export default authenticateToken;