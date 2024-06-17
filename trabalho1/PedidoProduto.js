const fs = require('fs');

module.exports = (server, knex, errors) => {
   
    server.get('/pedidos_produtos', (req, res, next) => {
        knex('pedidos_produtos')
            .join("pedidos", "pedidos_produtos.pedido_id", "=", "pedidos.id")
            .join("produtos", "pedidos_produtos.produto_id", "=", "produtos.id")
            .select(
                "pedidos_produtos.pedido_id",
                "pedidos_produtos.produto_id",
                "pedidos_produtos.preco",
                "pedidos_produtos.quantidade",
                "pedidos.horario AS pedido_horario",
                "produtos.nome AS produto_nome"
            )
            .then((dados) => {
                res.send(dados);
            }, next);
    });

    server.get('/pedidos_produtos/:pedido_id/:produto_id', (req, res, next) => {
        const pedidoId = req.params.pedido_id;
        const produtoId = req.params.produto_id;

        knex('pedidos_produtos')
            .join("pedidos", "pedidos_produtos.pedido_id", "=", "pedidos.id")
            .join("produtos", "pedidos_produtos.produto_id", "=", "produtos.id")
            .select(
                "pedidos_produtos.pedido_id",
                "pedidos_produtos.produto_id",
                "pedidos_produtos.preco",
                "pedidos_produtos.quantidade",
                "pedidos.horario AS pedido_horario",
                "produtos.nome AS produto_nome"
            )
            .where({ 'pedidos_produtos.pedido_id': pedidoId, 'pedidos_produtos.produto_id': produtoId })
            .first()
            .then((dados) => {
                if (!dados) {
                    return next(new errors.BadRequestError('Relação pedido-produto não encontrada'));
                }
                res.send(dados);
                return next();
            })
            .catch((err) => {
                return next(new errors.InternalServerError(err.message));
            });
    });

    server.post('/pedidos_produtos', (req, res, next) => {
        knex('pedidos_produtos')
            .insert(req.body)
            .then((dados) => {
                res.send(dados);
                return next();
            })
            .catch((err) => {
                return next(new errors.InternalServerError(err.message));
            });
    });

    server.put('/pedidos_produtos/:pedido_id/:produto_id', (req, res, next) => {
        const pedidoId = req.params.pedido_id;
        const produtoId = req.params.produto_id;

        knex('pedidos_produtos')
            .where({ 'pedido_id': pedidoId, 'produto_id': produtoId })
            .update(req.body)
            .then((dados) => {
                if (!dados) {
                    return next(new errors.BadRequestError('Relação pedido-produto não encontrada'));
                }
                res.send("Relação pedido-produto atualizada");
                return next();
            })
            .catch((err) => {
                return next(new errors.InternalServerError(err.message));
            });
    });

    server.del('/pedidos_produtos/:pedido_id/:produto_id', (req, res, next) => {
        const pedidoId = req.params.pedido_id;
        const produtoId = req.params.produto_id;

        knex('pedidos_produtos')
            .where({ 'pedido_id': pedidoId, 'produto_id': produtoId })
            .delete()
            .then((dados) => {
                if (!dados) {
                    return next(new errors.BadRequestError('Relação pedido-produto não encontrada'));
                }
                res.send("Relação pedido-produto excluída");
                return next();
            })
            .catch((err) => {
                return next(new errors.InternalServerError(err.message));
            });
    });
};
