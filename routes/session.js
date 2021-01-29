const express = require('express');

const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.post('/login', sessionController.handleLogin);
router.get('/logout', sessionController.handleLogout);
router.post('/register', sessionController.handleRegister);

module.exports = router;
