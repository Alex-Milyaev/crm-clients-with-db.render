// Функция валидации формы в модальном окне добавления клиента, возвращающая либо true либо false

export const validateClientForm = () => {

    // Получаем доступ к необходимым элементам для вывода ошибок по их id
    const userName = document.getElementById('floatingName');
    const userSurname = document.getElementById('floatingSurname');
    const userLastName = document.getElementById('floatingLastName');
    const unacceptableLetter = document.getElementById('unacceptableLetter');
    const writeName = document.getElementById('writeName');
    const writeSurname = document.getElementById('writeSurname');
    const writeLastName = document.getElementById('writeLastName');
    const requiredValue = document.getElementById('requiredValue');

    // массив элементов с переменными ошибок для дальнейшей работы с ними в цикле
    const validateArray = [unacceptableLetter, writeName, writeSurname, writeLastName, requiredValue];

    // регулярное выражение которое выполняет проверку на кирилицу
    const regexp = /[^а-яА-ЯёЁ]+$/g;

    // Функция которая работает с полем ввода (красит при ошибке ввода и наоборот)
    const onInputValue = input => {
        input.addEventListener('input', () => {
            input.style.borderColor = 'var(--color-gray-border)';
            for (const item of validateArray) {
                item.textContent = '';
            }
        });

        input.oncut = input.oncopy = input.onpaste = () => {
            input.style.borderColor = 'var(--color-gray-border)';
            for (const item of validateArray) {
                item.textContent = '';
            }
        };

        input.onchange = () => {
            input.style.borderColor = 'var(--color-gray-border)';
            if (userSurname.value && userName.value && userLastName.value) {
                for (const item of validateArray) {
                    item.textContent = '';
                }
            }
        }
    };

    // вызываем функцию проверки ввода для каждого поля ввода ФИО
    onInputValue(userName);
    onInputValue(userSurname);
    // onInputValue(userLastName);

    // проверка на заполненность поля ввода ФИО
    const checkRequiredName = (input, message, name) => {
        if (!input.value) {
            input.style.borderColor = 'var(--color-burnt-sienna)';
            message.textContent = `Введите ${name} клиента!`;
            return false;
        } else {
            message.textContent = '';
        }

        return true;
    };

    // проверка на кирилицу в полях ввода ФИО
    const checkByRegexp = (input, regexp) => {
        if (regexp.test(input.value)) {
            input.style.borderColor = 'var(--color-burnt-sienna)';
            unacceptableLetter.textContent = 'Недопустимые символы!';
            return false;
        }

        return true
    };
    
    // Вызываем функции валидации для каждого инпута формы при помощи условий с булевым значением
    if (!checkRequiredName(userSurname, writeSurname, 'Фамилию')) { return false };
    if (!checkRequiredName(userName, writeName, 'Имя')) { return false };
    // if (!checkRequiredName(userLastName, writeLastName, 'Отчество')) { return false };
    if (!checkByRegexp(userName, regexp)) { return false };
    if (!checkByRegexp(userSurname, regexp)) { return false };
    if (!checkByRegexp(userLastName, regexp)) { return false };

    // в случае прохождения всех проверок функция вернет true
    return true;
}