const jwt = require("jsonwebtoken");
// const secret = "LemonToad";
const dotenv = require("dotenv");
// const cors = require("cors");



// const token = jwt.sign(payload, null);
// console.log(token);



// jwtConfig.js

module.exports = {
  secretOrKey: process.env.SECRET_KEY,
  expiresIn: "7d" // Expiration time for the JWT (e.g., "1h", "30m", "7d")
};





// module.exports.authenticate = (req, res, next) => {
//     jwt.verify(req.cookies.usertoken, process.env.THIRD_SECRET_KEY), (err, payload) => {
//     if (err) { 
//         res.status(401).json({verified: false});
//     } else {
//         next();
//     }
//     };
// }
