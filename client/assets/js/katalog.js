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
var CONTENT_KATALOG = document.getElementById('content');
var COLLECTION_SEARCH = document.getElementById('collection');
var NAME_SEARCH = document.getElementById('name');
var CATEGORY_SEARCH = document.getElementById('category');
localStorage.setItem('meta', '');
var MessageBlock = document.getElementById('message');
var USER_ID = Number(localStorage.getItem('USER_ID'));
var FAV_LIST = [];
var CART_LIST = [];
var user = document.getElementById('user');
var userOptions = document.getElementById('userOptions');
var toggled = false;
window.addEventListener('load', function () {
    loadFunction();
    if (USER_ID) {
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
});
function SearchInKatalog() {
    return __awaiter(this, void 0, void 0, function () {
        var COLLECTION_LENGTH, NAME_LENGTH, CATEGORY_LENGTH, COLLECTION, CATEGORY, NAME, BODY, promise, results, newMeta_1, promise, results, newMeta_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    COLLECTION_LENGTH = COLLECTION_SEARCH.value.trim().length;
                    NAME_LENGTH = NAME_SEARCH.value.trim().length;
                    CATEGORY_LENGTH = CATEGORY_SEARCH.value.trim().length;
                    if (!(COLLECTION_LENGTH > 2 || NAME_LENGTH > 2 || CATEGORY_LENGTH > 2)) return [3 /*break*/, 3];
                    COLLECTION = COLLECTION_LENGTH > 2 ? COLLECTION_SEARCH.value.trim() : 0;
                    CATEGORY = CATEGORY_LENGTH > 2 ? CATEGORY_SEARCH.value.trim() : 0;
                    NAME = NAME_LENGTH > 2 ? NAME_SEARCH.value.trim() : 0;
                    BODY = {
                        collection: COLLECTION,
                        category: CATEGORY,
                        name: NAME
                    };
                    return [4 /*yield*/, fetch('/katalog/search', {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify(BODY)
                        })];
                case 1:
                    promise = _a.sent();
                    return [4 /*yield*/, promise.json()];
                case 2:
                    results = _a.sent();
                    results.forEach(function (element) {
                        newMeta_1 += "" + element.id;
                    });
                    if (localStorage.meta !== newMeta_1) {
                        CONTENT_KATALOG.innerHTML = '';
                        results.forEach(function (element) {
                            createElement(element);
                        });
                        localStorage.setItem('meta', newMeta_1);
                    }
                    _a.label = 3;
                case 3:
                    if (!(COLLECTION_LENGTH < 3 && CATEGORY_LENGTH < 3 && NAME_LENGTH < 3)) return [3 /*break*/, 6];
                    return [4 /*yield*/, fetch('/katalog/all', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            }
                        })];
                case 4:
                    promise = _a.sent();
                    return [4 /*yield*/, promise.json()];
                case 5:
                    results = _a.sent();
                    results.forEach(function (element) {
                        newMeta_2 += "" + element.id;
                    });
                    if (localStorage.meta !== newMeta_2) {
                        CONTENT_KATALOG.innerHTML = '';
                        results.forEach(function (element) {
                            createElement(element);
                        });
                        localStorage.setItem('meta', newMeta_2);
                    }
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
function loadFunction() {
    return __awaiter(this, void 0, void 0, function () {
        var promise, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/katalog/all', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        }
                    })];
                case 1:
                    promise = _a.sent();
                    return [4 /*yield*/, promise.json()];
                case 2:
                    results = _a.sent();
                    results.forEach(function (element) {
                        createElement(element);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function createElement(element) {
    var divItem = document.createElement('div');
    divItem.className = 'item';
    divItem.dataset.elementId = element.id;
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
    buttonRed.dataset.baseId = "" + element.id;
    buttonRed.addEventListener('click', function (ev) {
        ev.stopPropagation();
        updateFavorite(ev.target);
    });
    var iHeart = document.createElement('i');
    iHeart.className = 'flaticon-heart';
    iHeart.dataset.baseId = "" + element.id;
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
    CONTENT_KATALOG.append(divItem);
}
function updateCard(element) {
    return __awaiter(this, void 0, void 0, function () {
        var Id, newList_1;
        return __generator(this, function (_a) {
            if (USER_ID) {
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
            }
            else {
                document.location.href = "/Auth";
            }
            return [2 /*return*/];
        });
    });
}
function updateFavorite(element) {
    return __awaiter(this, void 0, void 0, function () {
        var Id, newList_2;
        return __generator(this, function (_a) {
            if (USER_ID) {
                Id = String(element.dataset.baseId);
                if (FAV_LIST.includes(Id)) {
                    showMessage(2);
                }
                else {
                    if (FAV_LIST[0] == '') {
                        FAV_LIST.length = 0;
                        newList_2 = FAV_LIST.join() + ("" + Id);
                    }
                    else {
                        newList_2 = FAV_LIST.join() + ("," + Id);
                    }
                    fetch('/updateFavoriteList', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({ userId: USER_ID, newList: newList_2 })
                    })
                        .then(function (resolve) {
                        return resolve.json();
                    })
                        .then(function (data) {
                        FAV_LIST = newList_2.split(',');
                        showMessage(3);
                    });
                }
            }
            else {
                document.location.href = "/Auth";
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
