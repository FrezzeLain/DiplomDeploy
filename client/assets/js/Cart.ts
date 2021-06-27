const CONTENT = document.getElementById('Content');
let USER_ID = Number(localStorage.getItem('USER_ID'));
const rightBlock = document.getElementById('res');
let USER_CART_LIST = [];
const DEFAULT_PRICE = 3200;
const MessageBlock = document.getElementById('message');
let ITEMS_LIST = [];
let CART_LIST = [];
let FAV_LIST = [];
const ResultPrice = document.getElementById('lastPrice');
let RESULT_PTICE: number = 0;
const MINI_PRICE = document.getElementById('mini');
const search = document.getElementById('search');
search.addEventListener('click', () => {
    document.location.href = '/Katalog';
})
const user = document.getElementById('user');
const userOptions = document.getElementById('userOptions');
let toggled = false;
const BuyButton = document.getElementById('buy');

window.addEventListener('load', () => {
    if (USER_ID) {
        loadCart();
    } else {
        document.location.href = '/Auth';
    }
})

async function loadCart() {
    CONTENT.innerHTML = '';

    let body = {
        id: USER_ID
    };

    fetch('CartByUser', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then((resolve) => {
        return resolve.json();
    })
    .then((data) => {
        USER_CART_LIST = data[0].cartlist.split(',');
        if (USER_CART_LIST[0] == '') {
            let h2 = document.createElement('h2');
            h2.innerText = `Ваша корзина пуста, добавьте товар.`;
            h2.className = `h2Clear`;
            CONTENT.append(h2);
            rightBlock.innerHTML = '';
            rightBlock.style.border = `none`;
        } else {
            USER_CART_LIST.forEach((element) => {
                let id = Number(element);
    
                fetch('/getFavoriteByID', {
                    method: 'POST',
                    headers: {
                        'Content-type' : 'application/json'
                    },
                    body: JSON.stringify({id: id})
                })
                .then((resolve) => {
                    return resolve.json();
                })
                .then((data) => {
                    createElement(data[0]);
                    ResultPrice.innerText = `Итоговая цена: ${RESULT_PTICE} ₽`;
                })
            });
        }
    })
}

function createElement(element) {
    let Item = document.createElement('div');
    Item.dataset.id = `${ITEMS_LIST.length}`;
    ITEMS_LIST.push({
        id: element.id,
        type: 1,
        size: 1,
        name: element.name
    });
    let index = ITEMS_LIST.length - 1;
    Item.className = 'product flex wrap';
    let Image = document.createElement('div');
    Image.style.backgroundImage = `url(${element.image})`;
    Image.className = 'image';
    Image.addEventListener('click', () => {
        window.location.href = `/AboutItem/${element.id}`;
    })
    let Details = document.createElement('div');
    Details.className = 'details flex column justify-space-between';
    let h2_1 = document.createElement('h2');
    h2_1.textContent = 'Тип покрытия';
    let param_1 = document.createElement('div');
    param_1.className = 'flex param';
    let choice1 = document.createElement('div');
    choice1.className = 'choice active flex justify-center align-center';
    choice1.addEventListener('click', (e) => {
        changeType(e.target);
    });
    let h4_1 = document.createElement('h4');
    h4_1.textContent = 'Матовое';
    choice1.dataset.itemId = `${index}`;
    choice1.dataset.paramId = '1';
    h4_1.dataset.itemId = `${index}`;
    h4_1.dataset.paramId = '1';

    let choice2 = document.createElement('div');
    choice2.className = 'choice flex justify-center align-center';
    choice2.addEventListener('click', (e) => {
        changeType(e.target);
    });
    let h4_2 = document.createElement('h4');
    h4_2.textContent = 'Глянцевое';
    choice2.dataset.itemId = `${index}`;
    choice2.dataset.paramId = '2';
    h4_2.dataset.itemId = `${index}`;
    h4_2.dataset.paramId = '2';

    let h2_2 = document.createElement('h2');
    h2_2.textContent = 'Размер';
    let param_2 = document.createElement('div');
    param_2.className = 'flex param sizes';

    let choice3 = document.createElement('div');
    choice3.className = 'choice active flex justify-center align-center';
    choice3.addEventListener('click', (e) => {
        changeSize(e.target);
    });
    let h4_3 = document.createElement('h4');
    h4_3.textContent = '46 | 33';
    choice3.dataset.itemId = `${index}`;
    choice3.dataset.paramId = '1';
    h4_3.dataset.itemId = `${index}`;
    h4_3.dataset.paramId = '1';

    let choice4 = document.createElement('div');
    choice4.className = 'choice flex justify-center align-center';
    choice4.addEventListener('click', (e) => {
        changeSize(e.target);
    });
    let h4_4 = document.createElement('h4');
    h4_4.textContent = '69 | 48';
    choice4.dataset.itemId = `${index}`;
    choice4.dataset.paramId = '2';
    h4_4.dataset.itemId = `${index}`;
    h4_4.dataset.paramId = '2';

    let choice5 = document.createElement('div');
    choice5.className = 'choice flex justify-center align-center';
    choice5.addEventListener('click', (e) => {
        changeSize(e.target);
    });
    let h4_5 = document.createElement('h4');
    h4_5.textContent = '89 | 63';
    choice5.dataset.itemId = `${index}`;
    choice5.dataset.paramId = '3';
    h4_5.dataset.itemId = `${index}`;
    h4_5.dataset.paramId = '3';

    let Buttons = document.createElement('div');
    Buttons.className = 'buttons flex align-end justify-end';
    let button = document.createElement('button');
    button.className = 'buttonRed';
    button.dataset.dataBaseId = element.id;
    button.dataset.itemId = `${index}`;
    button.addEventListener('click', (ev) => {
        deleteItem(ev.target);
    });
    let iDelete = document.createElement('i');
    iDelete.className = 'flaticon-trash-bin';
    iDelete.title = 'Удалить из корзины';
    iDelete.dataset.dataBaseId = element.id;
    iDelete.dataset.itemId = `${index}`;

    Buttons.append(button);
    button.append(iDelete);
    param_2.append(choice3, choice4, choice5);
    choice3.append(h4_3);
    choice4.append(h4_4);
    choice5.append(h4_5);
    param_1.append(choice1,choice2);
    choice1.append(h4_1);
    choice2.append(h4_2);

    Details.append(h2_1, param_1, h2_2, param_2, Buttons);
    Item.append(Image,Details);
    CONTENT.append(Item);
    getFullPrice();
}

function getPrice(element): number {
    let type = element.type;
    let size = element.size;
    let sizePrice, typePrice;
    switch (size) {
        case 1 : {
            sizePrice = DEFAULT_PRICE;
            break;
        }
        case 2 : {
            sizePrice = DEFAULT_PRICE * 2;
            break;
        }
        case 3 : {
            sizePrice = DEFAULT_PRICE * 3;
            break;
        }
    }

    typePrice = type === 1 ? 0 : sizePrice * 0.2;
    return sizePrice + typePrice;
}

function changeType(el) {
    let itemId = el.dataset.itemId;
    let paramId = el.dataset.paramId;
    ITEMS_LIST[itemId].type = Number(paramId);
    let CLassL = el.classList.length;
    if (CLassL) {
        el.parentNode.childNodes.forEach(element => {
            if (element.classList.contains('active')) {
                element.classList.remove('active');
            }
        });
        el.classList.add('active');
    } else {
        el.parentNode.parentNode.childNodes.forEach(element => {
            if (element.classList.contains('active')) {
                element.classList.remove('active');
            }
        });
        el.parentNode.classList.add('active');
    }

    getFullPrice();
}

function changeSize(el) {
    let itemId = el.dataset.itemId;
    let paramId = el.dataset.paramId;
    ITEMS_LIST[itemId].size = Number(paramId);
    let CLassL = el.classList.length;
    if (CLassL) {
        el.parentNode.childNodes.forEach(element => {
            if (element.classList.contains('active')) {
                element.classList.remove('active');
            }
        });
        el.classList.add('active');
    } else {
        el.parentNode.parentNode.childNodes.forEach(element => {
            if (element.classList.contains('active')) {
                element.classList.remove('active');
            }
        });
        el.parentNode.classList.add('active');
    }

    getFullPrice();
}

function getFullPrice() {
    MINI_PRICE.innerHTML = '';
    let result = 0;
    ITEMS_LIST.forEach((element) => {
        let Price = getPrice(element);
        result+=Price;

        let Type = getType(element);
        let Size = getSize(element);

        let miniItem = document.createElement('div');
        miniItem.className = 'miniItem flex column';
        let h3Title = document.createElement('h3');
        h3Title.textContent = `${element.name}`;
        let h3Type = document.createElement('h3');
        h3Type.textContent = `Тип покрытия: ${Type}`;
        let h3Size = document.createElement('h3');
        h3Size.className = 'Size';
        h3Size.textContent = `Размер: ${Size}`;
        let h3Price = document.createElement('h3');
        h3Price.className = 'Price';
        h3Price.textContent = `Цена: ${Price}`;

        miniItem.append(h3Title, h3Type, h3Size, h3Price);
        MINI_PRICE.append(miniItem);
    })
    RESULT_PTICE = result;
    ResultPrice.innerText = `Итоговая цена: ${RESULT_PTICE} ₽`;
}

function getType(el): string {
    if (el.type == 1) return 'Матовый';
    return 'Глянцевый'
}

function getSize(el): string {
    if (el.size == 1) return '46 | 33';
    if (el.size == 2) return '69 | 48';
    return '89 | 63';
}

async function deleteItem(item) {
    let BaseId = item.dataset.dataBaseId;
    let itemId = item.dataset.itemId;
    
    let index = USER_CART_LIST.indexOf(BaseId);
    USER_CART_LIST.splice(index, 1);
    let stringBody = USER_CART_LIST.join();

    fetch('/updateCard', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({cartList: stringBody, user: USER_ID})
    }).then(() => {
        loadCart();
        ITEMS_LIST = [];
        getFullPrice();
    });
}

user.addEventListener('click', () => {
    if (USER_ID) {
        if (toggled) {
            userOptions.style.display = 'none';
            toggled = !toggled;
        } else {
            userOptions.innerHTML = ``;
            userOptions.style.display = `block`;
            let Cabinet = document.createElement('h2');
            Cabinet.innerText = `Страница заказов`;
            userOptions.append(Cabinet);
            Cabinet.addEventListener('click', () => {
                document.location.href = `/Cabinet`;
            });
            let Exit = document.createElement('h2');
            Exit.innerText = 'Выйти';
            userOptions.append(Exit);
            Exit.addEventListener('click', () => {
                localStorage.setItem('USER_ID', '0');
                FAV_LIST.length = 0;
                CART_LIST.length = 0;
                document.location.href = `/`;
            });
            toggled = !toggled;
        }
    } else {
        document.location.href = `/Auth`;
    }
});

BuyButton.addEventListener('click', () => {
    let id = Date.now().toString();
    let price = RESULT_PTICE;
    let user = USER_ID;

    let mail;

    fetch('/getUserById', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({id: USER_ID})
    })
    .then((resolve) => {
        return resolve.json();
    })
    .then((data) => {
        mail = data[0].mail;
        fetch('/addOrder', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({id: id, price: price, user: user})
        })
        .then((resolve) => {
            return resolve.json();
        })
        .then((data) => {
            fetch('/sendMail', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({id: id, mail: mail})
            });

            let newList = '';
            fetch('/updateCard', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({cartList: newList, user: USER_ID})
            })
            .then((resolve) => {
                return resolve.json();
            })
            .then((data) => {
                CART_LIST = newList.split(',');
                loadCart();
                showMessage(6);
            })
        })
    })
})

function showMessage(state) {
    MessageBlock.classList.remove('hidden');
    switch (state) {
        case 1:
            MessageBlock.childNodes[1].textContent = 'Товар удалён из списка желаемого';
            MessageBlock.childNodes[3].style.display = 'none';
            if (MessageBlock.classList.contains('ActiveMS')) {
                alert();
                MessageBlock.classList.remove('ActiveMS');
                MessageBlock.classList.add('ActiveMS');
            } else {
                MessageBlock.classList.add('ActiveMS');
            }
            break;
        case 2:
            MessageBlock.childNodes[1].textContent = 'Товар уже есть в вашем списке желаемого';
            MessageBlock.childNodes[3].style.display = 'none';
            MessageBlock.style.opacity = `1`;
            MessageBlock.style.transition = '1s linear';
            setTimeout(() => {
                MessageBlock.style.opacity = '0';
            }, 3000);
            break;
        case 3:
            MessageBlock.childNodes[1].textContent = 'Товар добавлен в ваш список желаемого';
            MessageBlock.childNodes[3].style.display = 'none';
            MessageBlock.style.opacity = `1`;
            MessageBlock.style.transition = '1s linear';
            setTimeout(() => {
                MessageBlock.style.opacity = '0';
            }, 3000);
            break;
        case 4:
            MessageBlock.childNodes[1].textContent = 'Товар уже есть в вашей корзине';
            MessageBlock.childNodes[3].style.display = 'none';
            MessageBlock.style.opacity = `1`;
            MessageBlock.style.transition = '1s linear';
            setTimeout(() => {
                MessageBlock.style.opacity = '0';
            }, 3000);
            break;
        case 5:
            MessageBlock.childNodes[1].textContent = 'Товар добавлен в корзину';
            MessageBlock.childNodes[3].style.display = 'none';
            MessageBlock.style.opacity = `1`;
            MessageBlock.style.transition = '1s linear';
            setTimeout(() => {
                MessageBlock.style.opacity = '0';
            }, 3000);
            break;
        case 6:
            MessageBlock.childNodes[1].textContent = 'Заказ добален на страницу заказов';
            MessageBlock.childNodes[3].style.display = 'none';
            MessageBlock.style.opacity = `1`;
            MessageBlock.style.transition = '1s linear';
            setTimeout(() => {
                MessageBlock.style.opacity = '0';
            }, 3000);
            break;
    }
}