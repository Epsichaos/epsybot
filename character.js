const https = require('https');

var auth = require('./auth.json');
var exports = module.exports = {};

exports.character_ilvl = function(cmd, callback) {
    if (cmd != undefined) {
        parameters = cmd;
        if (parameters.length === 2) {
            https.get("https://eu.api.battle.net/wow/character/cho'gall/epsxy?fields=items&locale=en_US&apikey=" + auth.blizzardApiKey, (res) => {
                // console.log('statusCode:', res.statusCode);
                // console.log('headers:', res.headers);
                let data = '';
                // A chunk of data has been recieved.
                res.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                res.on('end', () => {
                    response = JSON.parse(data)
                    callback(JSON.parse(data).items.averageItemLevel, JSON.parse(data).items.averageItemLevelEquipped)
                });

            }).on('error', (e) => {
                console.error(e);
            });
        } else {
            return "Syntax: !ilvl REALM CHARACTER";
        }
    } else {
        return "Syntax: !ilvl REALM CHARACTER";
    }
}