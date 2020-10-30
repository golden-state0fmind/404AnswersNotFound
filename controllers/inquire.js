const db = require('../models');
const express = require('express');
const passport = require('../config/ppConfig');
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

router.get('/create/inquisition', (req, res) => {
     const locals = {
          title: 'Make an inquisition',
          description: null,
          // eslint-disable-next-line prettier/prettier
          style: '/css/inquisition.css',
     };
     res.render('inquire/inquisition', { meta: locals });
});

router.put('/:id', (req, res) => {
     db.question.update(
          {
               summary: req.body.summary,
               content: req.body.content,
          },
          {
               where: {
                    id: req.params.id,
               },
          }
     );
     res.redirect(`/inquiry/${req.params.id}`);
});

router.get('/inquiry/:id', (req, res) => {
     const locals = {
          title: req.params.id,
          description: req.body.summary,
          style: '/css/inquiry.css',
          userIsLoggedIn: false,
          loggedInUser: null,
     };
     console.log(req.user);

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

router.get('/inquiries', (req, res) => {
     res.render('inquire/inquiries');
});

module.exports = router;
