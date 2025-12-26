import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(" ")[1]

    if (!token) {
        return res.status(401).json({message: "Unauthorized Access"})
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(403).json({message: "Invalid Token"})
        }

        req.user = user;
        next();
    })
}