const formidable = require('formidable');
const fs = require('fs');
const Docxtemplater = require('docxtemplater');
const path = require('path');
const JSZip = require('jszip');
const ImageModule = require('docxtemplater-image-module');

let solutions = [];
const solutionA1 = ' you have to do something for the entrance';
const solutionA2 = ' you have to do something for the entrance for A2 in checklist';

exports.post = (req, res) => {
  const form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = path.join(__dirname, '..', '..', 'public', 'images');
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    const inputsValues = fields;
    const pathLength = [files.img1A.path.split(path.sep).length - 1, files.img2A.path.split('/').length - 1, files.img1B.path.split('/').length - 1, files.img2B.path.split('/').length - 1, files.img1C.path.split('/').length - 1, files.img2C.path.split('/').length - 1, files.img1D.path.split('/').length - 1, files.img2D.path.split('/').length - 1, files.img1E.path.split('/').length - 1, files.img2E.path.split('/').length - 1];
    const imagesNames = [files.img1A.path.split('/')[pathLength[0]], files.img2A.path.split('/')[pathLength[1]], files.img1B.path.split('/')[pathLength[2]], files.img2B.path.split('/')[pathLength[3]], files.img1C.path.split('/')[pathLength[4]], files.img2C.path.split('/')[pathLength[5]], files.img1D.path.split('/')[pathLength[6]], files.img2D.path.split('/')[pathLength[7]], files.img1E.path.split('/')[pathLength[8]], files.img2E.path.split('/')[pathLength[9]]];
    const imagesSizes = [files.img1A.size, files.img2A.size, files.img1B.size, files.img2B.size, files.img1C.size, files.img2C.size, files.img1D.size, files.img2D.size, files.img1E.size, files.img2E.size];
    const solutionsForWordFile = ['sol1', 'sol2']; // supposed to contain solutions for every single question!!
    const inputValuesObjectImages = ['img1A', 'img2A', 'img1B', 'img2B', 'img1C', 'img2C', 'img1D', 'img2D', 'img1E', 'img2E'];
    const inputValuesObjectImagesSizes = ['img1Asize', 'img2Asize', 'img1Bsize', 'img2Bsize', 'img1Csize', 'img2Csize', 'img1Dsize', 'img2Dsize', 'img1Esize', 'img2Esize'];

    for (let j = 0; j < 10; j++) {
      inputsValues[inputValuesObjectImages[j]] = path.join(__dirname, '..', '..', 'public', 'images', imagesNames[j]);
    }
    for (let j = 0; j < 10; j++) {
      inputsValues[inputValuesObjectImagesSizes[j]] = imagesSizes[j];
    }
    if (fields.A1 === 'No') {
      solutions.push(`Solution for A1${solutionA1}`);
      inputsValues.sol1 = solutionA1;
    }
    if (fields.A2 === 'No') {
      solutions.push(`Solution for A2${solutionA1}`);
      inputsValues.sol2 = solutionA2;
    }

    const content = fs
      .readFileSync(path.join(__dirname, 'template.docx'), 'binary');
    const opts = {};
    opts.centered = false;
    opts.getImage = function(tagValue, tagName) {
      return fs.readFileSync(tagValue);
    };

    opts.getSize = function(img, tagValue, tagName) {
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
      img1A: `images/${imagesNames[0]}`,
      img1Asize: files.img1A.size,

      img2A: `images/${imagesNames[1]}`,
      img2Asize: files.img2A.size,

      img1B: `images/${imagesNames[2]}`,
      img1Bsize: files.img1B.size,

      img2B: `images/${imagesNames[3]}`,
      img2Bsize: files.img2B.size,

      img1C: `images/${imagesNames[4]}`,
      img1Csize: files.img1C.size,

      img2C: `images/${imagesNames[5]}`,
      img2Csize: files.img2C.size,

      img1D: `images/${imagesNames[6]}`,
      img1Dsize: files.img1D.size,

      img2D: `images/${imagesNames[7]}`,
      img2Dsize: files.img2D.size,

      img1E: `images/${imagesNames[8]}`,
      img1Esize: files.img1E.size,

      img2E: `images/${imagesNames[9]}`,
      img2Esize: files.img2E.size,
      status: true,
    });

    solutions = [];
  });
};
