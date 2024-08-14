const express = require('express');
const router = express.Router();
const { validationErrorHandler, checkEmailOrUsername } = require('./../../middleware/index');
const { creatUserValidator, userLoginValidator, IdValidator, passwordValidator, userUpdateSelfProfile, updateUserDataValidation } = require('./../../validation/auth_validation');
const { permissionRequire } = require('./../../permission/users_permission');
const { createUser, userLogin, updateSelfProfile, removeUser, selfRemove, updateUser, getMyProfile, getUserById, getAllUsers } = require('./../../controller/auth');
const { verifyToken } = require('./../../token/index');

// user create profile
router.post('/auth/resgister', creatUserValidator, validationErrorHandler, createUser);
// user login
router.post('/auth/login', userLoginValidator, checkEmailOrUsername, validationErrorHandler, userLogin);
// user update profile
router.patch('/auth/self_update', verifyToken, userUpdateSelfProfile, validationErrorHandler, updateSelfProfile);
// user self-profile remove 
router.delete('/auth/self_remove', verifyToken, passwordValidator, validationErrorHandler,  selfRemove);
// user get sefl-profile
router.get('/myprofile', verifyToken, getMyProfile);

// remove user profile
router.delete('/auth/remove/user', verifyToken, permissionRequire(['admin', 'moderator']), IdValidator, validationErrorHandler, removeUser);
// update user profile by ID 
router.patch('/auth/update/users', verifyToken, permissionRequire(['admin', 'moderator']), updateUserDataValidation, validationErrorHandler, updateUser);
// get user profile by ID
router.get('/profile/id', verifyToken, permissionRequire(['admin']), IdValidator, validationErrorHandler, getUserById);
// get all user profile
router.get('/profile/all', verifyToken, permissionRequire(['admin']), getAllUsers);

module.exports = router