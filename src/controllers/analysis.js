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
    if (fields.A1 === 'No') {
      solutions.push(`Solution for A1${solutinA1}`);
    }
    if (fields.A2 === 'No') {
      solutions.push(`Solution for A2${solutinA1}`);
    }
    const inputsValues = fields;
    const imagesNames = [files.img1.path.split('/')[6], files.img2.path.split('/')[6], files.img1B.path.split('/')[6], files.img2B.path.split('/')[6], files.img1C.path.split('/')[6], files.img2C.path.split('/')[6], files.img1D.path.split('/')[6], files.img2D.path.split('/')[6], files.img1E.path.split('/')[6], files.img2E.path.split('/')[6]];
    const inputValuesObjectImages = ['img1', 'img2', 'img1B', 'img2B', 'img1C', 'img2C', 'img1D', 'img2D', 'img1E', 'img2E'];

    for (let j = 0; j < 10; j++) {
      inputsValues[inputValuesObjectImages[j]] = path.join(__dirname, '..', '..', 'public', 'images', imagesNames[j]);
    }

    const content = fs
      .readFileSync(path.join(__dirname, 'template.docx'), 'binary');
    const opts = {};
    opts.centered = false;
    opts.getImage = function (tagValue, tagName) {
      return fs.readFileSync(tagValue);
    };

    opts.getSize = function (img, tagValue, tagName) {
      return [200, 200];
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
      img1A: `${files.img1.path.split('/')[5]}/${imagesNames[0]}`,
      img2A: `${files.img2.path.split('/')[5]}/${imagesNames[1]}`,
      img1B: `${files.img1B.path.split('/')[5]}/${imagesNames[2]}`,
      img2B: `${files.img2B.path.split('/')[5]}/${imagesNames[3]}`,
      img1C: `${files.img1C.path.split('/')[5]}/${imagesNames[4]}`,
      img2C: `${files.img2C.path.split('/')[5]}/${imagesNames[5]}`,
      img1D: `${files.img1D.path.split('/')[5]}/${imagesNames[6]}`,
      img2D: `${files.img2D.path.split('/')[5]}/${imagesNames[7]}`,
      img1E: `${files.img1E.path.split('/')[5]}/${imagesNames[8]}`,
      img2E: `${files.img2E.path.split('/')[5]}/${imagesNames[9]}`,
      status: true,
    });
  });
};
