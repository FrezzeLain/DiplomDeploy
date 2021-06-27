var MessageBlock = document.getElementById('message');
var Submit = document.getElementById('sub');
var Login = document.getElementById('login');
var Password = document.getElementById('pass');
Submit.addEventListener('click', function () {
    var ValuePass = Password.value.trim();
    var ValueLogin = Login.value.trim();
    if (ValuePass.length >= 5 && ValueLogin.length >= 5) {
        fetch('/TryAuth', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ login: ValueLogin, password: ValuePass })
        })
            .then(function (resolve) {
            return resolve.json();
        })
            .then(function (data) {
            if (data[0]) {
                localStorage.setItem('USER_ID', "" + data[0].id);
                document.location.href = "/";
            }
            else {
                showMessage(6);
            }
        });
    }
    else {
        showMessage(7);
    }
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
            MessageBlock.childNodes[1].textContent = 'Пользователь не найден';
            MessageBlock.childNodes[3].style.display = 'none';
            MessageBlock.style.opacity = "1";
            MessageBlock.style.transition = '1s linear';
            setTimeout(function () {
                MessageBlock.style.opacity = '0';
            }, 3000);
            break;
        case 7:
            MessageBlock.childNodes[1].textContent = 'Значения логина и пароля должны содержать не менее 5 символов';
            MessageBlock.childNodes[3].style.display = 'none';
            MessageBlock.style.opacity = "1";
            MessageBlock.style.transition = '1s linear';
            setTimeout(function () {
                MessageBlock.style.opacity = '0';
            }, 3000);
            break;
    }
}
