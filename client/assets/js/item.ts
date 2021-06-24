const CURRENT_ITEM = Number(document.location.pathname.substr(11));
const ITEM_CONTENT = document.getElementById('content');
let imgContainer: HTMLDivElement;
let ourImage: HTMLImageElement;

window.addEventListener('load', loadItem);

async function loadItem() {
    let promise = await fetch(`/Item/${CURRENT_ITEM}`, {
        method: 'GET',
        headers: {
            'Content-type' : 'application/json; charset=utf-8'
        }
    });

    let results = await promise.json();
    console.log(results);

    if (results) {
        createItem(results[0])
    }
}

async function createItem(item) {
    ITEM_CONTENT.innerHTML = '';

    let Image = document.createElement('img');
    Image.src = item.image;
    ourImage = Image;
    let Image1 = document.createElement('img');
    Image1.src = item.image;
    let Image2 = document.createElement('img');
    Image2.src = item.image;
    let Image3 = document.createElement('img');
    Image3.src = item.image;
    let Image4 = document.createElement('img');
    Image4.src = item.image;
    let Title = document.createElement('h1');
    Title.innerText = 'Подробнее о товаре';
    let FullDiv = document.createElement('div');
    FullDiv.className = 'flex wrap';
    let Control = document.createElement('div');
    Control.className = 'control flex column justify-space-between';
    let Default = document.createElement('div');
    Default.className = 'default';
    let Wall = document.createElement('div');
    Wall.className = 'wall';
    let Wall2 = document.createElement('div');
    Wall2.className = 'wall2';
    let Wall3 = document.createElement('div');
    Wall3.className = 'wall3';
    let Left = document.createElement('div');
    Left.className = 'left';
    let ImageDiv = document.createElement('div');
    ImageDiv.className = 'imgcontainer';
    imgContainer = ImageDiv;
    let Right = document.createElement('div');
    Right.className = 'right';
    let Name = document.createElement('h2');
    Name.innerText = item.name;
    let SizesText = document.createElement('h3');
    SizesText.innerText = 'Доступные размеры';
    let Sizes = document.createElement('div');
    Sizes.className = 'size flex';
    let Size1 = document.createElement('div');
    Size1.className = 'item size1';
    let hSize1 = document.createElement('h4');
    hSize1.innerText = '46 | 33';
    let Size2 = document.createElement('div');
    Size2.className = 'item size2';
    let hSize2 = document.createElement('h4');
    hSize2.innerText = '69 | 48';
    let Size3 = document.createElement('div');
    Size3.className = 'item size3';
    let hSize3 = document.createElement('h4');
    hSize3.innerText = '89 | 63';
    let OverText = document.createElement('h3');
    OverText.innerText = 'Доступные покрытия';
    let Overs = document.createElement('div');
    Overs.className = 'outer flex';
    let Outer1 = document.createElement('div');
    Outer1.className = 'item outer1';
    let hOuter1 = document.createElement('h4');
    hOuter1.innerText = 'Матовое';
    let Outer2 = document.createElement('div');
    Outer2.className = 'item outer2';
    let hOuter2 = document.createElement('h4');
    hOuter2.innerText = 'Глянцевое';
    let Buttons = document.createElement('div');
    Buttons.className = 'buttons';
    let Button1 = document.createElement('button');
    Button1.className = 'contbutton buttonGreen';
    let i1 = document.createElement('i');
    i1.className = 'flaticon-shopping-cart';
    let Button2 = document.createElement('button');
    Button2.className = 'contbutton buttonRed';
    let i2 = document.createElement('i');
    i2.className = 'flaticon-heart';

    Button2.append(i2, 'В желаемое');
    Button1.append(i1, 'В корзину');
    Buttons.append(Button1, Button2);
    Outer1.append(hOuter1); Outer2.append(hOuter2);
    Overs.append(Outer1, Outer2);
    Size1.append(hSize1); Size2.append(hSize2); Size3.append(hSize3);
    Sizes.append(Size1, Size2, Size3);
    Right.append(Name, SizesText, Sizes, OverText, Overs, Buttons);
    ImageDiv.append(Image);
    Left.append(ImageDiv);
    Control.append(Default, Wall, Wall2, Wall3);
    FullDiv.append(Control, Left, Right);
    Default.append(Image1);
    Wall.append(Image2);
    Wall2.append(Image3);
    Wall3.append(Image4);
    ITEM_CONTENT.append(Title, FullDiv);

    let reqBody = {
        id: item.collection,
        idItem: CURRENT_ITEM
    }

    let collection = await fetch(`/Item/Collection`, {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(reqBody)
    })

    let collection_res = await collection.json();
    console.log(collection_res);
    if (collection_res) {
        let CollectionDiv = document.createElement('div');
        CollectionDiv.className = 'collection';
        let CollectionTitle = document.createElement('h1');
        CollectionTitle.innerText = 'Из этой коллекции';
        let DivColl = document.createElement('div');
        DivColl.className = 'slider flex';
        CollectionDiv.append(CollectionTitle,DivColl);
        collection_res.forEach(element => {
            let Block = document.createElement('div');
            Block.className = 'block';
            Block.style.backgroundImage = `url(${element.image})`;
            DivColl.append(Block);
            Block.addEventListener('click', () => {
                window.location.href = `/AboutItem/${element.id}`
            });
        });
        ITEM_CONTENT.append(CollectionDiv);
    }

    Default.addEventListener('click', () => {
        changeWall(1);
    })
    Wall.addEventListener('click', () => {
        changeWall(2);
    })
    Wall2.addEventListener('click', () => {
        changeWall(3);
    })
    Wall3.addEventListener('click', () => {
        changeWall(4);
    })
}

function changeWall(id: number) {
    switch(id) {
        case 1 : {
            imgContainer.style.backgroundImage = `url(../assets/images/default.jpg)`;
            ourImage.style.left = `50%`;
            ourImage.style.top = '50%';
            ourImage.style.height = '72%';
            ourImage.style.transition = `0.2s linear`;
            break;
        }
        case 2 : {
            imgContainer.style.backgroundImage = `url(../assets/images/wall1.jpg)`;
            ourImage.style.left = `45%`;
            ourImage.style.top = '38%';
            ourImage.style.height = '40%';
            ourImage.style.transition = `0.2s linear`;
            break;
        }
        case 3 : {
            imgContainer.style.backgroundImage = `url(../assets/images/wall2.jpg)`;
            ourImage.style.left = `70%`;
            ourImage.style.top = '38%';
            ourImage.style.height = '40%';
            ourImage.style.transition = `0.2s linear`;
            break;
        }
        case 4 : {
            imgContainer.style.backgroundImage = `url(../assets/images/wall3.jpg)`;
            ourImage.style.left = `33%`;
            ourImage.style.top = '28%';
            ourImage.style.height = '40%';
            ourImage.style.transition = `0.2s linear`;
            break;
        }
    }
}