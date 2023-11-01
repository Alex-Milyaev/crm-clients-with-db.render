// Асинхронная функция для получения всех данных с сервера
export const getClients = async () => {
    try {
        const response = await fetch('https://crm-clients-with-db.onrender.com/api/clients', {
            method: 'GET'
        });
        const result = await response.json();

        return result;
    } catch (error) {
        console.log(error);
    }
}

// Асинхронная функция для добавления + изменения данных на сервере
export const sendClientData = async (client, method, id = null) => {
    try {
        const response = await fetch(`https://crm-clients-with-db.onrender.com/api/clients/${method === 'POST' ? '' : id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method,
            body: JSON.stringify(client)
        });
        const result = await response.json();

        return result;
    } catch (error) {
        console.log(error);
    }
}

// Асинхронная функция для удаления данных с сервера
export const deleteClientItem = async (id) => {
    try {
        await fetch(`https://crm-clients-with-db.onrender.com/api/clients/${id}`, {
            method: 'DELETE',
        });
    } catch (error) {
        console.log(error);
    }
}

// Асинхронная функция для поиска данных на сервере
export const findClient = async (value) => {
    try {
        const response = await fetch(`https://crm-clients-with-db.onrender.com/api/clients?search=${value}`, {
            method: 'GET'
        });
        const result = await response.json();

        return result;
    } catch (error) {
        console.log(error);
    }
}
