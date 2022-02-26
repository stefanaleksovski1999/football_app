var express = require('express');
var router = express.Router();
const controller = require('../controller/players');
const nodemailer = require("nodemailer");

// CRUD operations: Create Read Update Delete

router
      .get('/', controller.getAll)
      .get('/create', controller.getCreate)
      .get('/:id', controller.getEdit)     
      .post('/', controller.create)
      .post('/:id', controller.update)
      // .get('/:id/mail', controller.writeEmail)
      // .get('/:id/mail', controller.sendMail)
      .post('/blabla', async (req, res) => {
            const {email} = req.body;
            
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                  host: "smtp.ethereal.email",
                  port: 587,
                  secure: false, // true for 465, false for other ports
                  auth: {
                        user: 'juanita.lehner99@ethereal.email', // generated ethereal user
                        pass: 'CHSk141wyb3NgRNtJa', // generated ethereal password
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
                  })
      .delete('/:id', controller.getDeleted)

module.exports = router;
