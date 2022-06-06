let jwt = require("jsonwebtoken");

const ERROR_RESPONSE = {
    success: false,
    hasTokenExpired: true,
    message: "INVALID_TOKEN",
};

let checkToken = (req, res, next) => {
    try {
        // Express headers are auto converted to lowercase
        let token = req.headers["x-access-token"] || req.headers["authorization"];
        token =
            token && token.startsWith("Bearer ") ?
            (token = token.slice(7, token.length)) :
            token;
        let decodedToken = jwt.decode(token);
        // console.log('===>',token);
        if (token) {
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (!err) {
                    req.decoded = decoded;
                    next();
                } else res.json(ERROR_RESPONSE);
            });
        } else res.json(ERROR_RESPONSE);

    } catch (error) {
        res.json(ERROR_RESPONSE);
    }

};

module.exports = {
    checkToken: checkToken,
};