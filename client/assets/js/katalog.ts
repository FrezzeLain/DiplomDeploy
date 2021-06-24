const CONTENT_KATALOG = document.getElementById('content');
const COLLECTION_SEARCH : HTMLInputElement = document.getElementById('collection');
const NAME_SEARCH: HTMLInputElement = document.getElementById('name');
const CATEGORY_SEARCH : HTMLInputElement = document.getElementById('category')
localStorage.setItem('meta', '');

window.addEventListener('load', loadFunction);

async function SearchInKatalog() {
    const COLLECTION_LENGTH = COLLECTION_SEARCH.value.trim().length;
    const NAME_LENGTH = NAME_SEARCH.value.trim().length;
    const CATEGORY_LENGTH = CATEGORY_SEARCH.value.trim().length;

    if (COLLECTION_LENGTH > 2 || NAME_LENGTH > 2 || CATEGORY_LENGTH > 2) {
        const COLLECTION = COLLECTION_LENGTH > 2 ? COLLECTION_SEARCH.value.trim() : 0;
        const CATEGORY = CATEGORY_LENGTH > 2 ? CATEGORY_SEARCH.value.trim() : 0;
        const NAME = NAME_LENGTH > 2 ? NAME_SEARCH.value.trim() : 0;

        const BODY = {
            collection: COLLECTION,
            category: CATEGORY,
            name: NAME
        }

        let promise = await fetch('/katalog/search', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(BODY)
        });

        let results = await promise.json();
        
        let newMeta;    
        results.forEach(element => {
            newMeta += `${element.id}`;
        });
        if (localStorage.meta !== newMeta) {
            CONTENT_KATALOG.innerHTML = '';
            results.forEach(element => {
                createElement(element);
            });
            localStorage.setItem('meta', newMeta);
        }
    }

    if (COLLECTION_LENGTH < 3 && CATEGORY_LENGTH < 3 && NAME_LENGTH < 3) {
        let promise = await fetch('/katalog/all',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    
        let results = await promise.json();
        let newMeta;
        results.forEach(element => {
            newMeta += `${element.id}`;
        });
        if (localStorage.meta !== newMeta) {
            CONTENT_KATALOG.innerHTML = '';
            results.forEach(element => {
                createElement(element);
            });
    
            localStorage.setItem('meta', newMeta);
        }
    }
}

async function loadFunction() {

    let promise = await fetch('/katalog/all',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    });

    let results = await promise.json();

    results.forEach(element => {
        createElement(element);
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

    let iHeart = document.createElement('i');
    iHeart.className = 'flaticon-heart';

    let buttonGreen = document.createElement('button');
    buttonGreen.className = 'buttonGreen';

    let iCart = document.createElement('i');
    iCart.className = 'flaticon-shopping-cart';

    buttonGreen.append(iCart);
    buttonRed.append(iHeart);
    divButtons.append(buttonGreen, buttonRed);
    divOverflow.append(divButtons);
    divItem.append(img, divOverflow);

    CONTENT_KATALOG.append(divItem);
}