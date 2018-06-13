
const formidable = require('formidable');
const fs = require('fs');

exports.post = (req, res) => {
  const form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = '/home/israa/Desktop/PWD-helpers/public/images';
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    const oldpath = files.img1.path;
    const newpath = `${form.uploadDir}/${files.img1.name}`;

    fs.rename(oldpath, newpath, () => {
      if (err) throw err;
      const solutions = [];
      const solutinA1 = ' you have to do something for the entrance';
      if (fields.A1 === 'No') {
        solutions.push(`Solution for A1${solutinA1}`);
      }
      if (fields.A2 === 'No') {
        solutions.push(`Solution for A2${solutinA1}`);
      }
      res.render('analysis', {
        solutions,
        img1: `${oldpath.split('/')[6]}/${newpath.split('/')[7]}`,
        img2: `${files.img2.path.split('/')[6]}/${files.img2.path.split('/')[7]}`,
      });
    });
  });
};

// exports.get = (req, res)=>{

//   res.render('fileupload');
// for uploading images!!!!!!
//   var form = new formidable.IncomingForm();
// form.encoding = 'utf-8';
// form.uploadDir = __dirname + "/images";
// form.keepExtensions = true;
//   form.parse(req, function (err, fields, files) {
// var oldpath = files.filetoupload.path;
// var newpath = '/home/israa/PWD-helpers/src/controllers/images/' + files.filetoupload.name;
// fs.rename(oldpath, newpath, function (err) {
//       if (err) throw err;
//       res.render('fileupload')
//     });
// });
// res.send(req.body);
// if(req.body['B.2']==='No'){
// }
// }
