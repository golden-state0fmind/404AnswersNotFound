/* eslint-disable prettier/prettier */
const db = require('../models');
const express = require('express');
const passport = require('../config/ppConfig.js');
const router = express.Router();

router.use(passport.initialize());
router.use(passport.session());
router.use(
     express.urlencoded({
          extended: false,
     })
);
router.use((req, res, next) => {
     res.locals.alerts = req.flash();
     res.locals.currentUser = req.user;
     next();
});
//POST saving question into db
router.post('/create/inquisition', (req, res) => {
     // Should redirect to the /inquiry/:id route below, showing the newly created inquisition.
     db.question
          .create({
               createdBy: req.user.dataValues.username,
               summary: req.body.summary,
               content: req.body.content,
          })
          .then(question => {
               res.redirect('/');
               // res.redirect(`inquire/inquiry/${req.body.id}`);
          })
          .catch(err => {
               console.log(err);
               db.bug.create({
                    error: `${err}`,
                    location: 'create_inquisition_route',
                    activity: `Creating inquisition`,
                    user: req.user.dataValues.username,
                    status: 'Untracked',
               });
          });
});

router.get('/create/inquisition', (req, res) => {
     const locals = {
          title: 'Make an inquisition',
          description: null,
          // eslint-disable-next-line prettier/prettier
          style: '/css/inquisition.css',
     };
     res.render('inquire/inquisition', { meta: locals });
});

router.put('/:idx', (req, res) => {
     db.question.update(
          {
               summary: req.body.summary,
               content: req.body.content,
          },
          {
               where: {
                    id: req.params.idx,
               },
          }
     );

     res.redirect(`/`);
});

router.delete('/:id', (req, res) => {
     db.question
          .destroy({
               where: {
                    id: req.params.id,
               },
          })
          .catch(err => {
               console.log(err);
               db.bug.create({
                    error: `${err}`,
                    location: 'Inquisition_delete_route',
                    activity: `Deleting inquisition ID ${req.params.id}`,
                    user: req.user.dataValues.username,
                    status: 'Untracked',
               });
          });

     res.redirect('/');
});

router.get('/inquiry/:id', (req, res) => {
     const locals = {
          title: req.params.id,
          description: req.body.summary,
          style: '/css/inquiry.css',
          userIsLoggedIn: false,
          loggedInUser: null,
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
               query = question;
               if (
                    req.user &&
                    req.user.dataValues.username ==
                         question.dataValues.createdBy
               ) {
                    locals.loggedInUser = req.user.dataValues.username;
                    locals.userIsLoggedIn = true;
               } else {
                    console.log('Nope.');
                    locals.userIsLoggedIn = false;
               }

               db.answer
                    .findAll({
                         where: {
                              QID: req.params.id,
                         },
                    })
                    .then(answer => {
                         answer.forEach(el => {
                              if (
                                   req.user &&
                                   req.user.dataValues.username ==
                                        el.dataValues.createdBy
                              ) {
                                   locals.userIsLoggedIn = true;
                              } else {
                                   console.log('Nope.');
                                   locals.userIsLoggedIn = false;
                              }
                         });
                         queryRes = answer;
                         res.render('inquire/inquiry', {
                              meta: locals,
                              data: query,
                              data2: queryRes,
                         });
                    })
                    .catch(err => {
                         console.log(err);
                         db.bug.create({
                              error: `${err}`,
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
     res.render('inquiries', { meta: locals });
});

module.exports = router;
