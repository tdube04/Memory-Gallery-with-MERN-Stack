import createError from 'http-errors';
import express from 'express';
import http from 'http';

import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import postRoutes from './routes/posts.js';


var app = express();
const port =8000;

mongoose.Promise = global.Promise;



mongoose.connect('mongodb://localhost/TodoDB')
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("***************Database connected!***********");
});

app.listen(port, () => console.log(`***********listening on localhost: ${port}********`));


app.use(bodyParser.json({limit: "30mb", extended: "true"}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: "true"}));
app.use (cors());

app.use('/posts', postRoutes);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


export default app;