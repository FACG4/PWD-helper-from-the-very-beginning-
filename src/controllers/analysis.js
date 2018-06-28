const fs = require('fs');
const Docxtemplater = require('docxtemplater');
const path = require('path');
const JSZip = require('jszip');
const ImageModule = require('docxtemplater-image-module');

let solutions = [];
const solutionA1 = ' you have to do something for the entrance';
const solutionA2 = ' you have to do something for the entrance for A2 in checklist';

exports.post = (req, res) => {
  let inputsValues=req.body;

  console.log('req.body:',req.body);
  if(req.files.img1A) {
    for(let i=0; i<req.files.img1A.length; i++){
      inputsValues[`img1A${i}`]=req.files.img1A[i].path;
    }
  }
  if (req.files.img1B) {
    for(let i=0; i<req.files.img1B.length; i++){
      inputsValues[`img1B${i}`]=req.files.img1B[i].path;
    }
  }
  console.log(inputsValues);
  if (req.files.img1C) {
    for(let i=0; i<req.files.img1C.length; i++){
      inputsValues[`img1C${i}`]=req.files.img1C[i].path;
    }
  }
  if (req.files.img1D) {
    for(let i=0; i<req.files.img1D.length; i++){
      inputsValues[`img1D${i}`]=req.files.img1D[i].path;
    }
  }
  if (req.files.img1E) {
    for(let i=0; i<req.files.img1E.length; i++){
      inputsValues[`img1E${i}`]=req.files.img1E[i].path;
    }
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

      status: true,
    });

    solutions = [];

};
