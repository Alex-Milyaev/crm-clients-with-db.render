import { contactTooltip } from "./createTooltip.js";
import { svgPhone, svgFb, svgVk, svgEmail, svgOther } from "./svg.js";

// функция для форматирования ссылок
export const createContactLink = (type, value, element, svg, item) => {

    // Инстанс от функции которая возвращает нам тултип
    const setTooltip = contactTooltip(type, value);
    
    element = document.createElement('a');
    element.classList.add('contacts__link');
    element.innerHTML = svg;

    if (type === 'Email') {
        element.href = `mailto:${value.trim()}`
    } else if (type === 'Телефон') {
        element.href = `tel:${value.trim()}`
        setTooltip.tooltipValue.style.color = 'var(--color-white)';
        setTooltip.tooltipValue.style.textDecoration = 'none';
    } else {
        element.href = value.trim();
    }

    element.append(setTooltip.tooltip);
    item.append(element);
}

// функция которая будет помещать ссылки в контакт клиента
export const createContactItemByType = (type, value, item) => {
    switch (type) {
        case 'Телефон':
            let phone;
            createContactLink(type, value, phone, svgPhone, item);
            break;
        case 'Facebook':
            let fb;
            createContactLink(type, value, fb, svgFb, item);
            break;
        case 'VK':
            let vk;
            createContactLink(type, value, vk, svgVk, item); 
            break;
        case 'Email':
            let email;
            createContactLink(type, value, email, svgEmail, item); 
            break;
        case 'Другое':
            let other;
            createContactLink(type, value, other, svgOther, item);  
            break;      
                    
        default:
            break;
    }
}

// функция для форматирования даты
export const formateDate = data => {
    const newDate = new Date(data);

    const correctDate = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }
    const resultDate = newDate.toLocaleString('ru', correctDate);

    return resultDate;
}

// функция для форматирования времени
export const formateTime = data => {
    const newDate = new Date(data);

    const correctDate = {
        hour: 'numeric',
        minute: 'numeric',
    }
    const resultTime = newDate.toLocaleString('ru', correctDate);

    return resultTime;
}