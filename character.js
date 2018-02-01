const https = require('https');

var auth = require('./auth.json');
var requests = require('./ws/requests')
var exports = module.exports = {};

exports.character_ilvl = function(cmd, callback) {
    if (cmd != undefined) {
        parameters = cmd;
        if (parameters.length === 2) {
            https.get(requests.build_blizzard_api_items_request('cho\'gall', 'epsxy'), (res) => {
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
