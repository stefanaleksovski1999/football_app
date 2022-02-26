 const Club = require('../models/club')
 var PDFPrinter = require('pdfmake');
 const nodemailer = require('nodemailer');


const getAll = async (req, res) => {
  const clubs = await Club.find();

   res.render('clubs/index', { clubs });
    
  };

  const create = async (req, res) => {
    res.render('clubs/create');
  };

  const getEdit = async (req, res) => {
    const club = await Club.findById(req.params.id);

    res.render('clubs/edit', { club });
  };
  const print = async (req, res) => {

    const club = await Club.findById(req.params.id).populate('players');

    var fonts = {
      Roboto: {
            normal: 'fonts/Roboto-Regular.ttf',
            bold: 'fonts/Roboto-Medium.ttf',
            italics: 'fonts/Roboto-Italic.ttf',
            bolditalics: 'fonts/Roboto-MediumItalic.ttf'
      }
    };

    const printer = new PDFPrinter(fonts);
    var fs = require('fs');

    let pdfBody = [['Name', 'Position']];

    club.players.forEach(player => {
      pdfBody.push([`${player.first_name} ${player.last_name}`, player.position])
    })
  
    var docDefinition = {
          content: [
                { text: `Club with id #${club._id}` },
                { text: `Club name: ${club.name}` },
                `Club country: ${club.county}`,
                'Players:',
                {
                      table: {
                            body: pdfBody
                      }
                }
          ]
    };
  
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream('tables.pdf'));
    pdfDoc.end();
  
    res.redirect(`/clubs/${club._id}/view`);

  }

  const getView = async (req, res) => {
    const club = await Club.findById(req.params.id).populate('players');
    console.log(club);
    res.render('clubs/view', { club });
  };

  const postCreate = async (req, res) => {
    console.log(req.body);
    await Club.create(req.body);
  
    res.redirect('/clubs');
  };

  

  const update = async (req, res) => {
    await Club.findByIdAndUpdate(req.params.id, req.body);
  
    res.redirect('/clubs');
  };
  
  const destroy = async (req, res) => {
    await Club.findByIdAndDelete(req.params.id);
  
    res.status(200).send({});
  };
  
module.exports = {
  getAll,
  create,
  update,
  getEdit,
  print,
  getView,
  postCreate,
  destroy
}