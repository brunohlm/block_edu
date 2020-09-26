const resultParser = require('../helpers/resultParser')

function route(app) {

  app.get('/documents', async (req, res, next) => {
    try {
      res.json(resultParser(await global.contract.evaluateTransaction('getDocumentReferences', req.query.listaCNS.toString(), req.headers['x-practioner-cns'])))
      //global.contract.submitTransaction('addAccessLog', "", req.query.listaCNS.toString(), req.headers['x-practioner-cns']);
    } catch (error) {
      next(error)
    }
  });

  app.get('/documents/:id', async (req, res, next) => {
    try {
      let response = resultParser(await global.contract.evaluateTransaction('getDocumentReference', req.pathParams.id, req.headers['x-practioner-cns']));
      res.json(response);
      //global.contract.submitTransaction('addAccessLog', req.pathParams.id, "", req.headers['x-practioner-cns']);
    } catch (error) {
      next(error)
    }
  });
}

module.exports = {
  route
}