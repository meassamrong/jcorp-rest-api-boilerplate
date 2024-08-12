const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const signToken = (id, email, image, username) => {
    const token = jwt.sign({
        id: id,
        email: email,
        image: image,
        username: username
    }, process.env.JWT_SECRET, {
        expiresIn: '24h',
        issuer: process.env.API_ISSUER,
        audience: process.env.CLIENT_URL
    })
    return token
}

const verifyToken = asyncHandler(async (req, res, next) => {
    let token = req.header("Authorization")
    if (!token) {
        return res.status(401).json({ error: "Access Denied!" })
    }
    try {
        token = token.replace("Bearer ", "")
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET)
        req.users = tokenDecoded
        next()
    } catch (errors) {
        return res.status(401).json({ error: "Invalid authorization token!" })
    }
})
module.exports = { verifyToken }
module.exports = { signToken }