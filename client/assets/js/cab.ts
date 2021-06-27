const FAVORITE_BLOCK = document.getElementById('orders');
const search = document.getElementById('search');
let FAV_LIST = [];
let CART_LIST = [];
let ORD_LIST = [];

search.addEventListener('click', () => {
    document.location.href = '/Katalog';
})

let USER_ID = Number(localStorage.getItem('USER_ID'));
const user = document.getElementById('user');
const userOptions = document.getElementById('userOptions');
let toggled = false;

window.addEventListener('load', () => {
    if (USER_ID) {
        getOrdersList();
    } else {
        document.location.href = `/Auth`;
    }
})

async function getOrdersList() {
    FAVORITE_BLOCK.innerHTML = '';
    let bodyPOST = {
        id: USER_ID
    };

    fetch('/getOrderList',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyPOST)
    }).then((response) => {
        return response.json();
    }).then((data) => {
        ORD_LIST = data;
        if (ORD_LIST.length == 0) {
            let h2 = document.createElement('h2');
            h2.innerText = `У вас пока ещё не было активных заказов.`;
            h2.className = `h2Clear`;
            FAVORITE_BLOCK.append(h2);
        } else {
            ORD_LIST.forEach(element => {
                createElement(element);
            });
        }
        
    });
}

function createElement(element) {
    let Item = document.createElement('div');
    Item.className = 'item flex column align-center justify-center';
    let h2 = document.createElement('h2');
    h2.textContent = `Заказ №${element.id}`;
    let Info = document.createElement('div');
    Info.className = 'info flex column align-center justify-center';
    let h31 = document.createElement('h3');
    h31.textContent = `${element.price} Р`;
    let h32 = document.createElement('h3');
    h32.textContent = `${element.state}`;

    Info.append(h31, h32);
    Item.append(h2, Info);
    FAVORITE_BLOCK.append(Item);
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