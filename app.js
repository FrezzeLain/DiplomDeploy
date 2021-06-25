const express = require('express');
const app = new express();
const path = require('path');
const DATABASE = require('./server/database');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'client')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

app.get('/Registration', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'pages', 'Registration.html'));
});

app.get('/Auth', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'pages', 'Authorization.html'));
});

app.get('/AboutCompany', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'pages', 'About.html'));
});

app.get('/Cart', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'pages', 'Cart.html'));
});

app.get('/Favorite', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'pages', 'Favorite.html'));
});

app.get('/Katalog', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'pages', 'Katalog.html'));
});

app.get('/getNews', async(req, res) => {
    try {
        let results = await DATABASE.news();
        res.json(results);
    } catch (e) {
        console.log(e);
    }
});

app.get('/getTopItems', async(req, res) => {
    try {
        let results = await DATABASE.topItems();
        res.json(results);
    } catch (e) {
        console.log(e);
    }
});

app.get('/AboutItem/:id', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'pages', 'AboutItem.html'));
});

app.get('/Item/:id', async(req, res) => {
    try {
        let results = await DATABASE.itemById(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
    }
})

app.post('/Item/Collection', async(req, res) => {
    try {
        const {...reqBody} = req.body;
        let results = await DATABASE.collectionById(reqBody.id, reqBody.idItem);
        res.json(results);
    } catch (e) {
        console.log(e);
    }
})

app.get('/katalog/all', async(req, res)=> {
    try {
        let results = await DATABASE.katalog();
        res.json(results);
    } catch(e) {
        console.log(e);
    }
});

app.post('/katalog/search', async(req, res) => {
    try {
        const {...bodydata} = req.body;
        let results = await DATABASE.katalogSearch(bodydata.collection, bodydata.category, bodydata.name);
        res.json(results);
    } catch (e) {
        console.log(e);
    }
});

app.post('/getFavoriteList', async(req, res) => {
    try {
        let {...bodyData} = req.body;
        let results = await DATABASE.getFavoriteList(bodyData.id);
        res.json(results);
    } catch (e) {
        console.log(e);
    }
});

app.post('/getFavoriteByID', async(req, res) => {
    try {
        let {...bodyData} = req.body;
        let results = await DATABASE.getFavoriteById(bodyData.id);
        res.json(results);
    } catch (e) {
        console.log(e);
    }
});

app.post('/updateFavoriteList', async(req, res) => {
    try {
        let {...bodyData} = req.body;
        let results = await DATABASE.updateFavoriteList(bodyData.userId, bodyData.newList);
        res.json(results);
    } catch (e) {
        console.log(e);
    }
});

app.post('/CartByUser', async(req, res) => {
    try {
        let {...bodyData} = req.body;
        let results = await DATABASE.CartByUser(bodyData.id);
        res.json(results);
    } catch (e) {
        console.log(e);
    }
});



app.listen(3000, () => {
    console.log('Server has been started on port: 3000');
});

