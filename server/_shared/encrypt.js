const crypto = require("crypto");
const { logger } = require("./logger");

var genSalt = function(saltLength) {
	return crypto
		.randomBytes(Math.ceil(saltLength / 2))
		.toString("hex")
		.slice(0, saltLength);
};

module.exports = {
	hash(algo, pw) {
		try {
			let salt = genSalt(12);
			let alg = crypto.createHmac(algo, salt);
			alg.update(pw);
			let hashedPw = alg.digest("hex");

			return {
				salt: salt,
				hashedPw: hashedPw,
			};
		} catch (ex) {
			
		}
	},

	compare(algo, pw, salt, hashedPw) {
		let alg = crypto.createHmac(algo, salt);
		alg.update(pw);
		pw = alg.digest("hex");
		if (pw == hashedPw) {
			return true;
		}
		return false;
	},
};
