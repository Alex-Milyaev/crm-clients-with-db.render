import { sendClientData } from "./clientsApi.js";
import { createClientsForm } from "./createModalForm.js";
import { createClientItem } from "./createClientItem.js";
import { validateClientContact } from "./validateContact.js";
import { validateClientForm } from "./validateForm.js";

// Функция создания модального окна для добавления нового клиента
export const addClientModal = () => {
    const createForm = createClientsForm();
    const modal = document.createElement('div');
    const modalContent = document.createElement('div');

    modal.classList.add('modal', 'site-modal', 'modal-active');
    modalContent.classList.add('modal__content', 'site-modal__content', 'modal-active');
    createForm.form.classList.add('add-client');

    modal.append(modalContent);
    modalContent.append(createForm.modalClose, createForm.modalTitle, createForm.form);

    // Из переменной создания формы получим поле form и сделаем слушатель события отправки при котором будет создаваться объект с клиентом
    createForm.form.addEventListener('submit', async (e) => {

        // Отмена дефолтного поведения формы чтобы не было перезагрузки страницы при отправке
        e.preventDefault();

        // Прекращение выполнения дольнейшего кода если поля ввода ФИО не прошли валидацию
        if (!validateClientForm()) {
            return;
        }

        // Получаем все элементы контактов клиента если они будут добавлены (типы и значения из их инпутов)
        const contactTypes = document.querySelectorAll('.contact__name');
        const contactValues = document.querySelectorAll('.contact__input');

        // Массив который содержит в себе объекты с контактами клиента
        let contacts = [];

        // Объект с полями данных клиента
        let clientObj = {};

        // Берем из переменных данные и пушим их в объект с клиентом для отправки на сервер
        for (let i = 0; i < contactTypes.length; i++) {

            // Валидация для полей контакта при нарушении которой запрос на сервер уходить не будет
            if (!validateClientContact(contactTypes[i], contactValues[i])) {
                return;
            }
            contacts.push({
                type: contactTypes[i].innerHTML,
                value: contactValues[i].value
            });
        }

        clientObj.name = createForm.inputName.value;
        clientObj.surname = createForm.inputSurname.value;
        clientObj.lastName = createForm.inputLastname.value;
        clientObj.contacts = contacts;
        console.log(clientObj);

        const spinner = document.querySelector('.modal__spinner');

        try {
            spinner.style.display = 'block';
            const data = await sendClientData(clientObj, 'POST');
            document.querySelector('.clients__tbody').append(createClientItem(data));
            modal.remove();
        } catch (error) {
            console.log(error)
        } finally {
            spinner.style.display = 'none'
        }
    });

    // Реализация закрытия модалки по нажатию на крестик
    createForm.modalClose.addEventListener('click', () => {
        modal.remove();
    })

    // Реализация закрытия модалки по пустому пространству вокруг нее
    document.addEventListener('click', (e) => {
        if (e.target == modal) {
            
            // Если условие сработает то мы удаляем элемент модального окна из дом дерева
            modal.remove();
        }
    });

    // Из этой функции возвращаем созданный элемент модального окна
    return modal;
}