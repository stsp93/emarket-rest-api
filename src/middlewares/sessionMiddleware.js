const { verifyToken } = require("../services/userService");
const errorHandler = require("../utils/errorHandler");


module.exports = () => async (req, res, next) => {

    const token = req.headers['Authorization'];
    if (token) {
        try {
            const user = await verifyToken(token);
            req.user = user
            req.token = token
        } catch (error) {
            req.status(401).json(errorHandler(error));
        }

    }

    next()
}