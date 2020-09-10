const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const studentRoute = require('./routes/studentRoute');
const resourceRoute = require('./routes/resourcesRoute');
const noticeRouter = require('./routes/noticeRoute');

const app = express();

/*==========
MIDDLEWARER
============*/

// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan());
//   app.use(express.static(`client/build`));
//   app.get('*', (req, res, next) => {
//     res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(`client/build`));
//   app.get('*', (req, res, next) => {
//     res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.static(`${__dirname}/public`));

app.use(cors());
app.use(cookieParser());

/*==========
ROUTE EXECUTE
============*/
app.use('/api/v1/student', studentRoute);
app.use('/api/v1/resource', resourceRoute);
app.use('/api/v1/notice', noticeRouter);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan());
  app.use(express.static(`${__dirname}/client/build`));
  app.get('*', (req, res, next) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(`${__dirname}/client/build`));
  app.get('*', (req, res, next) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 404;
  res.status(statusCode).json({ status: 'fail', message: err.message });
});
module.exports = app;
