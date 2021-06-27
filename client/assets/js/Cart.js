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
var CONTENT = document.getElementById('Content');
var USER_ID = Number(localStorage.getItem('USER_ID'));
var rightBlock = document.getElementById('res');
var USER_CART_LIST = [];
var DEFAULT_PRICE = 3200;
var MessageBlock = document.getElementById('message');
var ITEMS_LIST = [];
var CART_LIST = [];
var FAV_LIST = [];
var ResultPrice = document.getElementById('lastPrice');
var RESULT_PTICE = 0;
var MINI_PRICE = document.getElementById('mini');
var search = document.getElementById('search');
search.addEventListener('click', function () {
    document.location.href = '/Katalog';
});
var user = document.getElementById('user');
var userOptions = document.getElementById('userOptions');
var toggled = false;
var BuyButton = document.getElementById('buy');
window.addEventListener('load', function () {
    if (USER_ID) {
        loadCart();
    }
    else {
        document.location.href = '/Auth';
    }
});
function loadCart() {
    return __awaiter(this, void 0, void 0, function () {
        var body;
        return __generator(this, function (_a) {
            CONTENT.innerHTML = '';
            body = {
                id: USER_ID
            };
            fetch('CartByUser', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
                .then(function (resolve) {
                return resolve.json();
            })
                .then(function (data) {
                USER_CART_LIST = data[0].cartlist.split(',');
                if (USER_CART_LIST[0] == '') {
                    var h2 = document.createElement('h2');
                    h2.innerText = "\u0412\u0430\u0448\u0430 \u043A\u043E\u0440\u0437\u0438\u043D\u0430 \u043F\u0443\u0441\u0442\u0430, \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0442\u043E\u0432\u0430\u0440.";
                    h2.className = "h2Clear";
                    CONTENT.append(h2);
                    rightBlock.innerHTML = '';
                    rightBlock.style.border = "none";
                }
                else {
                    USER_CART_LIST.forEach(function (element) {
                        var id = Number(element);
                        fetch('/getFavoriteByID', {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify({ id: id })
                        })
                            .then(function (resolve) {
                            return resolve.json();
                        })
                            .then(function (data) {
                            createElement(data[0]);
                            ResultPrice.innerText = "\u0418\u0442\u043E\u0433\u043E\u0432\u0430\u044F \u0446\u0435\u043D\u0430: " + RESULT_PTICE + " \u20BD";
                        });
                    });
                }
            });
            return [2 /*return*/];
        });
    });
}
function createElement(element) {
    var Item = document.createElement('div');
    Item.dataset.id = "" + ITEMS_LIST.length;
    ITEMS_LIST.push({
        id: element.id,
        type: 1,
        size: 1,
        name: element.name
    });
    var index = ITEMS_LIST.length - 1;
    Item.className = 'product flex wrap';
    var Image = document.createElement('div');
    Image.style.backgroundImage = "url(" + element.image + ")";
    Image.className = 'image';
    Image.addEventListener('click', function () {
        window.location.href = "/AboutItem/" + element.id;
    });
    var Details = document.createElement('div');
    Details.className = 'details flex column justify-space-between';
    var h2_1 = document.createElement('h2');
    h2_1.textContent = 'Тип покрытия';
    var param_1 = document.createElement('div');
    param_1.className = 'flex param';
    var choice1 = document.createElement('div');
    choice1.className = 'choice active flex justify-center align-center';
    choice1.addEventListener('click', function (e) {
        changeType(e.target);
    });
    var h4_1 = document.createElement('h4');
    h4_1.textContent = 'Матовое';
    choice1.dataset.itemId = "" + index;
    choice1.dataset.paramId = '1';
    h4_1.dataset.itemId = "" + index;
    h4_1.dataset.paramId = '1';
    var choice2 = document.createElement('div');
    choice2.className = 'choice flex justify-center align-center';
    choice2.addEventListener('click', function (e) {
        changeType(e.target);
    });
    var h4_2 = document.createElement('h4');
    h4_2.textContent = 'Глянцевое';
    choice2.dataset.itemId = "" + index;
    choice2.dataset.paramId = '2';
    h4_2.dataset.itemId = "" + index;
    h4_2.dataset.paramId = '2';
    var h2_2 = document.createElement('h2');
    h2_2.textContent = 'Размер';
    var param_2 = document.createElement('div');
    param_2.className = 'flex param sizes';
    var choice3 = document.createElement('div');
    choice3.className = 'choice active flex justify-center align-center';
    choice3.addEventListener('click', function (e) {
        changeSize(e.target);
    });
    var h4_3 = document.createElement('h4');
    h4_3.textContent = '46 | 33';
    choice3.dataset.itemId = "" + index;
    choice3.dataset.paramId = '1';
    h4_3.dataset.itemId = "" + index;
    h4_3.dataset.paramId = '1';
    var choice4 = document.createElement('div');
    choice4.className = 'choice flex justify-center align-center';
    choice4.addEventListener('click', function (e) {
        changeSize(e.target);
    });
    var h4_4 = document.createElement('h4');
    h4_4.textContent = '69 | 48';
    choice4.dataset.itemId = "" + index;
    choice4.dataset.paramId = '2';
    h4_4.dataset.itemId = "" + index;
    h4_4.dataset.paramId = '2';
    var choice5 = document.createElement('div');
    choice5.className = 'choice flex justify-center align-center';
    choice5.addEventListener('click', function (e) {
        changeSize(e.target);
    });
    var h4_5 = document.createElement('h4');
    h4_5.textContent = '89 | 63';
    choice5.dataset.itemId = "" + index;
    choice5.dataset.paramId = '3';
    h4_5.dataset.itemId = "" + index;
    h4_5.dataset.paramId = '3';
    var Buttons = document.createElement('div');
    Buttons.className = 'buttons flex align-end justify-end';
    var button = document.createElement('button');
    button.className = 'buttonRed';
    button.dataset.dataBaseId = element.id;
    button.dataset.itemId = "" + index;
    button.addEventListener('click', function (ev) {
        deleteItem(ev.target);
    });
    var iDelete = document.createElement('i');
    iDelete.className = 'flaticon-trash-bin';
    iDelete.title = 'Удалить из корзины';
    iDelete.dataset.dataBaseId = element.id;
    iDelete.dataset.itemId = "" + index;
    Buttons.append(button);
    button.append(iDelete);
    param_2.append(choice3, choice4, choice5);
    choice3.append(h4_3);
    choice4.append(h4_4);
    choice5.append(h4_5);
    param_1.append(choice1, choice2);
    choice1.append(h4_1);
    choice2.append(h4_2);
    Details.append(h2_1, param_1, h2_2, param_2, Buttons);
    Item.append(Image, Details);
    CONTENT.append(Item);
    getFullPrice();
}
function getPrice(element) {
    var type = element.type;
    var size = element.size;
    var sizePrice, typePrice;
    switch (size) {
        case 1: {
            sizePrice = DEFAULT_PRICE;
            break;
        }
        case 2: {
            sizePrice = DEFAULT_PRICE * 2;
            break;
        }
        case 3: {
            sizePrice = DEFAULT_PRICE * 3;
            break;
        }
    }
    typePrice = type === 1 ? 0 : sizePrice * 0.2;
    return sizePrice + typePrice;
}
function changeType(el) {
    var itemId = el.dataset.itemId;
    var paramId = el.dataset.paramId;
    ITEMS_LIST[itemId].type = Number(paramId);
    var CLassL = el.classList.length;
    if (CLassL) {
        el.parentNode.childNodes.forEach(function (element) {
            if (element.classList.contains('active')) {
                element.classList.remove('active');
            }
        });
        el.classList.add('active');
    }
    else {
        el.parentNode.parentNode.childNodes.forEach(function (element) {
            if (element.classList.contains('active')) {
                element.classList.remove('active');
            }
        });
        el.parentNode.classList.add('active');
    }
    getFullPrice();
}
function changeSize(el) {
    var itemId = el.dataset.itemId;
    var paramId = el.dataset.paramId;
    ITEMS_LIST[itemId].size = Number(paramId);
    var CLassL = el.classList.length;
    if (CLassL) {
        el.parentNode.childNodes.forEach(function (element) {
            if (element.classList.contains('active')) {
                element.classList.remove('active');
            }
        });
        el.classList.add('active');
    }
    else {
        el.parentNode.parentNode.childNodes.forEach(function (element) {
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
    var result = 0;
    ITEMS_LIST.forEach(function (element) {
        var Price = getPrice(element);
        result += Price;
        var Type = getType(element);
        var Size = getSize(element);
        var miniItem = document.createElement('div');
        miniItem.className = 'miniItem flex column';
        var h3Title = document.createElement('h3');
        h3Title.textContent = "" + element.name;
        var h3Type = document.createElement('h3');
        h3Type.textContent = "\u0422\u0438\u043F \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u044F: " + Type;
        var h3Size = document.createElement('h3');
        h3Size.className = 'Size';
        h3Size.textContent = "\u0420\u0430\u0437\u043C\u0435\u0440: " + Size;
        var h3Price = document.createElement('h3');
        h3Price.className = 'Price';
        h3Price.textContent = "\u0426\u0435\u043D\u0430: " + Price;
        miniItem.append(h3Title, h3Type, h3Size, h3Price);
        MINI_PRICE.append(miniItem);
    });
    RESULT_PTICE = result;
    ResultPrice.innerText = "\u0418\u0442\u043E\u0433\u043E\u0432\u0430\u044F \u0446\u0435\u043D\u0430: " + RESULT_PTICE + " \u20BD";
}
function getType(el) {
    if (el.type == 1)
        return 'Матовый';
    return 'Глянцевый';
}
function getSize(el) {
    if (el.size == 1)
        return '46 | 33';
    if (el.size == 2)
        return '69 | 48';
    return '89 | 63';
}
function deleteItem(item) {
    return __awaiter(this, void 0, void 0, function () {
        var BaseId, itemId, index, stringBody;
        return __generator(this, function (_a) {
            BaseId = item.dataset.dataBaseId;
            itemId = item.dataset.itemId;
            index = USER_CART_LIST.indexOf(BaseId);
            USER_CART_LIST.splice(index, 1);
            stringBody = USER_CART_LIST.join();
            fetch('/updateCard', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ cartList: stringBody, user: USER_ID })
            }).then(function () {
                loadCart();
                ITEMS_LIST = [];
                getFullPrice();
            });
            return [2 /*return*/];
        });
    });
}
user.addEventListener('click', function () {
    if (USER_ID) {
        if (toggled) {
            userOptions.style.display = 'none';
            toggled = !toggled;
        }
        else {
            userOptions.innerHTML = "";
            userOptions.style.display = "block";
            var Cabinet = document.createElement('h2');
            Cabinet.innerText = "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0437\u0430\u043A\u0430\u0437\u043E\u0432";
            userOptions.append(Cabinet);
            Cabinet.addEventListener('click', function () {
                document.location.href = "/Cabinet";
            });
            var Exit = document.createElement('h2');
            Exit.innerText = 'Выйти';
            userOptions.append(Exit);
            Exit.addEventListener('click', function () {
                localStorage.setItem('USER_ID', '0');
                FAV_LIST.length = 0;
                CART_LIST.length = 0;
                document.location.href = "/";
            });
            toggled = !toggled;
        }
    }
    else {
        document.location.href = "/Auth";
    }
});
BuyButton.addEventListener('click', function () {
    var id = Date.now().toString();
    var price = RESULT_PTICE;
    var user = USER_ID;
    var mail;
    fetch('/getUserById', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ id: USER_ID })
    })
        .then(function (resolve) {
        return resolve.json();
    })
        .then(function (data) {
        mail = data[0].mail;
        fetch('/addOrder', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ id: id, price: price, user: user })
        })
            .then(function (resolve) {
            return resolve.json();
        })
            .then(function (data) {
            fetch('/sendMail', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ id: id, mail: mail })
            });
            var newList = '';
            fetch('/updateCard', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ cartList: newList, user: USER_ID })
            })
                .then(function (resolve) {
                return resolve.json();
            })
                .then(function (data) {
                CART_LIST = newList.split(',');
                loadCart();
                showMessage(6);
            });
        });
    });
});
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
            }
            else {
                MessageBlock.classList.add('ActiveMS');
            }
            break;
        case 2:
            MessageBlock.childNodes[1].textContent = 'Товар уже есть в вашем списке желаемого';
            MessageBlock.childNodes[3].style.display = 'none';
            MessageBlock.style.opacity = "1";
            MessageBlock.style.transition = '1s linear';
            setTimeout(function () {
                MessageBlock.style.opacity = '0';
            }, 3000);
            break;
        case 3:
            MessageBlock.childNodes[1].textContent = 'Товар добавлен в ваш список желаемого';
            MessageBlock.childNodes[3].style.display = 'none';
            MessageBlock.style.opacity = "1";
            MessageBlock.style.transition = '1s linear';
            setTimeout(function () {
                MessageBlock.style.opacity = '0';
            }, 3000);
            break;
        case 4:
            MessageBlock.childNodes[1].textContent = 'Товар уже есть в вашей корзине';
            MessageBlock.childNodes[3].style.display = 'none';
            MessageBlock.style.opacity = "1";
            MessageBlock.style.transition = '1s linear';
            setTimeout(function () {
                MessageBlock.style.opacity = '0';
            }, 3000);
            break;
        case 5:
            MessageBlock.childNodes[1].textContent = 'Товар добавлен в корзину';
            MessageBlock.childNodes[3].style.display = 'none';
            MessageBlock.style.opacity = "1";
            MessageBlock.style.transition = '1s linear';
            setTimeout(function () {
                MessageBlock.style.opacity = '0';
            }, 3000);
            break;
        case 6:
            MessageBlock.childNodes[1].textContent = 'Заказ добален на страницу заказов';
            MessageBlock.childNodes[3].style.display = 'none';
            MessageBlock.style.opacity = "1";
            MessageBlock.style.transition = '1s linear';
            setTimeout(function () {
                MessageBlock.style.opacity = '0';
            }, 3000);
            break;
    }
}
