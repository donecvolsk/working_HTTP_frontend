/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
export default class TicketView {
  constructor(root) {
    this.ticketsContainer = root.querySelector(".tickets-container");
    
  }
  createTicked(ticket) {
    const ticketHtml = `
       <div data-id="${ticket.id}" class="ticket-wrapper">
       <div class="ticket-body">
           <div data-status="${ticket.status}" class="ticket-status"></div>
           <div class="ticket-name"><p data-body="${ticket.id}" class="n">${ticket.name}</p></div>
           <div class="ticket-timestamp">
           <span>${new Date(ticket.created)}</span>
           </div>
           <div class="ticket-edit-button">
           <span data-idedit="${ticket.id}">&#9998;</span>
           </div>
           <div class="ticket-remove-button">
           <span data-idremove="${ticket.id}">&#10006;</span>
           </div>
           
           </div>
           <div class="ticket-description t"></div>
       </div>
      
       </div>
       `;
       this.ticketsContainer.insertAdjacentHTML("beforeEnd", ticketHtml);
  }

}
