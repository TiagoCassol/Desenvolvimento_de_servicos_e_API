const fs = require('fs');

module.exports = (server, knex, errors) => {
   
   server.get('/pedidos', (req, res, next) => {
        knex('pedidos')
        .join("clientes", "pedidos.cliente_id", "=" , "clientes.id")
        .select("pedidos.id" , "pedidos.horario", 
                "pedidos.endereco","clientes.nome AS cli")
            .then((dados) => {
                res.send(dados);
            }, next);
    });

    server.get('/pedidos/:id', (req, res, next) => {
        const idPed = req.params.id;
        knex('pedidos')
        .join("clientes", "pedidos.cliente_id", "=" , "clientes.id")
        .select("pedidos.id" , "pedidos.horario", 
                "pedidos.endereco","clientes.nome AS cli")
        .where( 'pedidos.id' , idPed)
        .first()
            .then((dados) => {
                if (!dados || dados == "") {
                    return res.send(
                        new errors.BadRequestError('Pedido não encontrado')
                    );
                }
                res.send(dados);
            }, next);
    });

    server.post('/pedidos', (req, res, next) => {
        knex('pedidos')
            .insert(req.body)
            .then((dados) => {
                res.send(dados);
            }, next);
    });

    server.put('/pedidos/:id', (req, res, next) => {
        const idPed = req.params.id;
        knex('pedidos')
            .where('id', idPed)
            .update(req.body)
            .then((dados) => {
                if (!dados || dados == "") {
                    return res.send(
                        new errors.BadRequestError('Pedido não encontrado')
                    );
                }
                res.send("Pedido atualizado");
            }, next);
    });

    server.del('/pedidos/:id', (req, res, next) => {
        const idPed = req.params.id;
        knex('pedidos')
            .where('id', idPed)
            .delete()
            .then((dados) => {
                if (!dados || dados == "") {
                    return res.send(
                        new errors.BadRequestError('Pedido não encontrado')
                    );
                }
                res.send("Pedido excluido");
            }, next);
    });
};