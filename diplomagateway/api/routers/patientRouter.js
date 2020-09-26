const resultParser = require('../helpers/resultParser')

function route(app) {

  app.post('/patients', async (req, res, next) => {
    try {
      res.json(resultParser(await global.contract.submitTransaction('addPatient', JSON.stringify(req.body))))
    } catch (error) {
      next(error)
    }
  });

  app.get('/patients/:cns', async (req, res, next) => {
    try {
      res.json(resultParser(await global.contract.evaluateTransaction('getPatient', req.pathParams.cns)))
    } catch (error) {
      next(error)
    }
  });

  app.get('/patients/:cns/documents', async (req, res, next) => {
    try {
      res.json(resultParser(await global.contract.evaluateTransaction('getPatientDocumentReferences', req.pathParams.cns, req.headers['x-practioner-cns'])))
      //global.contract.submitTransaction('addAccessLog', "", req.pathParams.cns, req.headers['x-practioner-cns']);
    } catch (error) {
      next(error)
    }
  });

  app.post('/patients/:cns/documents', async (req, res, next) => {
    try {
      let content = req.body.content;
      req.body.content = null;
      const transientData = {
        content: Buffer.from(JSON.stringify(content))
      };
      let identifier = resultParser(await global.contract.createTransaction('addDocumentReference')
        .setTransient(transientData).submit(req.pathParams.cns, JSON.stringify(req.body)));
      logger.info(identifier);
      res.status(201).location('/documents/' + identifier);
      res.send();
    } catch (error) {
      next(error)
    }
  });

  app.get('/patients/:cns/documents/:id', async (req, res, next) => {
    try {
      res.json(resultParser(await global.contract.evaluateTransaction('getPatientDocumentReference', req.pathParams.cns, req.pathParams.id, req.headers['x-practioner-cns'])))
      //global.contract.submitTransaction('addAccessLog', req.pathParams.id, req.pathParams.cns, req.headers['x-practioner-cns']);
    } catch (error) {
      next(error)
    }
  });

  app.get('/patients/:cns/documents/:id/content', async (req, res, next) => {
    try {
      res.json(resultParser(await global.contract.evaluateTransaction('getPatientDocumentContent', req.pathParams.cns, req.pathParams.id, req.headers['x-practioner-cns'])))
    } catch (error) {
      next(error)
    }
  });

  app.get('/patients/:cns/consents', async (req, res, next) => {
    try {
      res.json(resultParser(await global.contract.evaluateTransaction('getConsents', req.pathParams.cns)))
    } catch (error) {
      next(error)
    }
  });

  app.post('/patients/:cns/consents', async (req, res, next) => {
    try {
      res.json(resultParser(await global.contract.submitTransaction('addConsent', req.pathParams.cns, JSON.stringify(req.body))))
    } catch (error) {
      next(error)
    }
  });

}

module.exports = {
  route
}