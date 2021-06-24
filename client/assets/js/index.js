/* Считываем начальные данные - START */
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
var HOVER_ARRAY = document.querySelectorAll('.HoverElement');
var HoverLine = document.getElementById('LineMenu');
var MenuHover = document.getElementById('MenuHover');
var miniNews = document.getElementById('miniNews');
var mainNew = document.getElementById('mainNew');
var TOP_ITEMS = document.getElementById('TOP_ITEMS');
/* Считываем начальные данные - END */
window.addEventListener('load', function () {
    var currentWidth = HOVER_ARRAY[0].offsetWidth;
    var currentLeft = HOVER_ARRAY[0].offsetLeft;
    HoverLine.style.width = currentWidth + "px";
    HoverLine.style.left = currentLeft + "px";
    getNews();
    loadTop();
});
HOVER_ARRAY.forEach(function (element) {
    element.addEventListener('mouseover', function (ev) {
        var newWidth = ev.target.offsetWidth;
        var newLeft = ev.target.offsetLeft;
        HoverLine.style.left = newLeft + "px";
        HoverLine.style.width = newWidth + "px";
    });
});
MenuHover.addEventListener('mouseout', function (ev) {
    if (ev.relatedTarget !== MenuHover) {
        HoverLine.style.left = '0px';
        HoverLine.style.width = HOVER_ARRAY[0].offsetWidth + "px";
    }
});
/* Начальные запросы при загрузке страницы */
function getNews() {
    return __awaiter(this, void 0, void 0, function () {
        var response, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/getNews', {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json'
                        }
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    results = _a.sent();
                    results.forEach(function (element) {
                        if (element.Type === 'Main') {
                            var Div = document.createElement('div');
                            Div.className = 'main_new';
                            Div.style.backgroundImage = "url(" + element.Image + ")";
                            Div.addEventListener('click', function () {
                                document.location.href = element.Href;
                            });
                            mainNew.prepend(Div);
                        }
                        else {
                            var Div = document.createElement('div');
                            Div.className = 'slider_part';
                            var Image_1 = document.createElement('div');
                            Image_1.className = 'imageSlide';
                            Image_1.style.backgroundImage = "url(" + element.Image + ")";
                            var hItem = document.createElement('h2');
                            hItem.className = 'h2Slide';
                            hItem.textContent = "" + element.Title;
                            var pItem = document.createElement('p');
                            pItem.className = 'pSlide';
                            pItem.textContent = "" + element.Description;
                            Div.append(Image_1, hItem, pItem);
                            miniNews.append(Div);
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
;
function loadTop() {
    return __awaiter(this, void 0, void 0, function () {
        var response, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/getTopItems', {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json'
                        }
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    results = _a.sent();
                    results.forEach(function (element) {
                        createTopItem(element);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function createTopItem(element) {
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
    var iHeart = document.createElement('i');
    iHeart.className = 'flaticon-heart';
    var buttonGreen = document.createElement('button');
    buttonGreen.className = 'buttonGreen';
    var iCart = document.createElement('i');
    iCart.className = 'flaticon-shopping-cart';
    buttonGreen.append(iCart);
    buttonRed.append(iHeart);
    divButtons.append(buttonGreen, buttonRed);
    divOverflow.append(divButtons);
    divItem.append(img, divOverflow);
    TOP_ITEMS.append(divItem);
}
