const knex = require("knex")({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'lojapi'
    }
});

const produtoRoutes = require('./Produto');
const categoriaRoutes = require('./Categoria');
const cidadeRoutes = require('./Cidade');
const clienteRoutes = require('./Cliente');
const pedidoRoutes = require('./Pedido');
const pedidoProdutoRoutes = require('./PedidoProduto');

const restify = require("restify");
const errors = require("restify-errors");
const fs = require('fs');

const server = restify.createServer({
    name: 'lojapi',
    version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(8001, function() {
    console.log("%s executando em %s", server.name, server.url);
});

server.get('/', (req, res, next) => {
    res.send("Bem-vindo(a) à lojAPI");
});

categoriaRoutes(server, knex, errors);

produtoRoutes(server, knex, errors);

cidadeRoutes(server, knex, errors);

clienteRoutes(server, knex, errors);

pedidoRoutes(server, knex, errors);

pedidoProdutoRoutes(server, knex, errors);







