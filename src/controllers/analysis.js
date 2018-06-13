
const formidable = require('formidable');
const fs = require('fs');

exports.post = (req, res) => {
  const form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = '/home/israa/PWD-helper-from-the-very-beginning-/public/images';
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
        img1: `${oldpath.split('/')[5]}/${newpath.split('/')[6]}`,
        img2: `${files.img2.path.split('/')[5]}/${files.img2.path.split('/')[6]}`,
      });
    });
  });
};
