const fs = require('fs');
const Docxtemplater = require('docxtemplater');
const path = require('path');
const JSZip = require('jszip');
const ImageModule = require('docxtemplater-image-module');

let solutions = [];
const solutionA1 = 'The entrance of the building should be located at less than 50m from the street.';
const solutionA2 = 'The entrance of the building located at less than 50m from the parking.';
const solutionA3_1 = 'There should be enough parking bays reserved for people with disabilities.';
const solutionA3_2 = 'The reserved parking bay should be located at less than 50m to the building entrance.';

exports.post = (req, res) => {
  let inputsValues = req.body;
  const MultipleImages = ['img1A', 'img1B', 'img1C', 'img1D', 'img1E'];
  let imagesPaths = {};

  MultipleImages.forEach((element, index) => {
    if (req.files[element]) {
      for (let x = 0; x < req.files[element].length; x++) {
        inputsValues[`${element}${x}`] = req.files[element][x].path;
        imagesPaths[`${element}${x}`] = req.files[element][x].path.substring(7, );
      }
    }
  });

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
    imagesPaths

  });

  solutions = [];

};
