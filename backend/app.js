const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');
const multer = require('multer')
const multerS3 = require('multer-s3')

const { environment, awsConfig } = require('./config');
const isProduction = environment === 'production';

const app = express();
const routes = require('./routes');
const s3 = new aws.S3({
  accessKeyId:awsConfig.secretKeyId,
  secretAccessKey:awsConfig.secretAccessKey
 })
// exports.upload = multer({storage})
const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'quickcast-app',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})
app.use(morgan('dev'));
app.use(express.json());
// Set the _csrf token and create req.csrfToken method
// app.use(cookieParser());
// app.use(
//     csurf({
//         cookie: {
//             secure: isProduction,
//             sameSite: isProduction && "Lax",
//             httpOnly: true,
//         },
//     })
//     );
app.use(express.urlencoded({extended: true}));



// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}
// helmet helps set a variety of headers to better secure your app
app.use(helmet({
    contentSecurityPolicy: false
}));


// ROUTE INDEX
app.use(routes);

// Generic error handling
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
      err.errors = err.errors.map((e) => e.message);
      err.title = 'Validation error';
    }
    next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
      title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      stack: isProduction ? null : err.stack,
    });
  });

module.exports = app;
