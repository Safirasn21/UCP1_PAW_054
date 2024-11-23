// route-app.js
const router = require('express').Router();
const homeController = require('../controllers/controller-home').home;
const profileController = require('../controllers/controller-profile').profile;
const verifyUser = require('../configs/verify');
const contactController = require('../controllers/controller-pupuk').contact;

router.get('/', verifyUser.isLogin, homeController.home);
router.get('/pupuk', verifyUser.isLogin, contactController.getContact);
router.get('/profile', verifyUser.isLogin, profileController.profile);

module.exports = router;
