const express = require('express');
const app = express();
const port = 8002;

// Configuração do Knex.js para MySQL
const knex = require("knex")({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'lojapi'
    }
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});


// Importação das rotas
const categoriaRoutes = require('./Categoria');
const produtoRoutes = require('./Produto');
const cidadeRoutes = require('./Cidade');
const clienteRoutes = require('./Cliente');
const pedidoRoutes = require('./Pedido');
const pedidoProdutoRoutes = require('./PedidoProduto');

// Middleware necessário
const cors = require('cors');
const bodyParser = require('body-parser');

// Configuração de middlewares
app.use(cors()); // Habilita CORS para todas as rotas
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota de boas-vindas
app.get('/', (req, res) => {
    res.send("Bem-vindo(a) à lojAPI");
});

// Configuração das rotas
categoriaRoutes(app, knex); 
produtoRoutes(app, knex);   
cidadeRoutes(app, knex);    
clienteRoutes(app, knex);   
pedidoRoutes(app, knex);    
pedidoProdutoRoutes(app, knex); 

// Tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Erro interno no servidor!');
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
