
// const mongoose = require('mongoose');
const Player = require('../models/player');
const Club = require('../models/club');
const Agent = require('../models/agent');
// const PDFPrinter = require('pdfmake');
const nodemailer = require('nodemailer');

const { findByIdAndUpdate } = require('../models/player');

const getAll = async (req, res) => {

    // if (req.query.first_name && req.query.last_name) {
    //   const players = await Player.find({
    //     first_name: req.query.last_name,
    //     last_name: req.query.last_name
    //   }).populate('club');

    //   res.send({
    //     error: false,
    //     message: `All players with first name ${req.query.first_name} and last name ${req.query.last_name} has been fetched`,
    //     players: players        
    //   });
    //   return;
    // }
    // const players = await Player.find().populate('club');

    // res.send({
    //   error: false,
    //   message: 'All players from the database',
    //   player: players
    // });



    if (req.query.first_name && req.query.last_name) {
      const players = await Player.find({
        first_name: req.query.first_name,
        last_name: req.query.last_name
      }).populate('club').populate('agent');

     
      res.render('players/index', { players });
      return;
    }

    const players = await Player.find().populate('club', 'name').populate('agent', 'first_name last_name', );

    res.render('players/index', { players });
   
  };

  const getCreate = async (req, res) => {
    const clubs = await Club.find();
    const agents = await Agent.find();

    res.render('players/create', {clubs, agents});
  };

  const getEdit = async (req, res) => {
    const player = await Player.findById(req.params.id).populate('club').populate('agent');
    const clubs = await Club.find();
    const agents = await Agent.find();

    res.render('players/edit', { player, clubs, agents });
  };

  
  // const getAllWithId = async (req, res) => {
  //   const player = await Player.findById(req.params.id);

  //   res.send({
  //     error: false,
  //     message: 
  //       `Player with id #${employee._id}, 
  //       named ${employee.first_name} ${employee.last_name}, has been fetched`,
  //     player: player
  //   });
  // };


  const create = async (req, res) => {
      if (req.body.club == '') {
      req.body.club = null;
    };

     if (req.body.agent == '') {
      req.body.agent = null;
    };
    
    const player = await Player.create(req.body);

    if(req.body.club) {
      await Club.findByIdAndUpdate(req.body.club, {
        $push: {players: player}
      });
    };


    if(req.body.agent) {
        await Agent.findByIdAndUpdate(req.body.agent, {
          $push: {players: player}
      });
    };

    res.redirect('/players');
  };

  const update = async (req, res) => {
    if (req.body.club == '') {
      req.body.club = null;
    }

    const player = await Player.findByIdAndUpdate(req.params.id, req.body);
   

    if(req.body.club) {
      let foundPlayer = await Club.find({ players : player })

      if (foundPlayer.length == 0) {
        await Club.findByIdAndUpdate(req.body.club, {
        $push: {players: player}
      });
      }

      
    }

    res.redirect('/players');
  };


  // const writeEmail = async (req, res) => {
  //   const player = await Player.findById(req.params.id);
  //   res.render('players/writeEmail', {player});
  // }


  // const sendMail = async (req, res) => {

  //   const player = await Player.findById(req.params.id);

  //   const {email, subject, emailContent} = req.body;
    


  //     // create reusable transporter object using the default SMTP transport
  //   let transporter = nodemailer.createTransport({
  //     host: "smtp.ethereal.email",
  //     port: 587,
  //     secure: false, // true for 465, false for other ports
  //     auth: {
  //       user: 'sn7opjpdtlzw3xsq@ethereal.email', // generated ethereal user
  //       pass: 'KSmyRGRk8UhcHm5gTu', // generated ethereal password
  //     },
  //   });

  //   await transporter.sendMail({
  //     from: `Stefan Aleksovski ${email} `, // sender address
  //     to: `${player.mail}`, // list of receivers
  //     subject: subject, // Subject line
  //     text: emailContent, // plain text body
      
  //   })

  //   // send mail with defined transport object
    

  //   // console.log("Message sent: %s", info.messageId);
  //   // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //   // // Preview only available when sending through an Ethereal account
  //   // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  //   // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...



  //   res.redirect('/players')
  // }

  const getDeleted = async (req, res) => {
      await Player.findByIdAndDelete(req.params.id);
      
      res.send({});
    
  };



module.exports = {
  getAll,
  getCreate,
  getEdit,
  create,
  update,
  // writeEmail,
  // sendMail,
  getDeleted 
}
