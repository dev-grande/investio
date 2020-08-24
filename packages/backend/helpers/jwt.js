const jwt = require('jsonwebtoken');

var JWT_SECRET='6A98gKfl91XXdEDgkdqfjwW98SPSX7ansQ0k9UBrs6tYFat9c6TgY4gn8aKJZZ9';

if (process.env['JWT_SECRET']) {
  JWT_SECRET = process.env['JWT_SECRET'];
}

const generateUserToken = (username, id, firstName, lastName) => {
    const token = jwt.sign({
      username,
      user_id: id,
      firstName,
      lastName,
    },
    JWT_SECRET, { expiresIn: '3d' });
    return token;
  };
  
  const isLoggedIn = (request) => {
    const authHeader = request.headers.authorization;
    // console.log(request.headers.authorization);
  
      if (authHeader) {
          const token = authHeader.split(' ')[1];
          return jwt.verify(token, JWT_SECRET, (err, user) => {
          if (err) {
              return false;
          }
          // console.log(user);
          return user;  
        });
      }
      else {
        return false;
      }
  }

module.exports = {
    generateUserToken,
    isLoggedIn
};