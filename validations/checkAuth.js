import  jwt  from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    //token
    if (token) {
        try {
            const decoded = jwt.verify(token, 'secretword123');
        //peredaem id user-> userId
        req.userId = decoded.userId;
        next();
    } catch (e) {
        return res.status(403).json({
            message: 'No access user',
        });
        }
    } else {
        //no access
        return res.status(403).json({
            message: 'No access',
        });
    }
};
