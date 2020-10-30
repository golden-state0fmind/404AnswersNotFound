/* eslint-disable prettier/prettier */
const db = require('../models');
const express = require('express');
const passport = require('../config/ppConfig.js');
const router = express.Router();

//POST saving question into db
router.post('/create/inquisition', (req, res) => {
     // Should redirect to the /inquiry/:id route below, showing the newly created inquisition.
     db.question.create({
          createdBY: req.user.dataValues.id,
          summary: req.body.summary,
          content: req.body.content,
     }).then((question) => {
          res.redirect('/')
          // res.redirect(`inquire/inquiry/${req.body.id}`);
     }).catch(err => {

     })
});
//GET for creating inquisitons
router.get('/create/inquisition', (req, res) => {
     const locals = {
          title: 'Make an inquisition',
          description: null,
          // eslint-disable-next-line prettier/prettier
          style: '/css/inquisition.css',
     };
     res.render('inquire/inquisition', { meta: locals });
});

router.get('/inquiries', (req, res) => {
     res.render('inquire/inquiries');
});
// GET route for  
router.get('/inquiry/:id', (req, res) => {
     const locals = {
          title: req.params.id,
          description: req.body.summary,
          style: '/css/inquiry.css',
     };
     let query;
     let queryRes;
     db.question
          .findOne({
               where: {
                    id: req.params.id,
               },
          })
          .then(question => {
               let query = question;
               db.answer
                    .findAll({
                         where: {
                              QID: req.params.id,
                         },
                    })
                    .then(answer => {
                         queryRes = answer;
                         res.render('inquire/inquiry', {
                              meta: locals,
                              data: query,
                              data2: queryRes,
                         });
                    })
                    .catch(err => {
                         db.bug.create({
                              error: err,
                              location: 'Inquiry_route',
                              activity: `Querying for answers to inquiry ID ${req.params.id}`,
                              user: req.user.dataValues.username,
                              status: 'Untracked',
                         });
                    })
                    .catch(err => {
                         db.bug.create({
                              error: err,
                              location: 'Inquiry_route',
                              activity: `Querying inquiry ID ${req.params.id}`,
                              user: req.user.dataValues.username,
                              status: 'Untracked',
                         });
                    });
          });
});
//Home route
router.get('/', (req, res) => {
     const locals = {
          summary: req.body.summary,
          content: req.body.content,
          style: '/css/inquisition.css',
     };
     res.render('inquiries', { meta: locals })
})

module.exports = router;
