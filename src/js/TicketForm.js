/**
 *  Класс для создания формы создания нового тикета
 * */
export default class TicketForm {
  constructor(root) {
    this.root = root;
  }

  //метод создания модального окна для нового тикера
  createWindowAdd() {
    const widgetAddTicketHtml = `
    <div data-widget="addTicket" class="modal widget-add">
    <h2>Добавить тикет</h2>  
    <form id = "form" data-id="addTicket-form" class="widget-form">
      <label>
        Краткое описание
          <textarea rows=1 data-id="name" name="name" required class="widget-input"></textarea>
      </label>
      <label>
        Подробное описание
          <textarea rows=3 data-id="description" name="description" class="widget-input"></textarea>
      </label>
      <div class="widget-form-controls">
        <button type="button" data-id="cancel1" class="widget-button">Отмена</button>  
        <button type="submit" data-id="ok" class="widget-button">Ок</button> 
      </div>     
    </form>
    </div>
    `;
    this.root.insertAdjacentHTML("beforeEnd", widgetAddTicketHtml);
  }

  //метод создания модального окна для удаления тикера
  createWindowDelete() {
    const widgetRemoveTicketHtml = `
    <div data-widget="removeTicket" class="modal widget-remove">
    <h2>Удалить тикет?</h2>  
    <div class="widget-form">
        <p class="widget-remove-text">Вы уверены, что хотите удалить тикет? Это действие необратимо.</p>
        <div class="widget-form-controls">
        <button type = "button" data-id="cancel2" class="widget-button cancel">Отмена</button>  
        <button type = "button" data-id="ok" class="widget-button del">Ок</button> 
        </div> 
    </div>
    </div>
    `;
    this.root.insertAdjacentHTML("beforeEnd", widgetRemoveTicketHtml);
}

//метод создания модального окна для редактирования тикера
editWindowAdd(name, des) {
  const widgetEditTicketHtml = `
  <div data-widget="editTicket" class="modal widget-add">
  <h2>Изменить тикет</h2>  
  <form id = "form" data-id="editTicket-form" class="widget-form">
    <label>
      Краткое описание
        <textarea rows=1 data-id="name" name="name" required class="widget-input">${name}</textarea>
    </label> 
    <label>
      Подробное описание
        <textarea rows=3 data-id="description" name="description" class="widget-input">${des}</textarea>
    </label>
    <div class="widget-form-controls">
      <button type="button" data-id="cancel" class="widget-button canceledit">Отмена</button>  
      <button type="submit" data-id="ok" class="widget-button edit">Ок</button> 
    </div>     
  </form>
  </div>
  `;
  this.root.insertAdjacentHTML("beforeEnd", widgetEditTicketHtml);
}
  
  cancellForm() {
    const formContainer = document.querySelector('[data-widget = "addTicket"]');
    const parent = formContainer.parentNode;
    parent.removeChild(formContainer);
  }
}
