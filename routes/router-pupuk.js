// route-contact.js
const router = require('express').Router();
const pupukController = require('../controllers').pupuk;
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, contactController.getContact);
router.get('/pupuk/add', verifyUser.isLogin, contactController.formContact);
router.post('/pupuk/save', verifyUser.isLogin, contactController.saveContact);
router.get('/pupuk/edit/:id', verifyUser.isLogin, contactController.editContact);
router.post('/pupuk/update/:id', verifyUser.isLogin, contactController.updateContact);
router.get('/pupuk/delete/:id', verifyUser.isLogin, contactController.deleteContact);

module.exports = router;
