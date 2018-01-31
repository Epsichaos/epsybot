var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var characterApi = require('./character');
var https = require('https');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', function(evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function(user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch (cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                logger.info('Sent message Pong!')
                break;
            case 'ilvl':
                characterApi.character_ilvl(args, function(max, equiped) {
                    logger.info(user + " requested ilvl -> max: " + max + ", equiped: " + equiped);
                    bot.sendMessage({
                        to: channelID,
                        message: "Requested ilvl -> max: " + max + ", equiped: " + equiped
                    });
                })
                break;
                // Just add any case commands if you want to..
        }
    }
});