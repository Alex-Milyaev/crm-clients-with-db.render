import { addClientModal } from "./addClient.js";
import { createPreloader } from "./preloader.js";
import { svgAddUser } from "./svg.js";

// Функция создания таблицы с клиентами
export const createClientsSection = () => {

    // Создаем DOM элементы таблицы клиентов
    const main = document.createElement('main');
    const section = document.createElement('section');
    const h1 = document.createElement('h1');
    const container = document.createElement('div');
    const tableWrapper = document.createElement('div');
    const clientsTable = document.createElement('table');
    const tbody = document.createElement('tbody');
    const sortingDisplay = document.createElement('thead');
    const theadTr = document.createElement('tr');
    const sortingDisplayId = document.createElement('th');
    const sortingDisplayName = document.createElement('th');
    const sortingDisplayCreate = document.createElement('th');
    const sortingDisplayEdit = document.createElement('th');
    const sortingDisplayContacts = document.createElement('th');
    const sortingDisplayActions = document.createElement('th');
    const sortingDisplaySpan = document.createElement('span');
    const addUserBtn = document.createElement('button');
    const addUserBtnSvg = document.createElement('span');
    const createSpan = document.createElement('span');
    const editSpan = document.createElement('span');

    // массив с заголовками таблицы для удобства реализации логики изменения положения стрелок этих заголовков
    const sortDisplayItems = [sortingDisplayId, sortingDisplayName, sortingDisplayCreate, sortingDisplayEdit];

    // цикл для изменения классов этих заголовков таблицы для изменения положения стрелок
    for (const item of sortDisplayItems) {
        item.addEventListener('click', () => {
            if (item.classList.contains('sort-down')) {
                item.classList.remove('sort-down');
                item.classList.add('sort-up');
            } else {
                item.classList.add('sort-down');
                item.classList.remove('sort-up');
            }
        });
    }

    // обработчик клика по заголовку "создания клиента" для изменения положения его стрелки
    sortingDisplayCreate.addEventListener('click', () => {
        if (sortingDisplayCreate.classList.contains('sort-down')) {
            createSpan.classList.add('sort-up');
        } else {
            createSpan.classList.remove('sort-up');
        }
    });

    // обработчик клика по заголовку "изменения клиента" для изменения положения его стрелки
    sortingDisplayEdit.addEventListener('click', () => {
        if (sortingDisplayEdit.classList.contains('sort-down')) {
            editSpan.classList.add('sort-up');
        } else {
            editSpan.classList.remove('sort-up');
        }
    });

    // Присваиваем атрибуты заголовкам колонок для работы сортировки таблицы
    sortingDisplayId.setAttribute('data-type', 'id');
    sortingDisplayName.setAttribute('data-type', 'text');
    sortingDisplayCreate.setAttribute('data-type', 'create');
    sortingDisplayEdit.setAttribute('data-type', 'update');

    // Присваиваем классы созданным элементам таблицы
    main.classList.add('main');
    section.classList.add('clients');
    h1.classList.add('clients__heading');
    container.classList.add('container', 'clients__container');
    tableWrapper.classList.add('clients__wrapper');
    clientsTable.classList.add('clients__table');
    tbody.classList.add('clients__tbody');
    sortingDisplay.classList.add('clients__display', 'display-info');
    sortingDisplayId.classList.add('display-info__item', 'display-info__item--id', 'sort-up');
    sortingDisplayName.classList.add('display-info__item', 'display-info__item--name', 'sort-down');
    sortingDisplayCreate.classList.add('display-info__item', 'display-info__item--create', 'sort-down');
    sortingDisplayEdit.classList.add('display-info__item', 'display-info__item--change', 'sort-down');
    sortingDisplayContacts.classList.add('display-info__item', 'display-info__item--contacts');
    sortingDisplayActions.classList.add('display-info__item', 'display-info__item--actions');
    sortingDisplaySpan.classList.add('display-info__sorting');
    addUserBtn.classList.add('clients__btn', 'btn-reset');
    addUserBtnSvg.classList.add('clients__svg');
    createSpan.classList.add('create__span');
    editSpan.classList.add('change__span');

    // Указываем текстовое наполнение созданным элементам таблицы (Главный заголовок, заголовки столбцов)
    h1.textContent = 'Клиенты';
    sortingDisplayId.textContent = 'id';
    sortingDisplayName.textContent = 'Фамилия Имя Отчество';
    sortingDisplaySpan.textContent = 'а-я';
    sortingDisplayCreate.textContent = 'Дата и время';
    sortingDisplayEdit.textContent = 'Последние';
    sortingDisplayContacts.textContent = 'Контакты';
    sortingDisplayActions.textContent = 'Действия';
    addUserBtn.textContent = 'Добавить клиента';
    addUserBtnSvg.innerHTML = svgAddUser;

    // Создаем слушатель события клик по кнопке добавления клиента для появления соответствующего модального окна
    addUserBtn.addEventListener('click', () => {
        document.body.append(addClientModal());
    });

    // Вкладываем созданные элементы таблицы согласно разметке
    main.append(section);
    section.append(container);
    sortingDisplayName.append(sortingDisplaySpan);
    sortingDisplayCreate.append(createSpan);
    sortingDisplayEdit.append(editSpan);
    theadTr.append(
        sortingDisplayId,
        sortingDisplayName,
        sortingDisplayCreate,
        sortingDisplayEdit,
        sortingDisplayContacts,
        sortingDisplayActions
    );
    sortingDisplay.append(theadTr);
    tableWrapper.append(clientsTable, createPreloader());
    clientsTable.append(sortingDisplay, tbody);
    addUserBtn.append(addUserBtnSvg);
    container.append(h1, tableWrapper, addUserBtn);

    // Из этой функции возвращаем объект с созданными элементами таблицы для работы с ними
    return {
        main,
        clientsTable,
        tbody
    }
}