const resultParser = require('../helpers/resultParser')

function route(app) {

  app.post('/organizations', async (req, res, next) => {
    try {
      res.json(resultParser(await global.contract.submitTransaction('addOrganization', JSON.stringify(req.body))))
    } catch (error) {
      next(error)
    }
  });

  app.get('/organizations/:cnes', async (req, res, next) => {
    try {
      res.json(resultParser(await global.contract.evaluateTransaction('getOrganization', req.pathParams.cnes)))
    } catch (error) {
      next(error)
    }
  });

}

module.exports = {
  route
}