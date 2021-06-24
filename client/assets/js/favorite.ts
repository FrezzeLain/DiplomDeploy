const FAVORITE_BLOCK = document.getElementById('favorite');

const USER_ID = 1;
let USER_FAVORITE_LIST = null;

window.addEventListener('load', () => {
    getFavoriteList();
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
    divItem.dataset.elementId = element.id;
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
    buttonRed.dataset.elementId = element.id;
    buttonRed.addEventListener('click', (e) => {
        e.stopPropagation();
        updateFavoriteList(e.target);
    })

    let iHeart = document.createElement('i');
    iHeart.className = 'flaticon-heart';
    iHeart.dataset.elementId = element.id;

    let buttonGreen = document.createElement('button');
    buttonGreen.className = 'buttonGreen';

    let iCart = document.createElement('i');
    iCart.className = 'flaticon-shopping-cart';

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
    })
}