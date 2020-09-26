const organizationsRouter = require('./organizationRouter');
const patientRouter = require('./patientRouter');
const practionerRouter = require('./practionerRouter');
const documentRouter = require('./documentRouter');
const alunoRouter = require('./alunoRouter');
const instituicaoRouter = require('./instituicaoRouter');
const diplomaRouter = require('./diplomaRouter');
const historicoRouter = require('./historicoRouter');

function route(app) {
    organizationsRouter.route(app);
    patientRouter.route(app);
    practionerRouter.route(app);
    documentRouter.route(app);
    alunoRouter.route(app);
    instituicaoRouter.route(app);
    diplomaRouter.route(app);
    historicoRouter.route(app);
}

module.exports = route;
