const crypto = require('crypto')


function hash(password, secret) {
    const hash = crypto.createHmac('sha256', secret)
                   .update(password)
                   .digest('hex');
    return hash;
}

module.exports = hash

