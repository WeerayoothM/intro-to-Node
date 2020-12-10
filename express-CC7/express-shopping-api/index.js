const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { clearScreenDown } = require('readline');

// Set Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname));
    }
});

//!  const storage = multer.memoryStorage();

// Init Upload
const upload = multer({ storage: storage }).single('file')

// Init app
const app = express();

// Public Folder
app.use(express.static('./public'))

app.use(express.json());

const products = JSON.parse(fs.readFileSync("./product.json"));
const users = JSON.parse(fs.readFileSync("./user.json"));

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.send({ message: 'error' })
        } else {
            console.log(req.file);
            res.send('test')
        }
    })
})

app.get('/product/:name', (req, res) => {
    const idx = products.findIndex(elem => elem.name === req.params.name);
    const newProducts = products[idx];
    res.status(200).send(newProducts)
})
app.get('/login/:username', (req, res) => {
    const idx = users.findIndex(elem => elem.username === req.params.username);
    if (idx === -1) {
        return res.status(404).send({ message: "username id not defined" })
    }
    res.status(200).send(users[idx])

    users[idx].lastLogin = `${new Date()}`
    fs.writeFileSync('./user.json', JSON.stringify(users))
})
app.post('/register', (req, res, next) => {
    const newId = users.length !== 0 ? users[users.length - 1].id + 1 : 0;
    const isThereUser = users.findIndex(elem => elem.username === req.body.username);
    if (isThereUser !== -1) {
        return res.status(404).send({ message: "usersname has already register" })
    }
    const newUsers = {
        "id": newId,
        "username": req.body.username,
        "password": req.body.password,
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "role": req.body.role,
        "lastLogin": "",
    }
    users.push(newUsers)
    fs.writeFileSync('./user.json', JSON.stringify(users))
    res.status(201).send({ users: newUsers })
})

app.post('/product', (req, res) => {
    const newId = products.length !== 0 ? products[products.length - 1].id + 1 : 0;
    const newProducts = {
        "id": newId,
        "name": req.body.name,
        "price": req.body.price,
        "category": req.body.category,
        "image": [],
        "totalSale": req.body.totalSale
    }
    products.push(newProducts)
    fs.writeFileSync('./product.json', JSON.stringify(products))
    res.status(201).send({ products: newProducts })
})

app.patch('/product/:id', (req, res) => {
    const id = +req.params.id;
    const idx = products.findIndex(elem => elem.id === id);
    if (idx === -1) {
        return res.status(404).send({ message: "Invalid id" })
    }
    const newProducts = {
        "id": id,
        "name": req.body.name ? req.body.name : products[idx].name,
        "price": req.body.price ? req.body.price : products[idx].price,
        "category": req.body.category ? req.body.category : products[idx].category,
        "image": [],
        "totalSale": req.body.totalSale ? req.body.totalSale : products[idx].totalSale
    }
    products[idx] = newProducts
    fs.writeFileSync('./product.json', JSON.stringify(products))
    res.status(200).send({ products: newProducts })
})

app.delete('/product/:id', (req, res) => {
    const idx = products.findIndex(elem => elem.id === +req.params.id);
    if (idx === -1) {
        return res.status(404).send({ message: "Invalid id" })
    }
    const newProducts = products.filter(elem => elem.id === +req.params.id);
    fs.writeFileSync('./product.json', JSON.stringify(newProducts))
    res.status(204).send()
})

app.use((req, res, next) => {                                         //! error middle ware
    res.status(404).send({ message: "path not found" })
})


app.listen(5555)
