import express from 'express';
import bodyParser from 'body-parser';

const port = 3000;
let data;

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({ data, auth: process.env.OBJECT_STORAGE_AUTH });
});
app.post('/', (req, res) => {
    data = req.body.data;
    res.send(data);
});

app.post('/auth', (req, res) => {
    const auth = req.body.auth;
    process.env.OBJECT_STORAGE_AUTH = auth;

    res.send();
});

app.listen(port, () => {
    console.log(`server is listen on http://localhost:${port}`);
});

