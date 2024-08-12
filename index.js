require('dotenv').config()
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT;
const { accessLogStream, sendLogToDiscordWebhook } = require('./src/utils/logger');

const dbConnect = require("./src/database/db_connection");
dbConnect().catch((err) => { console.log(err) });

const corsOptions = {
    exposedHeaders: 'Authorization', // Allow the 'Authorization' header
};

// setup the logger
if (process.env.CREATE_LOGGER === 'true') {
    morgan.token('id', function getId(req) { });
    app.use(morgan('dev', { skip: function (req, res) { return res.statusCode < 400 } }));
    app.use(morgan('combined', { stream: accessLogStream }));
    app.use(morgan('combined', { stream: sendLogToDiscordWebhook })); // send log to discord
}

// Middleware
app.use(compression())
app.use(cors(corsOptions)); // Allow cross side requests
app.use(bodyParser.json())
app.use(express.json({ limit: '10mb' }));// Increase payload size limit (e.g., 20MB)
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Increase payload size limit (e.g., 20MB)

// routers
// authentication routes
const auth = require('./src/routers/auth/index')
app.use('/api/user', auth)

app.listen(PORT, () => {
    console.log(`server started at PORT: ${PORT}`)
})