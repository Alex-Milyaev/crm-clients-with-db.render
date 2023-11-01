import { svgDelete } from "./svg.js";

// Функция добавления контактов клиента
export const createContactItem = () => {

    // Создаем DOM элементы контактов клиента
    const contact = document.createElement('div');
    const contactType = document.createElement('div');
    const contactName = document.createElement('button');
    const contactList = document.createElement('ul');
    const contactPhone = document.createElement('li');
    const contactVk = document.createElement('li');
    const contactFb = document.createElement('li');
    const contactEmail = document.createElement('li');
    const contactOther= document.createElement('li');
    const contactInput = document.createElement('input');
    const contactDelete = document.createElement('button');
    const contactDeleteTooltip = document.createElement('span');

    // Присваиваем классы созданным элементам контактов клиента
    contact.classList.add('contact');
    contactType.classList.add('contact__type');
    contactName.classList.add('contact__name');
    contactList.classList.add('contact__list', 'list-reset');
    contactPhone.classList.add('contact__item');
    contactVk.classList.add('contact__item');
    contactFb.classList.add('contact__item');
    contactEmail.classList.add('contact__item');
    contactOther.classList.add('contact__item');
    contactInput.classList.add('contact__input');
    contactDelete.classList.add('contact__delete', 'btn-reset');
    contactDeleteTooltip.classList.add('contact-tooltip', 'site-tooltip');

    // Указываем текстовое наполнение созданным элементам контактов клиента
    contactName.textContent = 'Телефон';
    contactDeleteTooltip.textContent = 'Удалить контакт';
    contactPhone.textContent = 'Телефон';
    contactVk.textContent = 'VK';
    contactEmail.textContent = 'Email';
    contactFb.textContent = 'Facebook';
    contactOther.textContent = 'Другое';
    contactInput.placeholder = 'Введите данные контакта';
    contactInput.type = 'text';
    contactDelete.innerHTML = svgDelete;

    // обработчик события для удаления контакта из модального окна
    contactDelete.addEventListener('click', (e) => {
        e.preventDefault();
        contact.remove();
        document.querySelector('.modal__btn-contact').classList.add('modal__btn-contact--active');
    })

    // обработчик события для выпадающего списка и стрелки в нем методом toggle по классу
    contactName.addEventListener('click', (e) => {
        e.preventDefault();
        contactList.classList.toggle('contact__list--active');
        contactName.classList.toggle('contact__list--active');
    })

    // список скрывается если курсор мыши не наведен на него 
    contactType.addEventListener('mouseleave', () => {
        contactList.classList.remove('contact__list--active');
        contactName.classList.remove('contact__list--active');
    })

    // функция выбора типа контакта и его добавление
    const setType = (type) => {
        type.addEventListener('click', () => {
            contactName.textContent = type.textContent;
            contactList.classList.remove('contact__list--active');
            contactName.classList.remove('contact__list--active');
        });
    }

    // Реализация выбора типа из выпадающего списка и установка его как значение и дальнейшая отправка на сервер
    const typesArray = [contactEmail, contactFb, contactVk, contactPhone, contactOther];
    for (const type of typesArray) {
        setType(type);
    }

    // Вкладываем созданные элементы контактов клиента согласно разметке
    contactDelete.append(contactDeleteTooltip);
    contact.append(contactType, contactInput, contactDelete);
    contactType.append(contactName, contactList);
    contactList.append(contactPhone, contactEmail, contactVk, contactFb, contactOther);

    // Из этой функции возвращаем объект с созданными элементами контактов клиента
    return {
        contact,
        contactName,
        contactInput,
        contactDelete
    }
}