// Функция сортировки клиентов в таблице

export const sortTable = () => {

    // обращаемся к уже сгенерированным DOM элементам таблицы на странице
    const table = document.querySelector('table');
    const headers = table.querySelectorAll('th');
    const tbody = table.querySelector('tbody');

    // переменная для выполнения логики сортировки в обе стороны (преобразуем node-list в массив)
    const directions = Array.from(headers).map(() => '');

    // функция которая будет принимать текстовое наполнение столбцов таблицы и изменять их в нужный формат для удобства их сортировки
    const transform = (type, content) => {
        switch (type) {
            case 'id':
                return parseFloat(content);
            case 'create': 
            case 'update':
                return content.split('.').reverse().join('-');
            case 'text':
            default:
                return content;
        }
    }

    //  индекс нажатого заголовка таблицы, получать по этому индексу тип столбца и получать контент этого столбца
    const sortColumn = (index) => {
        const type = headers[index].getAttribute('data-type');
        const rows = tbody.querySelectorAll('tr');
        const direction = directions[index] || 'sortUp';
        const multiply = direction === 'sortUp' ? 1 : -1;
        const newRows = Array.from(rows);

        // логика сортировки элементов (берем каждую полученную строку и сравниваем их между собой)
        newRows.sort((row1, row2) => {
            const cellA = row1.querySelectorAll('td')[index].textContent;
            const cellB = row2.querySelectorAll('td')[index].textContent;

            const a = transform(type, cellA);
            const b = transform(type, cellB);
            
            switch (true) {
                case a > b:
                    return 1 * multiply;
                case a < b:
                    return -1 * multiply;
                default:
                    break;
                case a === b:
                return 0;
            }
        });

        [].forEach.call(rows, (row) => {
            tbody.removeChild(row);
        });

        directions[index] = direction === 'sortUp' ? 'sortDown' : 'sortUp';

        newRows.forEach(newRow => {
            tbody.appendChild(newRow);
        });
    }

    // проходим по каждому элементу массива (заголовки в таблице), и для каждого из них создаем обработчик события клик в случае которого запускам функцию сортировки
    [].forEach.call(headers, (header, index) => {
        header.addEventListener('click', () => {
            sortColumn(index);
        });
    });
}