const resultParser = require('../helpers/resultParser')

function route(app) {

    app.post('/instituicao', async (req, res, next) => {
        try {
            res.json(resultParser(await global.contract.submitTransaction('addInstituicao', JSON.stringify(req.body))))
        } catch (error) {
            next(error)
        }
    });

    app.get('/instituicao/:codigoIes', async (req, res, next) => {
        try {
            res.json(resultParser(await global.contract.evaluateTransaction('getInstituicao', req.pathParams.codigoIes)))
        } catch (error) {
            next(error)
        }
    });


}

module.exports = {
    route
}
