const express = require('express');
const axios = require('axios');
const http = require('http');
const {Server} = require('socket.io')
const routerProducts = require('./src/router/products.router');
const messageRouter = require('./src/router/messages.router');



//Express
const app = express();
const PORT = process.env.PORT || 8080;

app.set('views', './public/views')
app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(__dirname + '/public'))


//Socket server
const server = http.createServer(app);
const io = new Server(server);


app.get('/', (req, res) => {
    res.render('index')
})

app.use('/products', routerProducts);
app.use('/messages', messageRouter);


io.on('connection', socket => {
    console.log('Desde server');

    socket.on('createProduct', product => {
        axios({
            method: 'post',
            url:'/products', 
            baseURL: 'http://localhost:8080', 
            data: product 
        })
        .then((response) => {
            if (response.status === 200) {
                io.sockets.emit('refreshProductList', [response.data.product]);
            } else {
                console.log('Fail');
            }
        })
        .catch((e) => console.error(e));
    })

    socket.on('saveMessage', message => {
        axios({
            method: 'post',
            url:'/messages', 
            baseURL: 'http://localhost:8080', 
            data: message
        })
        .then((response) => {
            if (response.status === 200) {
                io.sockets.emit('refreshChat', [response.data.message]);
            } else {
                console.log('Fail');
            }
        })
        .catch((e) => console.error(e));
    })
});

server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
server.on('error', (error) => console.error(error));
