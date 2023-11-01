import { findClient } from "./clientsApi.js";
import { createClientItem } from "./createClientItem.js";

// Функция поиска клиентов в таблице

export const searchClients = (clients) => {

    // обращаемся к элементам с которыми будем работать
    const findList = document.querySelector('.find-list');
    const input = document.querySelector('.header__input');

    // получаем каждого клиента с помощью forEach и приводим их к нужному типу вывода
    clients.forEach(client => {

        // для каждого клиента создаем элемент списка "li" и тег ссылки "а"
        const findItem = document.createElement('li');
        const findLink = document.createElement('a');

        // назначаем классы для этих элементов
        findItem.classList.add('find-list__item');
        findLink.classList.add('find-list__link');

        // назначаем текстовое наполнение для этих элементов
        findLink.textContent = `${client.name} ${client.surname} ${client.lastName}`;
        findLink.href = '#';

        // вкладываем элементы согласно разметке
        findItem.append(findLink);
        findList.append(findItem);
    });

    // функция которая на основе введенного значения в поле поиска будет перерисовывать таблицу с этим значением
    const rewriteTable = async (str) => {
        const response = await findClient(str);
        const tbody = document.querySelector('.clients__tbody');
        tbody.innerHTML = '';

        for (const client of response) {
            tbody.append(createClientItem(client));
        }
    }

    // назначаем обработчик события на инпут 
    input.addEventListener('input', async () => {

        // получаем значение инпута без пробелов
        const value = input.value.trim();
        // получаем все ссылки на элементы
        const foundItems = document.querySelectorAll('.find-list__link');

        if (value !== '') {
            rewriteTable(value);

            foundItems.forEach(link => {
                if (link.innerText.search(value) == -1) {
                    link.classList.add('hide');
                    link.innerHTML = link.innerText;
                } else {
                    link.classList.remove('hide');
                    findList.classList.remove('hide');
                    const str = link.innerText;
                    link.innerHTML = insertMark(str, link.innerText.search(value), value.length);
                }
            });
        } else {
            foundItems.forEach(link => {
                const tbody = document.querySelector('.clients__tbody');
                tbody.innerHTML = '';

                clients.forEach(client => tbody.append(createClientItem(client)));
            
                link.classList.remove('hide');
                findList.classList.add('hide');
                link.innerHTML = link.innerText;
            });
        }
    });

    // Функция выделения маркером совпадающих значений в выпадающем списке клиентов
    const insertMark = (str, pos, len) => str
    .slice(0, pos) + '<mark>' + str
    .slice(pos, pos + len) + '</mark>' + str
    .slice(pos + len);
} 