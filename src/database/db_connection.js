require('dotenv').config()
const mongoose = require("mongoose")
const uri = process.env.MONGO_DB_STRING

//To-do retry every 10 seconds
async function dbConnect() {
    mongoose.connection.on('connected', () => console.log('Database connected'));
    mongoose.connection.on('open', () => console.log('Database opened'));
    await mongoose.connect(uri, {
        dbName: 'gna-db-store'
    })
}

module.exports = dbConnect