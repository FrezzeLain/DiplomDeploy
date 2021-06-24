
    /* Считываем начальные данные - START */

    const HOVER_ARRAY : NodeListOf<HTMLHeadingElement> = document.querySelectorAll('.HoverElement');
    const HoverLine : HTMLDivElement | HTMLElement = document.getElementById('LineMenu');
    const MenuHover: HTMLDivElement | HTMLElement = document.getElementById('MenuHover');
    const miniNews: HTMLDivElement | HTMLElement = document.getElementById('miniNews');
    const mainNew: HTMLDivElement | HTMLElement = document.getElementById('mainNew');
    const TOP_ITEMS: HTMLDivElement | HTMLElement = document.getElementById('TOP_ITEMS');

    /* Считываем начальные данные - END */

    window.addEventListener('load', () => {
        const currentWidth = HOVER_ARRAY[0].offsetWidth;
        const currentLeft = HOVER_ARRAY[0].offsetLeft;
        HoverLine.style.width = `${currentWidth}px`;
        HoverLine.style.left = `${currentLeft}px`;
        getNews();
        loadTop();
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
    
        TOP_ITEMS.append(divItem);
    }