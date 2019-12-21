import express from 'express';
import bodyParser from 'body-parser';

const port = 3000;
let data;

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(data);
});
app.post('/', (req, res) => {
    data = req.body.data;
    res.send(data);
});

app.listen(port, () => {
    console.log(`server is listen on http://localhost:${port}`);
});
