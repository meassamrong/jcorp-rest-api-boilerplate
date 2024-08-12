const userModel = require('./../model/users');
const checkEmailIfExists = async (email) => {
    const ifEmailExists = await userModel.findOne({ email: email });
    if (ifEmailExists) return ifEmailExists;
    return false;
}
const checkifUsernameIsExist = async (username) => {
    const userAlreadyExists = await userModel.findOne({ username: username });
    if (userAlreadyExists) return userAlreadyExists;
    return false;
}
module.exports = { checkEmailIfExists, checkifUsernameIsExist }