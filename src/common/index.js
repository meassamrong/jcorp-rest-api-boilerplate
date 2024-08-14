const userModel = require('./../model/users');
// check if email exists
const checkEmailIfExists = async (email) => {
    const ifEmailExists = await userModel.findOne({ email: email });
    if (ifEmailExists) return ifEmailExists;
    return false;
}
// check if username exists
const checkifUsernameIsExist = async (username) => {
    const userAlreadyExists = await userModel.findOne({ username: username });
    if (userAlreadyExists) return userAlreadyExists;
    return false;
}
// check if user exists by id
const checkIfUserIDExists = (async (id) => {
    const user = await userModel.findById(id);
    if (user) return user;
    return false;
})
module.exports = { checkEmailIfExists, checkifUsernameIsExist, checkIfUserIDExists }