
// const mongoose = require('mongoose');
const Player = require('../models/player');
const Agent = require('../models/agent');

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
      const agents = await Agent.find({
        first_name: req.query.first_name,
        last_name: req.query.last_name
      });

     
      res.render('agents/index', { agents });
      return;
    }

    const agents = await Agent.find();

    res.render('agents/index', { agents });
   
  };

  const getCreate = async (req, res) => {
    
    res.render('agents/create');
  };

  const getEdit = async (req, res) => {
    const agent = await Agent.findById(req.params.id);

    res.render('agents/edit', { agent });
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
    if (req.body.player == '') {
      req.body.player = null;
    }
    
    await Agent.create(req.body);

    res.redirect('/agents');
  };

  const getView = async (req, res) => {
    const agent = await Agent.findById(req.params.id).populate('players');
    console.log(agent);
    res.render('agents/view')
  }

  const update = async (req, res) => {
    if (req.body.agent == '') {
      req.body.agent = null;
    }

    const agent = await Agent.findByIdAndUpdate(req.params.id, req.body);

    if(req.body.player) {
      await Player.findByIdAndUpdate(req.body.player, {
        $push: {agents: agent}
      });
    }

    res.redirect('/agents');
  };

  const getDeleted = async (req, res) => {
      await Agent.findByIdAndDelete(req.params.id);
      
      res.send({});
    
  };



module.exports = {
  getAll,
  getCreate,
  getEdit,
  create,
  update,
  getView,
  getDeleted 
}



   