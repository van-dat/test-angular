const jwt = require('jsonwebtoken')
const asyncHandle = require('express-async-handler')



const verifyToken = asyncHandle(async (req, res, next) => {
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECERT, (err, decode) => {
            if (err)
                return res.status(401).json({
                    success: false,
                    mes: "Invalid access token",
                });
            req.user = decode;
            next();
        });
    } else {
        return res.status(404).json({
            success: false,
            mes: "Require authentication!!!",
        });
    }
})

const isAdmin = asyncHandle((req, res, next) => {
    const { role } = req.user;
    console.log(role)
    if (role !== 'QL')
    return res.status(401).json({
        success: false,
        mes: "Require admin role"
      })
      next();
  });

module.exports = {
    verifyToken,
    isAdmin
}