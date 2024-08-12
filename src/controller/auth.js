const userModel = require('./../model/users')
const bcrypt = require('bcrypt')
const { signToken } = require('./../token/index')
const createUser = async (req, res) => {
    try {
        const { fullname, username, email, tel, roles, image, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new userModel({
            fullname: fullname,
            username: username,
            email: email,
            tel: tel,
            roles: roles,
            image: image,
            password: hashedPassword,
            createDate: new Date(),
        })
        const saveUserResult = await newUser.save()
        if (!saveUserResult) return res.status(401).json({ error: true, messsage: "Email already registered!" })
        saveUserResult.password = ''
        res.status(200).json({ error: false, message: saveUserResult })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: true, messsage: "Internal server error!" })
    }
}
const userLogin = (async (req, res) => {
    const { email, username, password } = req.body
    try {
        const user = await userModel.findOne({ $or: [{ email: email }, { username: username }] })
        if (!user) return res.status(401).json({ error: true, messsage: "incorrect username/password!" });
        const passwordIsMatch = await bcrypt.compare(password, user.password)
        if (!passwordIsMatch) return res.status(401).json({ error: true, messsage: "Email or Password incorrect!" })
        const userSignature = {
            id: user._id,
            username: user.username,
            email: user.email,
            tel: user.tel,
            roles: user.roles
        }
        const jwtToken = signToken(userSignature)
        return res.status(200).json(jwtToken)
    } catch (error) {
        return res.status(500).json({ error: true, messsage: "Internal server error!" })
    }
})
module.exports = { createUser, userLogin }