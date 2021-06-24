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
var USER_ID = 1;
var USER_FAVORITE_LIST = null;
window.addEventListener('load', function () {
    getFavoriteList();
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
    buttonRed.dataset.elementId = element.id;
    buttonRed.addEventListener('click', function (e) {
        e.stopPropagation();
        updateFavoriteList(e.target);
    });
    var iHeart = document.createElement('i');
    iHeart.className = 'flaticon-heart';
    iHeart.dataset.elementId = element.id;
    var buttonGreen = document.createElement('button');
    buttonGreen.className = 'buttonGreen';
    var iCart = document.createElement('i');
    iCart.className = 'flaticon-shopping-cart';
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
            });
            return [2 /*return*/];
        });
    });
}
