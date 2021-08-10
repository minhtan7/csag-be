const express = require('express');
const formController = require('../controllers/form.controller');
const authMiddleware = require('../middlewares/authentication');

const router = express.Router();

/**
 * @route POST api/form/
 * @description Create item
 * @access Public
 *
 */
router.post('/', authMiddleware.loginRequired, formController.createForm);

/**
 * @route GET api/form/matching
 * @description get matched forms
 * @access giver
 *
 */
router.get('/matching/:id', authMiddleware.loginRequired, formController.matchingReceiver);
/**
 * @route GET api/form/:id
 * @description get form by id
 * @access giver
 *
 */
router.get('/user/:id', formController.getFormByUser);

router.get('/:id', authMiddleware.loginRequired, formController.getSingleForm);

module.exports = router;
