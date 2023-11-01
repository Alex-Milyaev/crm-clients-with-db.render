import { svgPreloadMain } from "./svg.js";

// Функция создания прелоадера на странице
export const createPreloader = () => {

    // Создаем DOM элементы прелоадера
    const preloaderBlock = document.createElement('div');
    const preloaderCircle = document.createElement('span');

    // Присваиваем созданным элементам прелоадера класс и идентификатор
    preloaderBlock.classList.add('preloader');
    preloaderCircle.id = 'loader';

    // Прелоадер будет содержать в себе SVG картинку
    preloaderCircle.innerHTML = svgPreloadMain;

    // Вкладываем созданные элементы прелоадера согласно разметке
    preloaderBlock.append(preloaderCircle);

    // Из этой функции возвращаем созданный прелоадер
    return preloaderBlock;
};