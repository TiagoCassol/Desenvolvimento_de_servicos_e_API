const fs = require('fs');

module.exports = (server, knex, errors) => {
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
                        new errors.BadRequestError('Categoria não encontrada')
                    );
                }
                res.send(dados);
            }, next);
    });

    server.post('/categorias', (req, res, next) => {
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
                        new errors.BadRequestError('Categoria não encontrada')
                    );
                }
                res.send("Categoria atualizada");
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
                        new errors.BadRequestError('Categoria não encontrada')
                    );
                }
                res.send("Categoria excluída");
            }, next);
    });

    function exportCategoriasToFile() {
        knex('categorias').then((dados) => {
            fs.writeFileSync('categorias.json', JSON.stringify(dados, null, 2));
            console.log('Categorias exportadas para categorias.json');
        }).catch((err) => {
            console.error('Erro ao exportar categorias:', err);
        });
    }


};
