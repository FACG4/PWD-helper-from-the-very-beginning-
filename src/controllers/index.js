const express = require('express');
const multer = require('multer');
const upload = multer({
  dest: 'public/images/'
});

const router = express.Router();

const home = require('./home');
const cool = require('./cool');
const form = require('./form');
const analysis = require('./analysis');
const multiUpload = upload.fields([{
  name: 'img1A',
  maxCount: 10
}, {
  name: 'img1B',
  maxCount: 10
}, {
  name: 'img1D',
  maxCount: 10
}, {
  name: 'img1C',
  maxCount: 10
}, {
  name: 'img1E',
  maxCount: 10
}])

router.get('/', home.get);
router.get('/cool', cool.get);
router.get('/form', form.get);
router.post('/analysis', multiUpload, analysis.post);
module.exports = router;
