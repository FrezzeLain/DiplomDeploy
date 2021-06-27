const express = require('express');
const app = new express();
const path = require('path');
const DATABASE = require('./server/database');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'client')));

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'posterscontractservice@mail.ru',
        pass: 'y&kiFu3TUT2i'
    }
},
{
    from: 'POSTERS <posterscontractservice@mail.ru>',
});

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if (err) return console.log(err);
        console.log('Email ok: ', info)
    })
}

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

app.get('/Cabinet', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'pages', 'Cabinet.html'));
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

app.post('/updateCard', async(req, res) => {
    try {
        let {...bodyData} = req.body;
        let results = await DATABASE.updateCard(bodyData.cartList, bodyData.user);
        res.json(results);
    } catch (e) {
        console.log(e);
    }
});

app.post('/TryAuth', async(req, res) => {
    try {
        let {...bodyData} = req.body;
        let results = await DATABASE.tryAuth(bodyData.login, bodyData.password);
        res.json(results);
    } catch (e) {
        console.log(e);
    }
});

app.post('/getUserByMail', async(req, res) => {
    try {
        let {...bodyData} = req.body;
        let results = await DATABASE.getUserByMail(bodyData.mail);
        res.json(results);
    } catch (e) {
        console.log(e);
    }
});

app.post('/getUserByLogin', async(req, res) => {
    try {
        let {...bodyData} = req.body;
        let results = await DATABASE.getUserByLogin(bodyData.login);
        res.json(results);
    } catch (e) {
        console.log(e);
    }
});

app.post('/getUserById', async(req, res) => {
    try {
        let {...bodyData} = req.body;
        let results = await DATABASE.getUserById(bodyData.id);
        res.json(results);
    } catch (e) {
        console.log(e);
    }
});

app.post('/AddUser', async(req, res) => {
    try {
        let {...bodyData} = req.body;
        let results = await DATABASE.AddUser(bodyData.login, bodyData.mail, bodyData.password);
        res.json(results);
    } catch (e) {
        console.log(e);
    }
});

app.post('/addOrder', async(req, res) => {
    try {
        let {...bodyData} = req.body;
        let results = await DATABASE.addOrder(bodyData.id, bodyData.price, bodyData.user);
        res.json(results);
    } catch (e) {
        console.log(e);
    }
});

app.post('/getOrderList', async(req, res) => {
    try {
        let {...bodyData} = req.body;
        let results = await DATABASE.getOrderList(bodyData.id);
        res.json(results);
    } catch (e) {
        console.log(e);
    }
});

app.post('/sendMail', async(req, res) => {
    let {...bodyData} = req.body;
    const message = {
        to: bodyData.mail,
        subject: 'Posters | Информирование о заказе.',
        text: `Ваш заказ под номером ${bodyData.id} был успешно добавлен в очередь.
        Как только подойдёт очередь Вашего заказа, вам придёт оповещение на данную почту.
        Вы так же можете отслеживать статус своего заказа на странице заказов.
        С уважением, Posters.`
    }
    mailer(message)
});


app.listen(3000, () => {
    console.log('Server has been started on port: 3000');
});

