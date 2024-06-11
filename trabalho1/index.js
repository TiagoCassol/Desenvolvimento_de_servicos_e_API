const knex = require("knex")({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'lojapi'
    }
});
const restify = require("restify");
const errors = require("restify-errors");

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

server.get('/categorias', (req, res, next) => {
    knex('categorias').then((dados) => {
        res.send(dados);
    }, next);
});

server.get('/categorias/:id', (req, res, next) => {
    const idCat = req.params.id;
    knex('categorias')
        .where('id', idCat)
        .first()
        .then((dados) => {
            if (!dados || dados == "") {
                return res.send(
                    new errors.BadRequestError('Categoria não encontrado')
                );
            }
            res.send(dados);
        }, next);
});

server.post('/categorias', (req, res, next) => { // Mudança de 'get' para 'post'
    knex('categorias')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next);
});

server.put('/categorias/:id', (req, res, next) => {
    const idCat = req.params.id;
    knex('categorias')
        .where('id', idCat)
        .update(req.body)
        .then((dados) => {
            if (!dados || dados == "") {
                return res.send(
                    new errors.BadRequestError('Categoria não encontrado')
                );
            }
            res.send("Categoria atualizado");
        }, next);
});

server.del('/categorias/:id', (req, res, next) => {
    const idCat = req.params.id;
    knex('categorias')
        .where('id', idCat)
        .delete()
        .then((dados) => {
            if (!dados || dados == "") {
                return res.send(
                    new errors.BadRequestError('Produto não encontrado')
                );
            }
            res.send("produto excluido");
        }, next);
});

server.get('/produtos', (req, res, next) => {
    knex('produtos').then((dados) => {
        res.send(dados);
    }, next);
});

server.get('/produtos/:id', (req, res, next) => {
    const idProd = req.params.id;
    knex('produtos')
        .where('id', idProd)
        .first()
        .then((dados) => {
            if (!dados || dados == "") {
                return res.send(
                    new errors.BadRequestError('Produto não encontrado')
                );
            }
            res.send(dados);
        }, next);
});

server.post('/produtos', (req, res, next) => {
    knex('produtos')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next);
});

server.put('/produtos/:id', (req, res, next) => {
    const idProd = req.params.id;
    knex('produtos')
        .where('id', idProd)
        .update(req.body)
        .then((dados) => {
            if (!dados || dados == "") {
                return res.send(
                    new errors.BadRequestError('Produto não encontrado')
                );
            }
            res.send("Produto atualizado");
        }, next);
});

server.del('/produtos/:id', (req, res, next) => {
    const idProd = req.params.id;
    knex('produtos')
        .where('id', idProd)
        .delete()
        .then((dados) => {
            if (!dados || dados == "") {
                return res.send(
                    new errors.BadRequestError('Produto não encontrado')
                );
            }
            res.send("produto excluido");
        }, next);
});

