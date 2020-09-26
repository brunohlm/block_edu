const {
    MemoryDataStore,
    Resource
} = require('swagger-express-middleware');

function route(app) {
    let myDB = new MemoryDataStore();

    app.post('/organizations', (req, res, next) => {
        myDB.save(new Resource('/organizations', +req.body.cnes, req.body), (err, org) => {
            res.status = 201;
            res.json(org.data);
        });
    });
    app.get('/organizations/:cnes', (req, res, next) => {
        myDB.get(`/organizations/${req.params.cnes}`, (err, org) => {
            res.json(org.data);
        });
    });
    app.post('/practioners', (req, res, next) => {
        myDB.save(new Resource('/practioners', +req.body.cns, req.body), (err, org) => {
            res.status = 201;
            res.json(org.data);
        });
    });
    app.get('/practioners/:cns', (req, res, next) => {
        myDB.get(`/practioners/${req.params.cns}`, (err, org) => {
            res.json(org.data);
        });
    });
    app.post('/patients', (req, res, next) => {
        myDB.save(new Resource('/patients', +req.body.cns, req.body), (err, org) => {
            res.status = 201;
            res.json(org.data);
        });
    });
    app.get('/patients/:cns', (req, res, next) => {
        myDB.get(`/patients/${req.params.cns}`, (err, org) => {
            res.json(org.data);
        });
    });

    app.get('/patients/:cns/documents', (req, res, next) => {
        myDB.get(`/patients/${req.params.cns}/documents`, (err, org) => {
            res.json(org.data);
        });
    });

    app.post('/patients/:cns/documents', (req, res, next) => {
        myDB.save(new Resource(`/patients/${req.params.cns}/documents`, +req.body.cns, req.body), (err, doc) => {
            res.status = 201;
            res.json(doc.data);
        });
    });

    app.get('/patients/:cns/documents/:masterIdentifier', (req, res, next) => {
        myDB.get(`/patients/${req.params.cns}/documents/${req.params.masterIdentifier}`, (err, org) => {
            res.json(org.data);
        });
    });

    app.get('/patients/:cns/documents/:masterIdentifier/content', async (req, res, next) => {
        myDB.get(`/patients/${req.params.cns}/documents/${req.params.masterIdentifier}/content`, (err, org) => {
            res.json(org.data);
        });
    });

}

module.exports = {
    route
}