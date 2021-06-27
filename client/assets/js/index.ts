    /* Считываем начальные данные - START */
    const HOVER_ARRAY : NodeListOf<HTMLHeadingElement> = document.querySelectorAll('.HoverElement');
    const HoverLine : HTMLDivElement | HTMLElement = document.getElementById('LineMenu');
    const MenuHover: HTMLDivElement | HTMLElement = document.getElementById('MenuHover');
    const miniNews: HTMLDivElement | HTMLElement = document.getElementById('miniNews');
    const mainNew: HTMLDivElement | HTMLElement = document.getElementById('mainNew');
    const TOP_ITEMS: HTMLDivElement | HTMLElement = document.getElementById('TOP_ITEMS');
    const Search = document.getElementById('search');
    Search.addEventListener('click', () => {
        document.location.href = '/Katalog';
    });
    const MessageBlock = document.getElementById('message');
    let USER_ID = Number(localStorage.getItem('USER_ID'));
    let FAV_LIST = [];
    let CART_LIST = [];
    const user = document.getElementById('user');
    const userOptions = document.getElementById('userOptions');
    let toggled = false;

    /* Считываем начальные данные - END */

    window.addEventListener('load', () => {
        const currentWidth = HOVER_ARRAY[0].offsetWidth;
        const currentLeft = HOVER_ARRAY[0].offsetLeft;
        HoverLine.style.width = `${currentWidth}px`;
        HoverLine.style.left = `${currentLeft}px`;
        getNews();
        loadTop();
        if (USER_ID) {
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
        }
    });

    HOVER_ARRAY.forEach(element => {
         element.addEventListener('mouseover', (ev)=> {
             const newWidth = ev.target.offsetWidth;
             const newLeft = ev.target.offsetLeft;

             HoverLine.style.left = `${newLeft}px`;
             HoverLine.style.width = `${newWidth}px`;
         });
    });

    MenuHover.addEventListener('mouseout', (ev) => {
        if(ev.relatedTarget !== MenuHover) {
            HoverLine.style.left = '0px';
            HoverLine.style.width = `${HOVER_ARRAY[0].offsetWidth}px`;
        }
    })

    /* Начальные запросы при загрузке страницы */
    
    async function getNews(){
        let response = await fetch('/getNews', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });

        let results = await response.json();
        
        results.forEach(element => {
            if (element.Type === 'Main') {
                let Div = document.createElement('div');
                Div.className = 'main_new';
                Div.style.backgroundImage = `url(${element.Image})`
                Div.addEventListener('click', () => {
                    document.location.href = element.Href;
                });
                mainNew.prepend(Div);
            } else {
                let Div = document.createElement('div');
                Div.className = 'slider_part';
                Div.addEventListener('click', () => {
                    document.location.href = element.Href;
                });
                let Image = document.createElement('div');
                Image.className = 'imageSlide';
                Image.style.backgroundImage = `url(${element.Image})`;
                let hItem = document.createElement('h2');
                hItem.className = 'h2Slide';
                hItem.textContent = `${element.Title}`;
                let pItem = document.createElement('p');
                pItem.className = 'pSlide';
                pItem.textContent = `${element.Description}`;
                Div.append(Image, hItem, pItem);
                miniNews.append(Div);
            }

        });
    };

    async function loadTop() {
        let response = await fetch('/getTopItems', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });

        let results = await response.json();
        results.forEach(element => {
            createTopItem(element);
        });
    }
   
    function createTopItem(element) {
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
        buttonRed.dataset.baseId = `${element.id}`
        buttonRed.addEventListener('click', (ev) => {
            ev.stopPropagation();
            updateFavorite(ev.target);
        })
    
        let iHeart = document.createElement('i');
        iHeart.className = 'flaticon-heart';
        iHeart.dataset.baseId = `${element.id}`;
    
        let buttonGreen = document.createElement('button');
        buttonGreen.className = 'buttonGreen';
        buttonGreen.dataset.baseId = `${element.id}`;
        buttonGreen.addEventListener('click', (ev) => {
            ev.stopPropagation();
            updateCard(ev.target);
        });
    
        let iCart = document.createElement('i');
        iCart.className = 'flaticon-shopping-cart';
        iCart.dataset.baseId = `${element.id}`;

        buttonGreen.append(iCart);
        buttonRed.append(iHeart);
        divButtons.append(buttonGreen, buttonRed);
        divOverflow.append(divButtons);
        divItem.append(img, divOverflow);
    
        TOP_ITEMS.append(divItem);
    }

    async function updateCard(element) {
        if (USER_ID) {
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
        } else {
            document.location.href = `/Auth`;
        }
    }

    async function updateFavorite(element) {
        if(USER_ID) {
            let Id = String(element.dataset.baseId);
            if (FAV_LIST.includes(Id)) {
            showMessage(2);
            } else {
                let newList;
                if (FAV_LIST[0] == '') {
                    FAV_LIST.length = 0;
                    newList = FAV_LIST.join() + `${Id}`;
                } else {
                    newList = FAV_LIST.join() + `,${Id}`
                }
                fetch('/updateFavoriteList', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({userId: USER_ID, newList: newList})
                })
                .then((resolve) => {
                    return resolve.json();
                })
                .then((data) => {
                    FAV_LIST = newList.split(',');
                    showMessage(3);
                })
            }
        } else {
            document.location.href = `/Auth`;
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