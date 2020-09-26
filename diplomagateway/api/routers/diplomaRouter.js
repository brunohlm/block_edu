const resultParser = require('../helpers/resultParser')

function route(app) {

    app.post('/diploma', async (req, res, next) => {
        try {
            res.json(resultParser(await global.contract.submitTransaction('addDiploma', JSON.stringify(req.body))))
        } catch (error) {
            next(error)
        }
    });

    app.get('/diploma/:id', async (req, res, next) => {
        try {
            res.json(resultParser(await global.contract.evaluateTransaction('getDiploma', req.pathParams.id)))
        } catch (error) {
            next(error)
        }
    });


}

module.exports = {
    route
}
