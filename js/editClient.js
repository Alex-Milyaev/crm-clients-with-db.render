import { createClientsForm } from "./createModalForm.js";
import { deleteClientModal } from "./createDeleteModal.js";
import { createClientItem } from "./createClientItem.js";
import { createContactItem } from "./createContact.js";
import { sendClientData } from "./clientsApi.js";
import { validateClientForm } from "./validateForm.js";
import { validateClientContact } from "./validateContact.js";

// Функция создания модального окна "изменить клиента"
export const editClientModal = (data) => {

    // Создаем DOM элементы модального окна "изменить клиента"
    const editModal = document.createElement('div');
    const editModalContent = document.createElement('div');
    const createForm = createClientsForm();
    const titleId = document.createElement('span');

    // Присваиваем классы созданным элементам модального окна "изменить клиента"
    editModal.classList.add('modal-edit', 'site-modal', 'modal-active');
    editModalContent.classList.add('edit-modal__content', 'site-modal__content', 'modal-active');
    titleId.classList.add('modal__id');

    // Добавляем текстовое наполнение созданным элементам модального окна "изменить клиента"
    titleId.textContent = 'ID: ' + data._id.substr(0, 6);
    createForm.modalTitle.textContent = 'Изменить данные';
    createForm.cancelBtn.textContent = 'Удалить клиента';

    // удаление клиента с сервера при нажатии на кнопку удалить из модального окна "изменить клиента"
    createForm.cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const deleteModal = deleteClientModal();
        document.body.append(deleteModal.deleteModal);

        import('./clientsApi.js').then(({ deleteClientItem }) => {
            deleteModal.deleteModalDelete.addEventListener('click', () => {
                try {
                    deleteModal.deleteSpinner.style.display = "block";
                    setTimeout(() => {
                        deleteClientItem(data._id);
                        document.getElementById(data._id).remove();
                        deleteModal.deleteModal.remove();
                        document.querySelector('.modal-edit').remove();
                    }, 1500);
                } catch (error) {
                    console.log(error)
                } finally {
                    setTimeout(() => deleteModal.deleteSpinner.style.display = "none", 1500);
                }
            })
        });
    });

    // Закрытие модального окна "изменить клиента" при нажатии на крестик
    createForm.modalClose.addEventListener('click', () => {
        editModal.remove();
    })
    // Закрытие модального окна "изменить клиента" при клике на зону вне окна
    document.addEventListener('click', (e) => {
        if (e.target == editModal) {
            editModal.remove();
        }
    });

    // заполнение полей данными при изменении контакта в модальном окне "изменить клиента"
    createForm.inputName.value = data.name;
    createForm.inputSurname.value = data.surname;
    createForm.inputLastname.value = data.lastName;

    for (const contact of data.contacts) {
        const createContact = createContactItem();

        createContact.contactName.textContent = contact.type;
        createContact.contactInput.value = contact.value;

        createForm.contactsBlock.prepend(createContact.contact);
        createForm.contactsBlock.style.backgroundColor = 'var(--color-gray-athens)';
    }

    if (data.contacts.length == 10) {
        createForm.addContactBtn.classList.remove('modal__btn-contact--active');
    }

    // получение всех введенных контактов клиента
    createForm.form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateClientForm()) {
            return;
        }

        const contactTypes = document.querySelectorAll('.contact__name');
        const contactValues = document.querySelectorAll('.contact__input');
        let contacts = [];
        let client = {};

        for (let i = 0; i < contactTypes.length; i++) {
            if (!validateClientContact(contactTypes[i], contactValues[i])) {
                return;
            }
            contacts.push({
                type: contactTypes[i].innerHTML,
                value: contactValues[i].value
            });
        }

        client.name = createForm.inputName.value;
        client.surname = createForm.inputSurname.value;
        client.lastName = createForm.inputLastname.value;
        client.contacts = contacts;

        const spinner = document.querySelector('.modal__spinner');

        try {
            spinner.style.display = 'block';
            const editedData = await sendClientData(client, 'PATCH', data._id);
            document.querySelector('.clients__tbody').replaceChild(
                createClientItem(editedData), 
                document.getElementById(editedData._id)
            );
            editModal.remove();
        } catch (error) {
            console.log(error);
        } finally {
            spinner.style.display = 'none'
        }
    });

    // Вкладываем созданные элементы модального окна согласно разметке
    createForm.modalTitle.append(titleId);
    editModalContent.append(createForm.modalClose, createForm.modalTitle, createForm.form);
    editModal.append(editModalContent);

    // Из этой функции возвращаем объект с созданными элементами модального окна
    return {
        editModal,
        editModalContent
    }
}