const express = require('express');
const app = express();

app.use(express.json());

app.get('/test/:b', (req, res) => {
    const a = +req.query.a;
    const b = +req.params.b;
    const n = +req.body.n;
    const arr = new Array(a, b, n)
    res.status(200).send({ ans: arr.sort((a, b) => a - b) })
});

app.listen(8080, () => {
    console.log('Server is running')
})