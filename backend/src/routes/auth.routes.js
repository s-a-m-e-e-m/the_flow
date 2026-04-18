const express = require('express');
const { registerUserController, loginUserController, logoutUserController, getMeController } = require('../controllers/auth.controller');
const { authUser } = require('../middleware/auth.middleware');

const authRouter = express.Router(); 

authRouter.post('/register', registerUserController)
authRouter.post('/login', loginUserController);
authRouter.delete('/logout', logoutUserController);
authRouter.get('/get-me', authUser, getMeController);

module.exports = authRouter;