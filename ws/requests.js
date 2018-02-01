var auth = require('./../auth.json');
var blizzApi = require('./blizz.js')
var exports = module.exports = {};

exports.build_blizzard_api_items_request = function(realm, character_name) {
  return blizzApi.BLIZZARD_CHARACTER_URI + realm + "/" + character_name + "?fields=items&locale=en_US&apikey=" + auth.blizzardApiKey;
}
