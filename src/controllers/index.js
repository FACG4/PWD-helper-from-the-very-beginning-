const express = require('express');

const router = express.Router();
const home = require('./home');
const form = require('./form');
const analysis = require('./analysis');

router.get('/', home.get);
router.get('/form', form.get);
router.post('/analysis', analysis.post);

module.exports = router;
