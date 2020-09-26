const resultParser = require('../helpers/resultParser')

function route(app) {

  app.post('/practioners', async (req, res, next) => {
    try {
      res.json(resultParser(await global.contract.submitTransaction('addPractioner', JSON.stringify(req.body))))
    } catch (error) {
      next(error)
    }
  });

  app.get('/practioners/:cns', async (req, res, next) => {
    try {
      res.json(resultParser(await global.contract.evaluateTransaction('getPractioner', req.pathParams.cns)))
    } catch (error) {
      next(error)
    }
  });

}

module.exports = {
  route
}