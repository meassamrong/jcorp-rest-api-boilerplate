const dbConenction = require('./../database/db_connection');
const userModel = require('./../model/users');
const prompt = require('prompt-sync')();
const bcrypt = require('bcrypt');
dbConenction().catch((err) => { console.log(err) });

// admin information readline
const adminData = {
    fullname: prompt('Full Name: '),
    username: prompt('Username: '),
    email: prompt('Email: '),
    tel: prompt('Phone Number: '),
    roles: ['admin'],
    password: prompt('Password: '),
}
// creating a new admin
genAdmin(adminData)

async function genAdmin(userData) {
    try {
        const hashedPassword = bcrypt.hashSync(userData.password, 10);
        const newAdmin = new userModel({
            fullname: userData.fullname,
            username: userData.username,
            email: userData.email,
            tel: userData.tel,
            roles: userData.roles,
            password: hashedPassword,
            createDate: new Date(),
        });
        await newAdmin.save();
        console.log('Admin created successfully');
    } catch (err) {
        console.log(err)
    }
}
