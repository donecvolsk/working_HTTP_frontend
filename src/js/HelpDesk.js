import TicketView from "./TicketView";
import TicketForm from "./TicketForm"

/**
 *  Основной класс приложения
 * */
export default class HelpDesk {
  constructor(root) {    
    this.root = root;    
    if (!(this.root instanceof HTMLElement)) {
      throw new Error("This is not HTML element!");
    }
    this.TicketView = new TicketView(this.root);
    this.TicketForm = new TicketForm(this.root);    
  }

  //метод заправшивает и загружает на страницу тикеры с сервера
  init() {  
    fetch('http://localhost:7070/?method=allTickets')
    .then((response) => response.json())
      .then((data) => {                          
       let responsedTickets = data;
       responsedTickets.forEach((ticket) => {
        console.log(ticket.status);
        this.TicketView.createTicked(ticket);
      })
      
      this.status();//вызываем метод работы со статусом
      this.descriptionTicket();
      this.editTicket();//вызываем метод работы с крандашиками
      this.deleteTicket();//вызываем метод работы с крестиками
    })  
  } 

  //перезагружаем состояние тикетов
  reInit() {
    this.ticketsContainer = this.root.querySelector(".tickets-container");
    this.ticketsContainer.innerHTML = "";
    this.init(); 
  }
  
  //метод для работы с формой создания тикета
  newTicket() {
    this.TicketForm.createWindowAdd();//создаем форму в HTML
    this.btnCancell = document.querySelector('[data-id = "cancel1"]');//получаем кнопку "Отмена"       
    this.btnCancell.addEventListener('click', () => {//слушаем кнопку "Отмена" и удаляем форму
    this.TicketForm.cancellForm(this.btnCancell);    
    })

    //Функция отправки формы на сервер
    let submitForm = (formData) => {
      fetch("http://localhost:7070/?method=createTicket", { // файл-обработчик
          method: "POST",
          body: JSON.stringify(formData)
      })
          //.then(response => alert("Сообщение отправлено"))
          //.catch(error => console.error(error))                
          this.TicketForm.cancellForm(this.btnCancell);     
          this.reInit();
    };

    //Проверяем наличие формы, готовим данные формы для отправки, вызываем функцию опраки.
    if (document.querySelector("[data-id='addTicket-form']")) {
      const forms = document.querySelectorAll("[data-id='addTicket-form']");

      for (let i = 0; i < forms.length; i++) {
          forms[i].addEventListener("submit", function (e) {
              e.preventDefault();
              let formData = new FormData(this);
              formData = Object.fromEntries(formData);
              submitForm(formData);               
          });          
      };   
    };   
  }

  //метод удаления тикера
  deleteTicket() { 
    this.crossArray = document.querySelectorAll('[data-idremove]');        
    for (let i = 0; i < this.crossArray.length; i++) {//перебираем все крестики тикеров
      this.crossArray[i].addEventListener('click', (event) => {//слушаем клик на крестике
        const evt = event.target;//сохраняем событие клика на крестике               
        const evtIdvalue = evt.dataset.idremove; //сохраняем значение ID для отправки на сервер
       
        this.TicketForm.createWindowDelete(); //добавляем модальное окно удаления
        //получаем модальное окно удаления
        this.removeTicketModal = this.root.querySelector('[data-widget="removeTicket"]');
        const handlerClick = (event) => {
          const evt = event.target;//сохраняем клик          
          if(evt.classList.contains('cancel')) {// если "Отмена"
            this.removeTicketModal.removeEventListener("click", handlerClick); 
            this.removeTicketModal.remove();// удаляем мод окно
          } else if(evt.classList.contains('del')) {// если "Ок"
            //отправляем ID  на сервер
            fetch(`http://localhost:7070/?method=deleteById&id=${evtIdvalue}`, {
            //method: "GET",
            //body: JSON.stringify(evtIdvalue)
            })
            
            this.removeTicketModal.removeEventListener("click", handlerClick); 
            this.removeTicketModal.remove();// удаляем мод окно
            this.reInit();//перезапршиваем состояние тикеров на сервере
          } else {
            return;
          }
        }        
        this.removeTicketModal.addEventListener("click", handlerClick);           
      })
    }    
  }

  //метод для редактирования тикета
  editTicket() { 
    this.pencil = document.querySelectorAll('[data-idedit]');//получаем коллекцию карандашиков
    this.nameCollection = document.querySelectorAll('.n');//колекция имен тикетов
    this.desCollection = document.querySelectorAll('.t');//коллекция подробных описаний
    
    for (let i = 0; i < this.pencil.length; i++) {//перебираем все карандашики тикеров
      this.pencil[i].addEventListener('click', (event) => {       
        const evt = event.target;
        let evtIdpencil = evt.dataset.idedit;//значение id карандашика               
        //создаем мод. окно изменения тикера в HTML
        this.TicketForm.editWindowAdd(this.nameCollection[i].textContent, this.desCollection[i].textContent);
        //получаем модальное окно изменения тикера
        this.editTicketModal = this.root.querySelector('[data-widget="editTicket"]');        
        //получаем форму из мод. окна изменения тикера
        const forms = this.editTicketModal.querySelectorAll("[data-id='editTicket-form']");
        
        const handlerClick = (event) => {
          const evt = event.target;//сохраняем клик
          if(evt.classList.contains('canceledit')) {// если "Отмена"
            this.editTicketModal.removeEventListener("click", handlerClick); 
            this.editTicketModal.remove();// удаляем мод окно
          } else if(evt.classList.contains('edit')) {// если "Ок"
              //функция отправки формы изменения тикера на сервер
              let submitForm = (formData) => { 
                fetch(`http://localhost:7070/?method=updateById&id=${evtIdpencil}`, { // файл-обработчик
                    method: "POST",
                    body: JSON.stringify(formData)
                })
                    this.editTicketModal.removeEventListener("click", handlerClick); 
                    this.editTicketModal.remove();// удаляем мод окно     
                    this.reInit();//перезагружаем состояние тикетов
              };

             //перебираем форму изменения тикета и создаем объект для отправки
              for (let i = 0; i < forms.length; i++) {
                  forms[i].addEventListener("submit", function (e) {

                    //функция преобразует data-set  в булево 
                    let statusData = () => { 
                      this.statusColection = document.querySelectorAll('.ticket-status');
                      for (let i = 0; i < this.statusColection.length; i++) {
                        if(this.statusColection[i].dataset === 'true') {
                          return true;
                        } else if(this.statusColection[i].dataset === 'false') {
                          return false;
                        }       
                      }
                    }                                
                      e.preventDefault();
                      let formData = new FormData(this);
                      formData = Object.fromEntries(formData);                   
                      submitForm(formData);               
                  });          
              };   
          }
        }
        //слушаем клики на  мод. окне изменения тикета
        this.editTicketModal.addEventListener("click", handlerClick);
      })     
    }    
  } 

  descriptionTicket() {
    this.clickName = this.root.querySelectorAll('.ticket-name');//коллекция имен тикетов
    for (let i = 0; i < this.clickName.length; i++) {//перебираем имена такетов    
      this.clickName[i].addEventListener('click', (event) => {//слушаем клик на имени тиков     
        this.bodyTicket = document.querySelectorAll('.ticket-body');//коллекция контейнеров тикетов    
        const evt = event.target;//сохраняем клик       
        const evtIdBody = evt.dataset.body;//ID тикета
        if(evt.classList.contains('n')) { //если кликнут с классом "n"          
          //if(document.querySelector('.ticket-description')) {
            //document.querySelector('.ticket-description').remove();             
          //} 
          //делаем запрос на сервер         
          fetch(`http://localhost:7070/?method=ticketById&id=${evtIdBody}`)
            .then((response) => response.json())
            .then((data) => { 
              let resText = data.description;//сохраняем текст из ответа сервера
             let aa = document.querySelectorAll('.ticket-description');
             aa[i].textContent = resText;                                       
            })            
        }         
      })      
    }    
  }

  //метод работы со статусом
  status() {
    this.statusColection = this.root.querySelectorAll('.ticket-status');//коллекция элементов статус
    this.colectionticket = this.root.querySelectorAll('.ticket-wrapper');////коллекция элементов тиекотов

    for (let i = 0; i < this.statusColection.length; i++) {//перебираем колекцию стстатусов
      //выставляем или удаляем галочку в зависимости от атрибута data-status
      if(this.statusColection[i].dataset.status === 'true') {
        this.statusColection[i].textContent = 'V';
      } else if(this.statusColection[i].dataset.status === 'false') {
        this.statusColection[i].textContent = '';
      }
      //слушаем клик на статусе, сттавим или удаляем галочку, оправляем на сервер булево
      this.statusColection[i].addEventListener('click', () => {
        let idTicket = this.colectionticket[i].dataset.id;
        let bulevo = {status: null};// объект со значением status для сервера 

        if(this.statusColection[i].textContent) {
          this.statusColection[i].textContent = '';
          bulevo.status = false;
        } else if(!this.statusColection[i].textContent) {
          this.statusColection[i].textContent = 'V';
          bulevo.status = true;
        } 

        fetch(`http://localhost:7070/?method=updateById&id=${idTicket}`, { // файл-обработчик
                    method: "POST",
                    body: JSON.stringify(bulevo)
                })    
                    this.reInit();//перезагружаем состояние тикетов*/
      })
    }          
  }
}
