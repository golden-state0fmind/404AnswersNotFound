const db = require('../models');
const express = require('express');
const passport = require('../config/ppConfig');
const router = express.Router();

router.get('/create/inquisition', (req, res) => {
     const locals = {
          title: 'Make an inquisition',
          description: null,
          // eslint-disable-next-line prettier/prettier
          style: '/css/inquisition.css',
     };
     res.render('inquire/inquisition', { meta: locals });
});

router.get('/inquiry/:id', (req, res) => {
     const locals = {
          title: req.params.id,
          description: req.body.summary,
          // eslint-disable-next-line prettier/prettier
          style: '/css/inquiry.css',
     };

     res.render('inquire/inquiry', { meta: locals });
});

module.exports = router;
