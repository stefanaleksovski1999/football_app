const createError = require('http-errors');
const express = require('express');
const nodemailer = require('nodemailer')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const playersRouter = require('./routes/players');
const leaguesRouter = require('./routes/leagues');
const clubsRouter = require('./routes/clubs');
const agentsRouter = require('./routes/agents');
const playersAPIRouter = require('./routes/api/players');
const leaguesAPIRouter = require('./routes/api/leagues');
const clubsAPIRouter = require('./routes/api/clubs');

const mongoose = require('mongoose');

// MVC: Model View Controller

const app = express();
mongoose.connect('mongodb://localhost:27017/employees-app-gen-15');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use('/api/players', playersAPIRouter);
app.use('/api/leauges', leaguesAPIRouter);
app.use('/api/clubs', clubsAPIRouter);

app.use('/players', playersRouter);
app.use('/clubs', clubsRouter)
// app.use('/leauges', leaguesRouter);
app.use('/agents', agentsRouter);

app.post('/blabla', async (req, res) => {


    const {email} = req.body;
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
                user: 'stefan@test.test', // generated ethereal user
                pass: 'SjbS99xTvpmF1hMyMc', // generated ethereal password
          },
    });
    
    // send mail with defined transport object
    const info = await transporter.sendMail({
          from: '"Fred Foo 👻" <foo@example.com>', // sender address
          to: `${email}`, // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
    });
    
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          
      res.send('Email sent!')
          
  

  res.send('Eamil sent!');
})


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

module.exports = app;
