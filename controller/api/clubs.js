const Club = require('../../models/club')

const getAll = async (req, res) => {

   req.render('companies/index', { companies });
    
  };

  const create = async (req, res) => {
    const club = await Club.create(req.body);

    res.send({
      error: false,
      message: 'New club has been created',
      club
    });
  };

  const update = async (req, res) => {
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

  const getDeleted = async (req, res) => {

    await Club.findByIdAndDelete(req.params.id);
    
    res.send({
      error: false,
      message: `Club with id #${req.params.id} has been deleted`
    });
  };



module.exports = {
  getAll,
  create,
  update,
  getDeleted 
}