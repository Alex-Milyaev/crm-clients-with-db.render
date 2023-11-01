import { createClientsHeader } from "./createHeader.js";
import { createClientsSection } from "./createClientsSection.js";
import { getClients } from "./clientsApi.js";
import { createClientItem } from "./createClientItem.js";
import { sortTable } from "./sortClientsTable.js";
import { searchClients } from "./searchClient.js";

// Функция которая инициализирует все приложение
const createApp = async () => {

    const header = createClientsHeader();
    const clientsSection = createClientsSection();

    // Обращаемся к body на нашей странице чтобы вложить в него все созданные секции приложения
    document.body.append(header, clientsSection.main);

    const preloader = document.querySelector('.preloader');
    const tableWrapper = document.querySelector('.clients__wrapper');

    try {
        tableWrapper.style.overflow = 'visible';

        // переменная которая создается при инициализации приложения и используется в цикле для отрисовки всех данных о клиентах в таблице
        const clients = await getClients();
        searchClients(clients);

        for (const client of clients) {
            document.querySelector('.clients__tbody').append(createClientItem(client));
        }
    } catch (error) {
        console.log(error);
    } finally {
        preloader.remove();
        tableWrapper.style.overflow = 'auto';
    }
}

// Вызываем созданную функцию для инициализации всего приложения
createApp();

// Вызываем функцию сортировки таблицы после загрузки всех DOM элементов
document.addEventListener('DOMContentLoaded', sortTable);