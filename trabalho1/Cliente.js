const fs = require('fs');

module.exports = (server, knex, errors) => {
   server.get('/clientes', (req, res, next) => {
        knex('clientes')
        .join("cidades", "clientes.cidade_id", "=" , "cidades.id")
        .select("clientes.id" , "clientes.nome", 
                "clientes.altura","clientes.altura","clientes.nascimento", "cidades.nome AS cid")
            .then((dados) => {
                res.send(dados);
            }, next);
    });

    server.get('/clientes/:id', (req, res, next) => {
        const idCli = req.params.id;
        knex('clientes')
        .join("cidades", "clientes.cidade_id", "=" , "cidades.id")
        .select("clientes.id" , "clientes.nome", 
                "clientes.altura","clientes.altura","clientes.nascimento", "cidades.nome AS cid")
        .where( 'clientes.id' , idCli)
        .first()
            .then((dados) => {
                if (!dados || dados == "") {
                    return res.send(
                        new errors.BadRequestError('cliente não encontrado')
                    );
                }
                res.send(dados);
            }, next);
    });

    server.post('/clientes', (req, res, next) => {
        knex('clientes')
            .insert(req.body)
            .then((dados) => {
                res.send(dados);
            }, next);
    });

    server.put('/clientes/:id', (req, res, next) => {
        const idCli = req.params.id;
        knex('clientes')
            .where('id', idCli)
            .update(req.body)
            .then((dados) => {
                if (!dados || dados == "") {
                    return res.send(
                        new errors.BadRequestError('Cliente não encontrado')
                    );
                }
                res.send("Cliente atualizado");
            }, next);
    });

    server.del('/clientes/:id', (req, res, next) => {
        const idCli = req.params.id;
        knex('clientes')
            .where('id', idCli)
            .delete()
            .then((dados) => {
                if (!dados || dados == "") {
                    return res.send(
                        new errors.BadRequestError('Cliente não encontrado')
                    );
                }
                res.send("Cliente excluido");
            }, next);
    });

};