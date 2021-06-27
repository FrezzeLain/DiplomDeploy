var Submit = document.getElementById('sub');
var Login = document.getElementById('login');
var Mail = document.getElementById('mail');
var Password = document.getElementById('pass');
var RePassword = document.getElementById('pass2');
var MessageBlock = document.getElementById('message');
Submit.addEventListener('click', function () {
    var LogValue = Login.value.trim();
    var MailValue = Mail.value.trim();
    var PassValue = Password.value.trim();
    var RePassValue = RePassword.value.trim();
    if (PassValue === RePassValue) {
        if (MailValue.indexOf('@mail.ru') > -1 || MailValue.indexOf('@gmail.com') > -1) {
            fetch('/getUserByMail', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ mail: MailValue })
            })
                .then(function (resolve) {
                return resolve.json();
            })
                .then(function (data) {
                if (data[0]) {
                    showMessage(10);
                }
                else {
                    fetch('/getUserByLogin', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({ login: LogValue })
                    })
                        .then(function (resolve) {
                        return resolve.json();
                    })
                        .then(function (data) {
                        if (data[0]) {
                            showMessage(11);
                        }
                        else {
                            if (LogValue.length >= 5) {
                                fetch('/AddUser', {
                                    method: 'POST',
                                    headers: {
                                        'Content-type': 'application/json'
                                    },
                                    body: JSON.stringify({ login: LogValue, mail: MailValue, password: PassValue })
                                })
                                    .then(function (resolve) {
                                    return resolve.json();
                                })
                                    .then(function () {
                                    document.location.href = "/Auth";
                                });
                            }
                            else {
                                showMessage(12);
                            }
                        }
                    });
                }
            });
        }
        else {
            showMessage(9);
        }
    }
    else {
        showMessage(8);
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
        case 8:
            MessageBlock.childNodes[1].textContent = 'Пароли не совпадают';
            MessageBlock.childNodes[3].style.display = 'none';
            MessageBlock.style.opacity = "1";
            MessageBlock.style.transition = '1s linear';
            setTimeout(function () {
                MessageBlock.style.opacity = '0';
            }, 3000);
            break;
        case 9:
            MessageBlock.childNodes[1].textContent = 'Неверный формат почты';
            MessageBlock.childNodes[3].style.display = 'none';
            MessageBlock.style.opacity = "1";
            MessageBlock.style.transition = '1s linear';
            setTimeout(function () {
                MessageBlock.style.opacity = '0';
            }, 3000);
            break;
        case 10:
            MessageBlock.childNodes[1].textContent = 'Данная почта уже занята';
            MessageBlock.childNodes[3].style.display = 'none';
            MessageBlock.style.opacity = "1";
            MessageBlock.style.transition = '1s linear';
            setTimeout(function () {
                MessageBlock.style.opacity = '0';
            }, 3000);
            break;
        case 11:
            MessageBlock.childNodes[1].textContent = 'Данный логин уже занят';
            MessageBlock.childNodes[3].style.display = 'none';
            MessageBlock.style.opacity = "1";
            MessageBlock.style.transition = '1s linear';
            setTimeout(function () {
                MessageBlock.style.opacity = '0';
            }, 3000);
            break;
        case 12:
            MessageBlock.childNodes[1].textContent = 'Минимальное кол - во символов в логине - 5';
            MessageBlock.childNodes[3].style.display = 'none';
            MessageBlock.style.opacity = "1";
            MessageBlock.style.transition = '1s linear';
            setTimeout(function () {
                MessageBlock.style.opacity = '0';
            }, 3000);
            break;
    }
}
