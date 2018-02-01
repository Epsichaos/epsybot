var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
var characterApi = require('./character');
var https = require('https');
var commands = require('./model/commands')

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
bot = new Discord.Client();
const token = auth.token;
bot.login(token);

bot.on('ready', function(evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info('Bot connected — ' + bot.user.username);
});
bot.on('message', message => {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.content.substring(0, 1) == '!') {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch (cmd) {
            // !ping
            case commands.PING:
                message.channel.send('Pong!')
                logger.info('Sent message Pong!')
                break;
            case commands.ILVL:
                characterApi.character_ilvl(args, function(max, equiped) {
                    logger.info(message.author.username + " requested ilvl -> max: " + max + ", equiped: " + equiped);
                    message.channel.send(message.author + " requested ilvl -> max: " + max + ", equiped: " + equiped)
                })
                break;
                // Just add any case commands if you want to..
        }
    }
});
