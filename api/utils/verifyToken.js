// const createError = require("./error");
// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   console.log(token);
//   if (!token || token === undefined) {
//     console.log("pula");
//     return next(createError(401, "not authenticated"));
//   }
//   jwt.verify(token, process.env.JWT, (error, user) => {
//     console.log("pula1");

//     if (error) return next(createError(403, "token is not authorized"));
//     req.user = user;

//     next();
//   });
// };

// const verifyUser = (req, res, next) => {
//   verifyToken(req, res, next, () => {
//     if (req.user.id === req.params.id || req.user.isAdmin) {
//       // res.status(200).json("you can update and delete your own account");
//       next();
//     } else {
//       return next(createError(403, "you cannot edit and delete"));
//     }
//   });
// };
// const verifyAdmin = (req, res, next) => {
//   console.log("Ashok");
//   verifyToken(req, res, () => {
//     console.log("agsd");
//     console.log(req.user);
//     if (req.user !== undefined && req.user.isAdmin) {
//       // res.status(200).json("you can update and delete all accounts");
//       next();
//     } else {
//       return next(
//         createError(
//           403,
//           "you are not admin and cann't  delete and edit the account and hotels"
//         )
//       );
//     }
//   });
// };

// module.exports = { verifyToken, verifyUser, verifyAdmin };
const jwt = require("jsonwebtoken");
const createError = require("./error");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
module.exports = { verifyToken, verifyUser, verifyAdmin };
//
