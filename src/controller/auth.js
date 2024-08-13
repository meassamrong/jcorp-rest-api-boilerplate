const userModel = require('./../model/users');
const bcrypt = require('bcrypt');
const { signToken } = require('./../token/index');
const createUser = (async (req, res) => {
    try {
        const { fullname, username, email, tel, roles, image, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            fullname: fullname,
            username: username,
            email: email,
            tel: tel,
            roles: roles,
            image: image,
            password: hashedPassword,
            createDate: new Date(),
        });
        const saveUserResult = await newUser.save();
        if (!saveUserResult) return res.status(401).json({ error: true, messsage: "Email already registered!" });
        saveUserResult.password = '';
        res.status(200).json({ error: false, message: saveUserResult });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: true, messsage: "Internal server error!" });
    }
});
// login
const userLogin = (async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const user = await userModel.findOne({ $or: [{ email: email }, { username: username }] });
        if (!user) return res.status(401).json({ error: true, messsage: "incorrect username/password!" });
        const passwordIsMatch = await bcrypt.compare(password, user.password);
        if (!passwordIsMatch) return res.status(401).json({ error: true, messsage: "Email or Password incorrect!" });
        const userSignature = {
            id: user._id,
            username: user.username,
            email: user.email,
            tel: user.tel,
            roles: user.roles
        }
        const jwtToken = signToken(userSignature);
        return res.status(200).json({ error: false, messsage: 'successfully signed', token: jwtToken });
    } catch (error) {
        return res.status(500).json({ error: true, messsage: "Internal server error!" });
    }
});
// remove user account
const removeUser = (async (req, res) => {
    try {
        const { id } = req.query;
        const deleteUser = await userModel.findByIdAndDelete(id);
        if (deleteUser) {
            res.status(200).json({ error: false, messsage: "User deleted successfully!" });
        } else {
            res.status(404).json({ error: true, messsage: "User Couldn't be found!" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: true, messsage: "Internal server error!" });
    }
});
// self profile remove
const selfRemove = (async (req, res) => {
    try {
        const { id } = req.users;
        const deleteProfile = await userModel.findByIdAndDelete(id.id);
        if(deleteProfile) {
            res.status(200).json({ error: false, messages: "User deleted successfully!" });
        }else {
            res.status(404).json({error : true, message : "User Couldn't be found!"});
        }
    }catch(err) {
        console.log(err);
        return res.status(500).json({ error: true, messsage: "Internal server error!" });
    }
});
const updateUser = (async (req, res) => {
    try {
        const userId  = req.query.id
        const userData = req.body
        console.log(userId, userData);
    }catch (err){
        console.log(err);
        return res.status(500).json({ error: true, messsage: "Internal server error!" });
    }
});
// get my profile
const getMyProfile = (async (req, res) => {
    try {
        const { id } = req.users;
        const myProfile = await userModel.findById(id.id);
        if (myProfile) {
            myProfile.password = '';
            res.status(200).json({ error: false, profile: myProfile });
        } else {
            res.status(404).json({ error: true, message: 'Someting went wrong with this profile!' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: true, messsage: "Internal server error!" });
    }
});
// get user bu id
const getUserById = (async (req, res) => {
    try {
        const { id } = req.query;
        const user = await userModel.findById(id);
        if (user) {
            user.password = '';
            res.status(200).json({ error: false, user: user });
        } else {
            res.status(404).json({ error: true, message: "User Not Found!" });
        }
    } catch (error) {
        console.log(error);
    }
});
// get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        if (users) {
            res.status(200).json({ error: false, users: users });
        } else {
            res.status(200).json({ error: false, messages: "No users found!" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: true, messsage: "Internal server error!" });
    }
}
module.exports = { createUser, userLogin, removeUser, selfRemove, updateUser, getMyProfile, getAllUsers, getUserById }