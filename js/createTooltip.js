// Функция создания тултипа у контакта клиента (принимает тип и значение контакта для отображения на странице)

export const contactTooltip = (type, value) => {

    // Создаем DOM элементы тултипа
    const tooltip = document.createElement('div');
    const tooltipType = document.createElement('span');
    const tooltipValue = document.createElement('a');

    // Присваиваем созданным элементам тултипа классы
    tooltip.classList.add('contact-tooltip', 'site-tooltip');
    tooltipType.classList.add('contact-tooltip__type');
    tooltipValue.classList.add('contact-tooltip__value');

    // Указываем наполнение созданным элементам тултипа
    tooltipType.textContent = type + ': ';
    tooltipValue.textContent = value;

    // Вкладываем созданные элементы тултипа согласно разметке
    tooltip.append(tooltipType, tooltipValue);

    // Из этой функции возвращаем объект с созданными элементами тултипа
    return {
        tooltip,
        tooltipType,
        tooltipValue
    }
};