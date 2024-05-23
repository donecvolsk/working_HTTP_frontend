import HelpDesk from './HelpDesk';

const root = document.querySelector('#root');//получаем контейнер с приложением
const button = root.querySelector('button');//получаем кнопку для создания формы нового тикера

const app = new HelpDesk(root);
app.init();//вызываем метод для создания и загрузки тикетов
    
//отлавливаем клик по кнопке создания формы для нового тикера
button.addEventListener('click', () => {
    app.newTicket();//вызываем метод для создание формы нового тикера
})




