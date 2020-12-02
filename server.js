const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');
const data = require('./users.json');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(middlewares);
server.use((req, res, next) => {
    if (isAuthorized(req)) {
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});
server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running')
});

function isAuthorized(req) {
    return data.users.some(item => {
        return item.login === req.body.login && item.password === req.body.password;
    });
}