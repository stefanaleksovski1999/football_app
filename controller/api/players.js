
// const mongoose = require('mongoose');
const Player = require('../../models/player')

const getAll = async (req, res) => {
    if (req.query.first_name && req.query.last_name) {
      const players = await Player.find({
        first_name: req.query.first_name,
        last_name: req.query.last_name
      }).populate('club')

      res.send({
        error: false,
        message: `All players with first name ${req.query.first_name} and last name ${req.query.last_name}`,
        players: players
      });
      return;
    }

    const players = await Player.find();

    res.send({
      error: false,
      message: 'All players from the database',
      players: players
    });
  };

  const getAllWithId = async (req, res) => {
    const player = await Player.findById(req.params.id);

    res.send({
      error: false,
      message: 
        `Player with id #${employee._id}, 
        named ${employee.first_name} ${employee.last_name}, has been fetched`,
      player: player
    });
  };

  const getClub = async (req, res) => {
    const player = await Player.findById(req.params.id).populate('club');

    res.send({
      error: false,
      message: `Club of player with id ${employee.id} has been fetched`,
      club: player.club
      
    })
  }

  const create = async (req, res) => {
    const player = await Player.create(req.body);

    res.send({
      error: false,
      message: 'New player has been created',
      player: player
    });
  };

  const update = async (req, res) => {
    await Player.findByIdAndUpdate(req.params.id, req.body);
    const player = await Player.findById(req.params.id);

    res.send({
      error: false,
      message: `Employee with id #${employee._id} has been updated`,
      employee: employee
    });
  };

  const getDeleted = async (req, res) => {
    await Player.findByIdAndDelete(req.params.id);
    
    res.send({
      error: false,
      message: `Plyers with id #${req.params.id} has been deleted`
    });
  };



module.exports = {
  getAll,
  getAllWithId,
  getClub,
  create,
  update,
  getDeleted }
