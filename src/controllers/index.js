const express = require('express');
const fs = require('fs');
const Docxtemplater = require('docxtemplater');
const path = require('path');
const JSZip = require('jszip');
const brreg = require('brreg')


const router = express.Router();
const home = require('./home');
const form = require('./form');
const analysis = require('./analysis');

router.get('/', home.get);
router.get('/form', form.get);
router.post('/analysis', analysis.post);
// router.get('/analysis', analysis.sendMail);

router.post('/formToDocx', (req, res) => {
  const inputsValues = req.body
  const content = fs
    .readFileSync(path.join(__dirname, 'template.docx'), "binary");

  const zip = new JSZip(content);
  const doc = new Docxtemplater().loadZip(zip)

  doc.setData(inputsValues);

  try {
    doc.render()
  } catch (err) {
    return res.status(500).json({
      failed: true
    });
  }

  const buf = doc.getZip()
    .generate({
      type: "nodebuffer"
    });

  const fileName = "form.docx";
  const filePath = path.join(__dirname, '..', '..', 'public', 'form.docx');

  fs.writeFileSync(filePath, buf);

  return res.json({
    status: true
  });
});

module.exports = router;
