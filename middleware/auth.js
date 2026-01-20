const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Bearer TOKEN
        const token = authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; 
        console.log(decoded);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Authentication failed" });
    }
};

module.exports = auth;
