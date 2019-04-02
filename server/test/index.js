const encrypt = require('./encrypt.js')

let pw = 'hello world!'
let hashIt = (encrypt.hashSHA256(pw))
console.log(hashIt)
console.log(encrypt.compareSHA256('pw', hashIt.salt, hashIt.passwordHash))