
import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized. Please login."
            });
        }

        const token_decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (
            token_decode !==
            process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
        ) {
            return res.status(401).json({
                success: false,
                message: "Not authorized. Please login again."
            });
        }

        next();

    } catch (error) {
        console.log("Admin authentication error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token. Please login again."
        });
    }
};

export default adminAuth;
