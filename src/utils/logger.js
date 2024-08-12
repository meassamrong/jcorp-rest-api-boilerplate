require('dotenv').config();
const path = require('path');
const axios = require('axios');
var rfs = require('rotating-file-stream');
const isAllowedDiscordLogger = process.env.ALLOW_DISCORD_LOGGER;

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join('temp/log')
})

const sendLogToDiscordWebhook = {
    write: (message) => {
        // Create the log message payload
        const payload = {
            content: `\`\`\`${message}\`\`\``, // Using code block formatting for better readability
        };
        // Send the log message to the Discord webhook
        if (isAllowedDiscordLogger === 'true') {
            axios.post(process.env.DISCORD_WEBHOOK, payload);
        }
    }
};
module.exports = { accessLogStream, sendLogToDiscordWebhook }