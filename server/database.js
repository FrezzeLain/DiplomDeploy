const express = require('express');
const path = require('path');
const mysql = require('mysql');
const Pool = require('mysql/lib/Pool');

const connection = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    database: 'PostersBase',
    password: '',
    port: '3306'
});

let Requests = {};

Requests.katalog = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM posters', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

Requests.katalogSearch = (collection, category, name) => {
    collection = collection === 0 ? '%': `%${collection}%`;
    category = category === 0 ? '%': `%${category}%`;
    name = name === 0 ? '%': `%${name}%`;

    return new Promise((resolve, reject) => {
        let flags = [collection, category, name];
        const SQL = "SELECT DISTINCT * FROM (SELECT DISTINCT posters.id, posters.image, posters.name, posters.categories FROM `posters` INNER JOIN `collections` WHERE `posters`.`collection` IN (SELECT DISTINCT `collections`.`id` FROM `collections` WHERE `collections`.name LIKE ?)) AS q1 WHERE q1.categories LIKE ? AND q1.name LIKE ?";
            connection.query(SQL, flags, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    })
}

Requests.itemById = (id) => {
    return new Promise((resolve, reject) => {
        let flags = [id];
        connection.query('SELECT * FROM posters WHERE id = ?', flags, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    })
}

Requests.collectionById = (id, idItem) => {
    return new Promise((resolve, reject) => {
        let flags = [id, idItem];
        connection.query('SELECT * FROM posters WHERE collection = ? AND id <> ?', flags, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    })
}

Requests.news = () => {
    return new Promise((resolve, reject) => {
        connection.query("(SELECT * FROM `news` WHERE `news`.`Type` = 'Main' LIMIT 1) UNION (SELECT * FROM `news` WHERE `news`.`Type` = 'Secondary' LIMIT 3)", (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    })
};

Requests.topItems = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM `posters` ORDER BY `posters`.`likes` DESC LIMIT 10", (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    })
};

Requests.getFavoriteList = (id) => {
    const flags = [id];
    return new Promise((resolve, reject) => {
        connection.query("SELECT users.likelist FROM `users` WHERE users.id = ?", flags, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    })
};

Requests.getFavoriteById = (id) => {
    const flags = [id];
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM `posters` WHERE posters.id = ?", flags, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    })
};

Requests.updateFavoriteList = (userId, newList) => {
    const flags = [newList, userId];
    return new Promise((resolve, reject) => {
        connection.query("UPDATE `users` SET likelist =  ? WHERE id = ?", flags, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    })
};

Requests.CartByUser = (id) => {
    const flags = [id];
    return new Promise((resolve, reject) => {
        connection.query("SELECT users.cartlist FROM users WHERE users.id = ?", flags, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    })
};

Requests.updateCard = (cartList, user) => {
    const flags = [cartList, user];
    return new Promise((resolve, reject) => {
        connection.query("UPDATE `users` SET users.cartlist = ? WHERE users.id = ?", flags, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    })
};

Requests.tryAuth = (login, password) => {
    const flags = [login, login, password];
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM `users` WHERE (users.login = ? OR users.mail = ?) AND password = ?", flags, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    })
};

Requests.getUserByMail = (mail) => {
    const flags = [mail];
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM `users` WHERE users.mail = ?", flags, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    })
};

Requests.getUserById = (id) => {
    const flags = [id];
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM `users` WHERE users.id = ?", flags, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    })
};

Requests.getUserByLogin = (login) => {
    const flags = [login];
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM `users` WHERE users.login = ?", flags, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    })
};

Requests.AddUser = (login, mail, password) => {
    const flags = [login, mail, password];
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO `users` (`id`, `login`, `mail`, `likelist`, `cartlist`, `password`) VALUES (NULL, ?, ?, '', '', ?)", flags, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    })
};

Requests.addOrder = (id, price, user) => {
    const flags = [id, user, price];
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO `orders` (`id`, `user_id`, `price`, `state`) VALUES (?, ?, ?, 'В очереди')", flags, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    })
};

Requests.getOrderList = (id) => {
    const flags = [id];
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM `orders` WHERE orders.user_id = ?", flags, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    })
};


module.exports = Requests;