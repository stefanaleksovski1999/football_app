const League = require('../models/leagues')

const getAllLeagues = async (req, res) => {

    const clubs = await League.find();

    res.send({
      error: false,
      message: 'All leagues from the database',
      leagues
    });
  };

  const getLeagueCreate = async (req, res) => {
    const league = await League.create(req.body);

    res.send({
      error: false,
      message: 'New league has been created',
      league
    });
  };

  

  const getLeaguesDeleted = async (req, res) => {

    await League.findByIdAndDelete(req.params.id);
    
    res.send({
      error: false,
      message: `League with id #${req.params.id} has been deleted`
    });
  };



module.exports = {getAllLeagues , getLeagueCreate, getLeaguesDeleted }