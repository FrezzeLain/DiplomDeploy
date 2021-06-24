var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var CURRENT_ITEM = Number(document.location.pathname.substr(11));
var ITEM_CONTENT = document.getElementById('content');
var imgContainer;
var ourImage;
window.addEventListener('load', loadItem);
function loadItem() {
    return __awaiter(this, void 0, void 0, function () {
        var promise, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/Item/" + CURRENT_ITEM, {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json; charset=utf-8'
                        }
                    })];
                case 1:
                    promise = _a.sent();
                    return [4 /*yield*/, promise.json()];
                case 2:
                    results = _a.sent();
                    console.log(results);
                    if (results) {
                        createItem(results[0]);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function createItem(item) {
    return __awaiter(this, void 0, void 0, function () {
        var Image, Image1, Image2, Image3, Image4, Title, FullDiv, Control, Default, Wall, Wall2, Wall3, Left, ImageDiv, Right, Name, SizesText, Sizes, Size1, hSize1, Size2, hSize2, Size3, hSize3, OverText, Overs, Outer1, hOuter1, Outer2, hOuter2, Buttons, Button1, i1, Button2, i2, reqBody, collection, collection_res, CollectionDiv, CollectionTitle, DivColl_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ITEM_CONTENT.innerHTML = '';
                    Image = document.createElement('img');
                    Image.src = item.image;
                    ourImage = Image;
                    Image1 = document.createElement('img');
                    Image1.src = item.image;
                    Image2 = document.createElement('img');
                    Image2.src = item.image;
                    Image3 = document.createElement('img');
                    Image3.src = item.image;
                    Image4 = document.createElement('img');
                    Image4.src = item.image;
                    Title = document.createElement('h1');
                    Title.innerText = 'Подробнее о товаре';
                    FullDiv = document.createElement('div');
                    FullDiv.className = 'flex wrap';
                    Control = document.createElement('div');
                    Control.className = 'control flex column justify-space-between';
                    Default = document.createElement('div');
                    Default.className = 'default';
                    Wall = document.createElement('div');
                    Wall.className = 'wall';
                    Wall2 = document.createElement('div');
                    Wall2.className = 'wall2';
                    Wall3 = document.createElement('div');
                    Wall3.className = 'wall3';
                    Left = document.createElement('div');
                    Left.className = 'left';
                    ImageDiv = document.createElement('div');
                    ImageDiv.className = 'imgcontainer';
                    imgContainer = ImageDiv;
                    Right = document.createElement('div');
                    Right.className = 'right';
                    Name = document.createElement('h2');
                    Name.innerText = item.name;
                    SizesText = document.createElement('h3');
                    SizesText.innerText = 'Доступные размеры';
                    Sizes = document.createElement('div');
                    Sizes.className = 'size flex';
                    Size1 = document.createElement('div');
                    Size1.className = 'item size1';
                    hSize1 = document.createElement('h4');
                    hSize1.innerText = '46 | 33';
                    Size2 = document.createElement('div');
                    Size2.className = 'item size2';
                    hSize2 = document.createElement('h4');
                    hSize2.innerText = '69 | 48';
                    Size3 = document.createElement('div');
                    Size3.className = 'item size3';
                    hSize3 = document.createElement('h4');
                    hSize3.innerText = '89 | 63';
                    OverText = document.createElement('h3');
                    OverText.innerText = 'Доступные покрытия';
                    Overs = document.createElement('div');
                    Overs.className = 'outer flex';
                    Outer1 = document.createElement('div');
                    Outer1.className = 'item outer1';
                    hOuter1 = document.createElement('h4');
                    hOuter1.innerText = 'Матовое';
                    Outer2 = document.createElement('div');
                    Outer2.className = 'item outer2';
                    hOuter2 = document.createElement('h4');
                    hOuter2.innerText = 'Глянцевое';
                    Buttons = document.createElement('div');
                    Buttons.className = 'buttons';
                    Button1 = document.createElement('button');
                    Button1.className = 'contbutton buttonGreen';
                    i1 = document.createElement('i');
                    i1.className = 'flaticon-shopping-cart';
                    Button2 = document.createElement('button');
                    Button2.className = 'contbutton buttonRed';
                    i2 = document.createElement('i');
                    i2.className = 'flaticon-heart';
                    Button2.append(i2, 'В желаемое');
                    Button1.append(i1, 'В корзину');
                    Buttons.append(Button1, Button2);
                    Outer1.append(hOuter1);
                    Outer2.append(hOuter2);
                    Overs.append(Outer1, Outer2);
                    Size1.append(hSize1);
                    Size2.append(hSize2);
                    Size3.append(hSize3);
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
                    reqBody = {
                        id: item.collection,
                        idItem: CURRENT_ITEM
                    };
                    return [4 /*yield*/, fetch("/Item/Collection", {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify(reqBody)
                        })];
                case 1:
                    collection = _a.sent();
                    return [4 /*yield*/, collection.json()];
                case 2:
                    collection_res = _a.sent();
                    console.log(collection_res);
                    if (collection_res) {
                        CollectionDiv = document.createElement('div');
                        CollectionDiv.className = 'collection';
                        CollectionTitle = document.createElement('h1');
                        CollectionTitle.innerText = 'Из этой коллекции';
                        DivColl_1 = document.createElement('div');
                        DivColl_1.className = 'slider flex';
                        CollectionDiv.append(CollectionTitle, DivColl_1);
                        collection_res.forEach(function (element) {
                            var Block = document.createElement('div');
                            Block.className = 'block';
                            Block.style.backgroundImage = "url(" + element.image + ")";
                            DivColl_1.append(Block);
                            Block.addEventListener('click', function () {
                                window.location.href = "/AboutItem/" + element.id;
                            });
                        });
                        ITEM_CONTENT.append(CollectionDiv);
                    }
                    Default.addEventListener('click', function () {
                        changeWall(1);
                    });
                    Wall.addEventListener('click', function () {
                        changeWall(2);
                    });
                    Wall2.addEventListener('click', function () {
                        changeWall(3);
                    });
                    Wall3.addEventListener('click', function () {
                        changeWall(4);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function changeWall(id) {
    switch (id) {
        case 1: {
            imgContainer.style.backgroundImage = "url(../assets/images/default.jpg)";
            ourImage.style.left = "50%";
            ourImage.style.top = '50%';
            ourImage.style.height = '72%';
            ourImage.style.transition = "0.2s linear";
            break;
        }
        case 2: {
            imgContainer.style.backgroundImage = "url(../assets/images/wall1.jpg)";
            ourImage.style.left = "45%";
            ourImage.style.top = '38%';
            ourImage.style.height = '40%';
            ourImage.style.transition = "0.2s linear";
            break;
        }
        case 3: {
            imgContainer.style.backgroundImage = "url(../assets/images/wall2.jpg)";
            ourImage.style.left = "70%";
            ourImage.style.top = '38%';
            ourImage.style.height = '40%';
            ourImage.style.transition = "0.2s linear";
            break;
        }
        case 4: {
            imgContainer.style.backgroundImage = "url(../assets/images/wall3.jpg)";
            ourImage.style.left = "33%";
            ourImage.style.top = '28%';
            ourImage.style.height = '40%';
            ourImage.style.transition = "0.2s linear";
            break;
        }
    }
}
