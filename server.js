const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');

/*==========
CONNECT MONGODB DATABASE
============*/
const DB = process.env.MONGO_CONNECT_URL.replace('<PASSWORD>', process.env.MONGO_CONNECT_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Database connected...');
  });

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.message, err);
  console.log('server is clossing...');
  server.close(() => {
    process.exit(1);
  });
});
