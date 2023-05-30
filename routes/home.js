const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const CSV = require('../models/csv');

router.get('/',homeController.home);
router.post('/upload',CSV.uploadedFileMiddleware,homeController.upload);
router.get('/delete/:id',homeController.delete);

module.exports = router;