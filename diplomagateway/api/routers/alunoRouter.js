const resultParser = require('../helpers/resultParser')

function route(app) {

    app.post('/aluno', async (req, res, next) => {
        try {
            res.json(resultParser(await global.contract.submitTransaction('addAluno', JSON.stringify(req.body))))
        } catch (error) {
            next(error)
        }
    });

    app.get('/aluno/:cpf', async (req, res, next) => {
        try {
            res.json(resultParser(await global.contract.evaluateTransaction('getAluno', req.pathParams.cpf)))
        } catch (error) {
            next(error)
        }
    });


}

module.exports = {
    route
}
