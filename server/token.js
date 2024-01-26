const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

class Token {
    constructor() {
        this.secretKey = process.env.REACT_APP_JWT_SECRET;
    }

    makeToken(user) {
        return jwt.sign(user, this.secretKey, { expiresIn: '8h' })
    }

    tokenParse(token) {
      const res = jwt.verify(token, this.secretKey, (err, decoded) => {
        if (err) {
          // JWT 验证失败，可能是因为过期或无效
          if (err.name === 'TokenExpiredError') {
            console.log('JWT 已过期');
          } else {
            console.log('JWT 验证失败');
          }
          return {error: true}
        } else {
          // JWT 验证成功，decoded 中包含解码后的信息
          console.log('JWT 验证成功');
          console.log('发行时间 (iat):', decoded.iat);
          console.log('到期时间 (exp):', decoded.exp);
          decoded.error = false
          return decoded
        }
      });
      return res
    }
}

const tokenInstance = new Token();
module.exports = tokenInstance;