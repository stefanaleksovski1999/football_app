const Club = require('../models/club')

const getAllClubs = async (req, res) => {

    const clubs = await Club.find();

    res.send({
      error: false,
      message: 'All clubs from the database',
      clubs
    });
  };

  const getClubCreate = async (req, res) => {
    const club = await Club.create(req.body);

    res.send({
      error: false,
      message: 'New club has been created',
      club
    });
  };

  const getClubUpdate = async (req, res) => {
    await Club.findByIdAndUpdate(
       req.params.id,
         { $push: { player: req.body.player} },
       req.body);
    const club = await Club.findById(req.params.id);

    res.send({
      error: false,
      message: `Club with id #${club._id} has been updated`,
      club
    });
  };

  const getClubsDeleted = async (req, res) => {

    await Club.findByIdAndDelete(req.params.id);
    
    res.send({
      error: false,
      message: `Club with id #${req.params.id} has been deleted`
    });
  };



module.exports = {
  getAllClubs,
  getClubCreate,
  getClubUpdate,
  getClubsDeleted 
}