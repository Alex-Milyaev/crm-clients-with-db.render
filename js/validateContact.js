// Функция валидации полей ввода контактов в модальном окне добавления клиента

export const validateClientContact = (contactType, contactInput) => {

    // получаем доступ по идентификатору к элементу разметки который выводит ошибку
    const writeValue = document.getElementById('writeName');

    // регулярное выражение которое проверяет на наличие только цифр в поле ввода
    const onlyNumbers = /[^0-9]+$/g;

    // регулярное выражение которое проверяет только на латинские буквы и "@" и "." в поле ввода
    const onlyEmail = /[^a-zA-Z|@|.]+$/g;

    // Функция которая работает с полем ввода (красит при ошибке ввода и наоборот)
    const onInputValue = input => {
        input.addEventListener('input', () => {
            input.style.borderColor = 'var(--color-gray-border)';
            writeValue.textContent = '';
        });

        input.oncut = input.oncopy = input.onpaste = () => {
            input.style.borderColor = 'var(--color-gray-border)';
            writeValue.textContent = '';
        };
    };

    // Функция для вывода предупреждающего сообщения при ошибке ввода
    const showErrorMessage = (message, block, input) => {
        block.textContent = message;
        input.style.borderColor = 'var(--color-burnt-sienna)';
    }

    // вызываем функцию проверки для поля ввода контакта
    onInputValue(contactInput);

    // Проверка на заполненность поля ввода контакта
    if (!contactInput.value) {
        showErrorMessage('Заполните все поля контактов!', writeValue, contactInput);
        return false;
    }

    // переключатель который исходя из типа контакта будет показывать поле с ошибкой
    switch (contactType.innerHTML) {
        case 'Телефон': 
            if (onlyNumbers.test(contactInput.value)) {
                showErrorMessage('Допустимы только цифры!', writeValue, contactInput);
                return false;
            } else if (contactInput.value.length !== 11) {
                showErrorMessage('Номер должен состоять из 11 цифр!', writeValue, contactInput);
                return false;
            }

            return true;
        case 'Email': 
            if (onlyEmail.test(contactInput.value)) {
                showErrorMessage('Неправильный Email!', writeValue, contactInput);
                return false;
            }

            return true;
        default:
            return true;
    }
};