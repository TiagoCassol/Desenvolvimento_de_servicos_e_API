const fs = require('fs');

module.exports = (server, knex, errors) => {
    server.get('/cidades', (req, res, next) => {
        knex('cidades').then((dados) => {
            res.send(dados);
        }, next);
    });

    server.get('/cidades/:id', (req, res, next) => {
        const idCid = req.params.id;
        knex('cidades')
            .where('id', idCid)
            .first()
            .then((dados) => {
                if (!dados || dados == "") {
                    return res.send(
                        new errors.BadRequestError('Cidade não encontrado')
                    );
                }
                res.send(dados);
            }, next);
    });

    server.post('/cidades', (req, res, next) => { 
        knex('cidades')
            .insert(req.body)
            .then((dados) => {
                res.send(dados);
            }, next);
    });

    server.put('/cidades/:id', (req, res, next) => {
        const idCid = req.params.id;
        knex('cidades')
            .where('id', idCid)
            .update(req.body)
            .then((dados) => {
                if (!dados || dados == "") {
                    return res.send(
                        new errors.BadRequestError('Cidade não encontrado')
                    );
                }
                res.send("Cidade atualizado");
            }, next);
    });

    server.del('/cidades/:id', (req, res, next) => {
        const idCid = req.params.id;
        knex('cidades')
            .where('id', idCid)
            .delete()
            .then((dados) => {
                if (!dados || dados == "") {
                    return res.send(
                        new errors.BadRequestError('Cidade não encontrado')
                    );
                }
                res.send("Cidade excluido");
            }, next);
    });

};
    