'use strict';
require('dotenv').config();

const {PORT, Server, app, cors, http} =require('./config');
const queue = require('./message-queue');

server.listen(PORT,() => {
    console.log('Server is listening on PORT: ', PORT);
});