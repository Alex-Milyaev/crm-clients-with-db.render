import { svgSpinner } from "./svg.js";

// Функция создания модального окна удаления клиента
export const deleteClientModal = () => {

    // Создаем DOM элементы модального окна удаления клиента
    const deleteModalContent = document.createElement('div');
    const modalClose = document.createElement('button');
    const deleteModalTitle = document.createElement('h2');
    const deleteModalText = document.createElement('p');
    const deleteModal = document.createElement('div');
    const deleteModalDelete = document.createElement('button');
    const deleteModalBack = document.createElement('button');
    const deleteSpinner = document.createElement('span');
    
    // Присваиваем классы созданным элементам модального окна удаления клиента
    deleteSpinner.classList.add('modal__spinner');
    deleteModal.classList.add('delete-modal', 'site-modal', 'modal-active');
    deleteModalContent.classList.add('delete-modal__content', 'site-modal__content', 'modal-active');
    deleteModalText.classList.add('delete-modal__text');
    deleteModalTitle.classList.add('delete-modal__title', 'modal__title');
    deleteModalDelete.classList.add('delete-modal__delete', 'btn-reset', 'site-btn');
    deleteModalBack.classList.add('delete-modal__back', 'btn-reset');
    modalClose.classList.add('modal__close', 'btn-reset');

    // Добавляем текстовое наполнение созданным элементам модального окна удаления клиента
    deleteSpinner.innerHTML = svgSpinner;
    deleteModalTitle.textContent = 'Удалить клиента';
    deleteModalText.textContent = 'Вы действительно хотите удалить данного клиента?';
    deleteModalDelete.textContent = 'Удалить';
    deleteModalBack.textContent = 'Отмена';

    // Вкладываем созданные элементы модального окна согласно разметке
    deleteModalDelete.append(deleteSpinner);
    deleteModalContent.append(
        modalClose,
        deleteModalTitle,
        deleteModalText,
        deleteModalDelete,
        deleteModalBack
    )
    deleteModal.append(deleteModalContent);

    // закрытие модального окна для удаления клиента при нажатии на крестик и кнопку отмена
    modalClose.addEventListener('click', () => deleteModal.remove());
    deleteModalBack.addEventListener('click', () => deleteModal.remove());

    // закрытие модального окна для удаления клиента при нажатии на темную область вне окна
    window.addEventListener('click', (e) => {
        if (e.target === deleteModal) {
            deleteModal.remove();
        }
    });

    // Из этой функции возвращаем объект с созданными элементами модального окна удаления клиента
    return {
        deleteModal,
        deleteModalContent,
        deleteModalDelete,
        deleteSpinner
    }
}