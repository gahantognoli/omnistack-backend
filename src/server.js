const express = require('express'); 
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

//constante que armazena toda a aplicação express;
const app = express();
const server = require('http').Server('app');
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    });
});

//conexão com o banco de dados do MongoDB Atlas
mongoose.connect('mongodb+srv://gabriel:gabriel@cluster0-bwkuj.mongodb.net/omnistack?retryWrites=true', 
{
    useNewUrlParser: true
});

//criar middleware para comunicação em real time com o usuário
app.use((req, res, next) => {
    req.io = io;
    return next();
});

//qualquer front-end acessar a aplicação publicada. Caso isso não seja feito, 
//a aplicação só poderá ser acessada por clients no mesmo domínio.
app.use(cors());

//cadastrar um módulo dentro do express
app.use(express.json());
//permite o envio de arquivos
app.use(express.urlencoded({ extended : true }))
//usar o arquivo de rotas
app.use(require('./routes'));

app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')));

app.listen(process.env.PORT || 3333);