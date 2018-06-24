const formidable = require('formidable');
const fs = require('fs');
const Docxtemplater = require('docxtemplater');
const path = require('path');
const JSZip = require('jszip');
const ImageModule = require('docxtemplater-image-module');

const solutions = [];
const solutinA1 = ' you have to do something for the entrance';

exports.post = (req, res) => {
  const form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = path.join(__dirname, '..', '..', 'public', 'images');
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    const oldpath = files.img1.path;
    const newpath = `${form.uploadDir}/${files.img1.name}`;

    if (fields.A1 === 'No') {
      solutions.push(`Solution for A1${solutinA1}`);
    }
    if (fields.A2 === 'No') {
      solutions.push(`Solution for A2${solutinA1}`);
    }
    const inputsValues = fields;
    inputsValues.img1 = path.join(__dirname, '..', '..', 'public', 'images', files.img1.path.split('/')[6]);
    inputsValues.img2 = path.join(__dirname, '..', '..', 'public', 'images', files.img2.path.split('/')[6]);
    inputsValues.img1B = path.join(__dirname, '..', '..', 'public', 'images', files.img1B.path.split('/')[6]);
    inputsValues.img2B = path.join(__dirname, '..', '..', 'public', 'images', files.img2B.path.split('/')[6]);
    inputsValues.img1C = path.join(__dirname, '..', '..', 'public', 'images', files.img1C.path.split('/')[6]);
    inputsValues.img2C = path.join(__dirname, '..', '..', 'public', 'images', files.img2C.path.split('/')[6]);
    inputsValues.img1D = path.join(__dirname, '..', '..', 'public', 'images', files.img1D.path.split('/')[6]);
    inputsValues.img2D = path.join(__dirname, '..', '..', 'public', 'images', files.img2D.path.split('/')[6]);
    inputsValues.img1E = path.join(__dirname, '..', '..', 'public', 'images', files.img1E.path.split('/')[6]);
    inputsValues.img2E = path.join(__dirname, '..', '..', 'public', 'images', files.img2E.path.split('/')[6]);
    const content = fs
      .readFileSync(path.join(__dirname, 'template.docx'), 'binary');
    const opts = {};
    opts.centered = false;
    opts.getImage = function (tagValue, tagName) {
      return fs.readFileSync(tagValue);
    };

    opts.getSize = function (img, tagValue, tagName) {
      return [150, 150];
    };

    const imageModule = new ImageModule(opts);
    const zip = new JSZip(content);
    const doc = new Docxtemplater().attachModule(imageModule).loadZip(zip).setData(inputsValues)
      .render();

    try {
      doc.render();
    } catch (err) {
      return res.status(500).json({
        failed: true,
      });
    }

    const buf = doc.getZip()
      .generate({
        type: 'nodebuffer',
      });

    const filePath = path.join(__dirname, '..', '..', 'public', 'form.docx');

    fs.writeFileSync(filePath, buf);

    res.render('analysis', {
      fields,
      solutions,
      img1: `${oldpath.split('/')[5]}/${newpath.split('/')[6]}`,
      img2: `${files.img2.path.split('/')[5]}/${files.img2.path.split('/')[6]}`,
      status: true,
    });
  });
};
