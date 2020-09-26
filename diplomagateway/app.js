const util = require('util');
const path = require('path');
const swagger = require('swagger-express-middleware');
const Middleware = swagger.Middleware;
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerFilePath = path.join(__dirname, './api/swagger/swagger.yaml')
const swaggerFile = YAML.load(swaggerFilePath);
const app = require('express')();
const Router = require('./api/routers');

require('./config/config')(__dirname);

let middleware = new Middleware(app);

middleware.init(swaggerFilePath, (err) => {
    if (err) {
        console.log(err)
        throw err;
    }

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

    app.use(
        middleware.metadata(),
        middleware.CORS(),
        middleware.parseRequest(),
        middleware.validateRequest()
    );

    if (process.env.MOCK_MODE) {
        const MockRouter = require('./api/mocks/mockRouter');
        MockRouter.route(app);
    } else {
        Router(app);
    }

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        let {status, message} = err;
        res.json({code: status ? status : -1, msg: message});
    });

    app.listen(port, () => {
        logger.info(`${global.serviceName} started on port:${global.port}`)
    });

});

module.exports = app;
