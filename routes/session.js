const express = require('express');

const router = express.Router();
const sessionController = require('../controllers/sessionController');

// I do not implement a signup/register service since we only going to have 1 user(the blog creator)
router.post('/login', sessionController.handleLogin);
router.get('/logout', sessionController.handleLogout);
