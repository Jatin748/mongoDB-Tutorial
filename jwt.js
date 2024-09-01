const jwt = require('jsonwebtoken');

const jwtAuthMiddleWare = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ error: "Invalid token" });
    const token = authorization.split(' ')[1];
    if (!token) res.status(401).json({ error: "Unauthorized" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: "Invalid Token" });
    }
};

const generateToken = (userData) => {
    return jwt.sign({ userData }, process.env.JWT_SECRET, { expiresIn: 30000 });
};

module.exports = { jwtAuthMiddleWare, generateToken };