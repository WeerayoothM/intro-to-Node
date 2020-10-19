const express = require('express');

const app = express();
app.use(express.json());

app.get('/bye', (req, res) => {
    res.status(200).send("Good bye")
})

app.post('/bye', (req, res, next) => {
    res.status(201).send("this is in Post Method")
})

app.put('/bye', (req, res, next) => {
    res.status(200).send("this is in Put Method")
})

app.delete('/bye', (req, res, next) => {
    res.status(204).send("this is in Delete Method")
})

// app.listen(5555)
const port = 5555;
app.listen(port, () => {
    console.log(`server starting on port ${port} ...`);

})