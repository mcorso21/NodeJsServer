const crypto = require('crypto');

var genSalt = function(saltLength){
    return crypto.randomBytes(Math.ceil(saltLength / 2))
        .toString('hex')
        .slice(0,saltLength);
};

module.exports = 
{ 
    hashSHA256 (pw) {
        let salt = genSalt(12);
        let alg = crypto.createHmac('sha512', salt);
        alg.update(pw);
        let hashedPw = alg.digest('hex');

        return {
            salt: salt,
            hashedPw: hashedPw
        };
    },

    compareSHA256 (pw, salt, hashedPw) {
        let alg = crypto.createHmac('sha512', salt);
        alg.update(pw);
        pw = alg.digest('hex');
        if (pw == hashedPw) {
            return true
        }
        return false
    }
}
