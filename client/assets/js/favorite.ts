const FAVORITE_BLOCK = document.getElementById('favorite');
const MessageBlock = document.getElementById('message');
const search = document.getElementById('search');
let FAV_LIST = [];
let CART_LIST = [];

search.addEventListener('click', () => {
    document.location.href = '/Katalog';
})

let USER_ID = Number(localStorage.getItem('USER_ID'));
let USER_FAVORITE_LIST = null;
const user = document.getElementById('user');
const userOptions = document.getElementById('userOptions');
let toggled = false;

window.addEventListener('load', () => {
    if (USER_ID) {
        getFavoriteList();
        fetch('/CartByUser', {
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
            CART_LIST = data[0].cartlist.split(',')
        });

        fetch('/getFavoriteList', {
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
            FAV_LIST = data[0].likelist.split(',');
        })
    } else {
        document.location.href = `/Auth`;
    }
})

async function getFavoriteList() {
    FAVORITE_BLOCK.innerHTML = '';
    let bodyPOST = {
        id: USER_ID
    };

    fetch('/getFavoriteList',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyPOST)
    }).then((response) => {
        return response.json();
    }).then((data) => {
        USER_FAVORITE_LIST = data[0].likelist.split(',');
        if (USER_FAVORITE_LIST[0] == '') {
            let h2 = document.createElement('h2');
            h2.innerText = `Ваш список желаемого пуст, добавьте товар.`;
            h2.className = `h2Clear`;
            FAVORITE_BLOCK.append(h2);
        }
        USER_FAVORITE_LIST.forEach(element => {
            const FavId = Number(element);
            const FavBody = {
                id: FavId
            };
            fetch('/getFavoriteById', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(FavBody)
            }).then((response) => {
                return response.json();
            }).then((data) => {
                createElement(data[0]);
            })
        });
    });
}

function createElement(element) {
    let divItem = document.createElement('div');
    divItem.className = 'item';
    divItem.dataset.elementId = `${element.id}`;
    divItem.addEventListener('click', () => {
        document.location.href = `/AboutItem/${element.id}`;
    });

    let img = document.createElement('img');
    img.src = element.image;

    let divOverflow = document.createElement('div');
    divOverflow.className = 'overflow flex align-end justify-center';

    let divButtons = document.createElement('div');
    divButtons.className = 'buttons flex justify-center';

    let buttonRed = document.createElement('button');
    buttonRed.className = 'buttonRed';
    buttonRed.dataset.elementId = `${element.id}`;
    buttonRed.addEventListener('click', (e) => {
        e.stopPropagation();
        updateFavoriteList(e.target);
    })

    let iHeart = document.createElement('i');
    iHeart.className = 'flaticon-heart';
    iHeart.dataset.elementId = `${element.id}`;

    let buttonGreen = document.createElement('button');
    buttonGreen.className = 'buttonGreen';
    buttonGreen.dataset.baseId = `${element.id}`;
    buttonGreen.addEventListener('click', (ev) => {
        ev.stopPropagation();
        updateCard(ev.target);
    })

    let iCart = document.createElement('i');
    iCart.className = 'flaticon-shopping-cart';
    iCart.dataset.baseId = `${element.id}`;

    buttonGreen.append(iCart);
    buttonRed.append(iHeart);
    divButtons.append(buttonGreen, buttonRed);
    divOverflow.append(divButtons);
    divItem.append(img, divOverflow);

    FAVORITE_BLOCK.append(divItem);
}

async function updateFavoriteList(target) {
    let Id = target.dataset.elementId
    let index = USER_FAVORITE_LIST.indexOf(Id);
    USER_FAVORITE_LIST.splice(index, 1);
    let bodyData = {
        userId: USER_ID,
        newList: USER_FAVORITE_LIST.join()
    }
    fetch('/updateFavoriteList',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    }).then(() => {
        getFavoriteList();
        showMessage(1);
    })
}

async function updateCard(element) {
    let Id = String(element.dataset.baseId);
    if (CART_LIST.includes(Id)) {
        showMessage(4);
    } else {
        let newList;
        if (CART_LIST[0] == '') {
            CART_LIST.length = 0;
            newList = CART_LIST.join() + `${Id}`;
        } else {
            newList = CART_LIST.join() + `,${Id}`
        }
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
            showMessage(5);
        })
    }
}

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
    }
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