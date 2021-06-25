const CONTENT = document.getElementById('Content');
const USER_ID = 1;
let USER_CART_LIST = [];
const DEFAULT_PRICE = 3200;
let ITEMS_LIST = [];
const ResultPrice = document.getElementById('lastPrice');
let RESULT_PTICE: number = 0;
const MINI_PRICE = document.getElementById('mini');

window.addEventListener('load', () => {
    loadCart();
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
    let iDelete = document.createElement('i');
    iDelete.className = 'flaticon-trash-bin';
    iDelete.title = 'Удалить из корзины';

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