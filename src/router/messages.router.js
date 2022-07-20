const { Router } = require('express');
const messageController = require('../controller/message.controller')
const messageRouter = Router();

messageRouter.get('/', messageController.getAllMessages);
messageRouter.post('/', messageController.createMessage);

module.exports = messageRouter;

