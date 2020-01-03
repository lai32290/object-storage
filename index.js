import express from 'express';
import Http from 'http';
import Socket from 'socket.io';
import bodyParser from 'body-parser';
import ObjectStorage from './object-storage.js';

const storage = ObjectStorage();
const port = 4000;

const app = express();
const http = Http.createServer(app);
const io = Socket(http);
let socket;

app.use(bodyParser.json());

app.use('/', isAuthorized);

app.get('/', (req, res) => {
    const data = storage.get();
    res.send({ data, auth: process.env.OBJECT_STORAGE_AUTH });
});
app.post('/', (req, res) => {
    const data = req.body.data;
    storage.set(data);
	if (socket) {
		socket.broadcast.emit('UPDATE');
	}
    res.send(data);
});

app.post('/auth', (req, res) => {
    const auth = req.body.auth;
    process.env.OBJECT_STORAGE_AUTH = auth;

    res.send();
});

app.post('/log', (req, res) => {
    const log = req.body.data;
    storage.log(log);
    res.send(log);
});

app.get('/log', (req, res) => {
    const log = storage.log();
    res.send(log);
});

app.get('/logs', (req, res) => {
    const logs = storage.getLogs();
    res.send(logs);
});

http.listen(port, () => {
    console.log(`server is listen on http://localhost:${port}`);
});

io.on('connection', _socket => {
	console.log('A user connected in socket.');
	socket = _socket;
});


function isAuthorized(req, res, next) {
    const auth = req.header('AUTH');

    if (auth !== process.env.OBJECT_STORAGE_AUTH) {
        res.send(403, '');
        next(err);
    }

    next();
}
