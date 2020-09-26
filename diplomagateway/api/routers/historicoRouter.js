const resultParser = require('../helpers/resultParser')

function route(app) {

    app.post('/historico', async (req, res, next) => {
        try {
            res.json(resultParser(await global.contract.submitTransaction('addHistorico', JSON.stringify(req.body))))
        } catch (error) {
            next(error)
        }
    });

    app.get('/historico/:cpf', async (req, res, next) => {
        try {
            res.json(resultParser(await global.contract.evaluateTransaction('getHistorico', req.pathParams.cpf)))
        } catch (error) {
            next(error)
        }
    });


}

module.exports = {
    route
}
