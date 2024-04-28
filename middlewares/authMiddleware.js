const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await User.findById(decoded.id);
                next();
            }
        } catch (error) {
            throw new Error("Not authorized, token expired or invalid, please login again");
        }
    } else {
        throw new Error("No token attached to this request");
    }
});

module.exports = { authMiddleware };
