const fs = require('fs');

module.exports = (server, knex, errors) => {
    server.get('/produtos', (req, res, next) => {
        knex('produtos')
            .join("categorias", "produtos.categoria_id", "=", "categorias.id")
            .select("produtos.id", "produtos.nome", "produtos.preco", "categorias.nome AS cat")
            .then((dados) => {
                res.send(dados);
            }, next);
    });

    server.get('/produtos/:id', (req, res, next) => {
        const idPro = req.params.id;
        knex('produtos')
            .join("categorias", "produtos.categoria_id", "=", "categorias.id")
            .select("produtos.id", "produtos.nome", "produtos.preco", "categorias.nome AS cat")
            .where('produtos.id', idPro)
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
                res.send("Produto excluído");
            }, next);
    });
};


