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
var FAVORITE_BLOCK = document.getElementById('favorite');
var MessageBlock = document.getElementById('message');
var search = document.getElementById('search');
var FAV_LIST = [];
var CART_LIST = [];
search.addEventListener('click', function () {
    document.location.href = '/Katalog';
});
var USER_ID = Number(localStorage.getItem('USER_ID'));
var USER_FAVORITE_LIST = null;
var user = document.getElementById('user');
var userOptions = document.getElementById('userOptions');
var toggled = false;
window.addEventListener('load', function () {
    if (USER_ID) {
        getFavoriteList();
        fetch('/CartByUser', {
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
            CART_LIST = data[0].cartlist.split(',');
        });
        fetch('/getFavoriteList', {
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
            FAV_LIST = data[0].likelist.split(',');
        });
    }
    else {
        document.location.href = "/Auth";
    }
});
function getFavoriteList() {
    return __awaiter(this, void 0, void 0, function () {
        var bodyPOST;
        return __generator(this, function (_a) {
            FAVORITE_BLOCK.innerHTML = '';
            bodyPOST = {
                id: USER_ID
            };
            fetch('/getFavoriteList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyPOST)
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                USER_FAVORITE_LIST = data[0].likelist.split(',');
                if (USER_FAVORITE_LIST[0] == '') {
                    var h2 = document.createElement('h2');
                    h2.innerText = "\u0412\u0430\u0448 \u0441\u043F\u0438\u0441\u043E\u043A \u0436\u0435\u043B\u0430\u0435\u043C\u043E\u0433\u043E \u043F\u0443\u0441\u0442, \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0442\u043E\u0432\u0430\u0440.";
                    h2.className = "h2Clear";
                    FAVORITE_BLOCK.append(h2);
                }
                USER_FAVORITE_LIST.forEach(function (element) {
                    var FavId = Number(element);
                    var FavBody = {
                        id: FavId
                    };
                    fetch('/getFavoriteById', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(FavBody)
                    }).then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        createElement(data[0]);
                    });
                });
            });
            return [2 /*return*/];
        });
    });
}
function createElement(element) {
    var divItem = document.createElement('div');
    divItem.className = 'item';
    divItem.dataset.elementId = "" + element.id;
    divItem.addEventListener('click', function () {
        document.location.href = "/AboutItem/" + element.id;
    });
    var img = document.createElement('img');
    img.src = element.image;
    var divOverflow = document.createElement('div');
    divOverflow.className = 'overflow flex align-end justify-center';
    var divButtons = document.createElement('div');
    divButtons.className = 'buttons flex justify-center';
    var buttonRed = document.createElement('button');
    buttonRed.className = 'buttonRed';
    buttonRed.dataset.elementId = "" + element.id;
    buttonRed.addEventListener('click', function (e) {
        e.stopPropagation();
        updateFavoriteList(e.target);
    });
    var iHeart = document.createElement('i');
    iHeart.className = 'flaticon-heart';
    iHeart.dataset.elementId = "" + element.id;
    var buttonGreen = document.createElement('button');
    buttonGreen.className = 'buttonGreen';
    buttonGreen.dataset.baseId = "" + element.id;
    buttonGreen.addEventListener('click', function (ev) {
        ev.stopPropagation();
        updateCard(ev.target);
    });
    var iCart = document.createElement('i');
    iCart.className = 'flaticon-shopping-cart';
    iCart.dataset.baseId = "" + element.id;
    buttonGreen.append(iCart);
    buttonRed.append(iHeart);
    divButtons.append(buttonGreen, buttonRed);
    divOverflow.append(divButtons);
    divItem.append(img, divOverflow);
    FAVORITE_BLOCK.append(divItem);
}
function updateFavoriteList(target) {
    return __awaiter(this, void 0, void 0, function () {
        var Id, index, bodyData;
        return __generator(this, function (_a) {
            Id = target.dataset.elementId;
            index = USER_FAVORITE_LIST.indexOf(Id);
            USER_FAVORITE_LIST.splice(index, 1);
            bodyData = {
                userId: USER_ID,
                newList: USER_FAVORITE_LIST.join()
            };
            fetch('/updateFavoriteList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            }).then(function () {
                getFavoriteList();
                showMessage(1);
            });
            return [2 /*return*/];
        });
    });
}
function updateCard(element) {
    return __awaiter(this, void 0, void 0, function () {
        var Id, newList_1;
        return __generator(this, function (_a) {
            Id = String(element.dataset.baseId);
            if (CART_LIST.includes(Id)) {
                showMessage(4);
            }
            else {
                if (CART_LIST[0] == '') {
                    CART_LIST.length = 0;
                    newList_1 = CART_LIST.join() + ("" + Id);
                }
                else {
                    newList_1 = CART_LIST.join() + ("," + Id);
                }
                fetch('/updateCard', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ cartList: newList_1, user: USER_ID })
                })
                    .then(function (resolve) {
                    return resolve.json();
                })
                    .then(function (data) {
                    CART_LIST = newList_1.split(',');
                    showMessage(5);
                });
            }
            return [2 /*return*/];
        });
    });
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
    }
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
