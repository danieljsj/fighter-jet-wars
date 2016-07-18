// TODO: FIND A WAY OF DOING THIS THAT DOESN'T EXPOSE THE SERVER'S CREDS TO BROWSERS... OTHERWISE PEOPLE COULD GET IN AND CONTROL EACH OTHER'S PLANES!!! unless.... unless you set the server only able to READ, and only browsers can write to the FB controls......
if ('undefined' == typeof window) {
	module.exports = require('../../backend/services/FirebaseRefService');
} else {
	module.exports = require('../../frontend/services/FirebaseRefService');
}