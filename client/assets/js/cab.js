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
var FAVORITE_BLOCK = document.getElementById('orders');
var search = document.getElementById('search');
var FAV_LIST = [];
var CART_LIST = [];
var ORD_LIST = [];
search.addEventListener('click', function () {
    document.location.href = '/Katalog';
});
var USER_ID = Number(localStorage.getItem('USER_ID'));
var user = document.getElementById('user');
var userOptions = document.getElementById('userOptions');
var toggled = false;
window.addEventListener('load', function () {
    if (USER_ID) {
        getOrdersList();
    }
    else {
        document.location.href = "/Auth";
    }
});
function getOrdersList() {
    return __awaiter(this, void 0, void 0, function () {
        var bodyPOST;
        return __generator(this, function (_a) {
            FAVORITE_BLOCK.innerHTML = '';
            bodyPOST = {
                id: USER_ID
            };
            fetch('/getOrderList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyPOST)
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                ORD_LIST = data;
                if (ORD_LIST.length == 0) {
                    var h2 = document.createElement('h2');
                    h2.innerText = "\u0423 \u0432\u0430\u0441 \u043F\u043E\u043A\u0430 \u0435\u0449\u0451 \u043D\u0435 \u0431\u044B\u043B\u043E \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u0437\u0430\u043A\u0430\u0437\u043E\u0432.";
                    h2.className = "h2Clear";
                    FAVORITE_BLOCK.append(h2);
                }
                else {
                    ORD_LIST.forEach(function (element) {
                        createElement(element);
                    });
                }
            });
            return [2 /*return*/];
        });
    });
}
function createElement(element) {
    var Item = document.createElement('div');
    Item.className = 'item flex column align-center justify-center';
    var h2 = document.createElement('h2');
    h2.textContent = "\u0417\u0430\u043A\u0430\u0437 \u2116" + element.id;
    var Info = document.createElement('div');
    Info.className = 'info flex column align-center justify-center';
    var h31 = document.createElement('h3');
    h31.textContent = element.price + " \u0420";
    var h32 = document.createElement('h3');
    h32.textContent = "" + element.state;
    Info.append(h31, h32);
    Item.append(h2, Info);
    FAVORITE_BLOCK.append(Item);
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
