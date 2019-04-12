const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

//rotas do express
const routes = express.Router();

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

/*
    req: representa a requisição. Dados da requisição feita pelo cliente.
    res: resposta do servidor.
*/
routes.post('/boxes', BoxController.store);
routes.get('/boxes/:id', BoxController.show);
routes.post('/boxes/:id/files', multer(multerConfig).single('file'), FileController.store);

//exportar algo do arquivo "para fora". Geralmente um único module.exports por arquivo.
module.exports = routes;
