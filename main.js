(()=>{"use strict";class t{constructor(t){this.ticketsContainer=t.querySelector(".tickets-container")}createTicked(t){const e=`\n       <div data-id="${t.id}" class="ticket-wrapper">\n       <div class="ticket-body">\n           <div data-status="${t.status}" class="ticket-status"></div>\n           <div class="ticket-name"><p data-body="${t.id}" class="n">${t.name}</p></div>\n           <div class="ticket-timestamp">\n           <span>${new Date(t.created)}</span>\n           </div>\n           <div class="ticket-edit-button">\n           <span data-idedit="${t.id}">&#9998;</span>\n           </div>\n           <div class="ticket-remove-button">\n           <span data-idremove="${t.id}">&#10006;</span>\n           </div>\n           \n           </div>\n           <div class="ticket-description t"></div>\n       </div>\n      \n       </div>\n       `;this.ticketsContainer.insertAdjacentHTML("beforeEnd",e)}}class e{constructor(t){this.root=t}createWindowAdd(){this.root.insertAdjacentHTML("beforeEnd",'\n    <div data-widget="addTicket" class="modal widget-add">\n    <h2>Добавить тикет</h2>  \n    <form id = "form" data-id="addTicket-form" class="widget-form">\n      <label>\n        Краткое описание\n          <textarea rows=1 data-id="name" name="name" required class="widget-input"></textarea>\n      </label>\n      <label>\n        Подробное описание\n          <textarea rows=3 data-id="description" name="description" class="widget-input"></textarea>\n      </label>\n      <div class="widget-form-controls">\n        <button type="button" data-id="cancel1" class="widget-button">Отмена</button>  \n        <button type="submit" data-id="ok" class="widget-button">Ок</button> \n      </div>     \n    </form>\n    </div>\n    ')}createWindowDelete(){this.root.insertAdjacentHTML("beforeEnd",'\n    <div data-widget="removeTicket" class="modal widget-remove">\n    <h2>Удалить тикет?</h2>  \n    <div class="widget-form">\n        <p class="widget-remove-text">Вы уверены, что хотите удалить тикет? Это действие необратимо.</p>\n        <div class="widget-form-controls">\n        <button type = "button" data-id="cancel2" class="widget-button cancel">Отмена</button>  \n        <button type = "button" data-id="ok" class="widget-button del">Ок</button> \n        </div> \n    </div>\n    </div>\n    ')}editWindowAdd(t,e){const i=`\n  <div data-widget="editTicket" class="modal widget-add">\n  <h2>Изменить тикет</h2>  \n  <form id = "form" data-id="editTicket-form" class="widget-form">\n    <label>\n      Краткое описание\n        <textarea rows=1 data-id="name" name="name" required class="widget-input">${t}</textarea>\n    </label> \n    <label>\n      Подробное описание\n        <textarea rows=3 data-id="description" name="description" class="widget-input">${e}</textarea>\n    </label>\n    <div class="widget-form-controls">\n      <button type="button" data-id="cancel" class="widget-button canceledit">Отмена</button>  \n      <button type="submit" data-id="ok" class="widget-button edit">Ок</button> \n    </div>     \n  </form>\n  </div>\n  `;this.root.insertAdjacentHTML("beforeEnd",i)}cancellForm(){const t=document.querySelector('[data-widget = "addTicket"]');t.parentNode.removeChild(t)}}const i=document.querySelector("#root"),n=i.querySelector("button"),s=new class{constructor(i){if(this.root=i,!(this.root instanceof HTMLElement))throw new Error("This is not HTML element!");this.TicketView=new t(this.root),this.TicketForm=new e(this.root)}init(){fetch("https://working-http-server.onrender.com/?method=allTickets").then((t=>t.json())).then((t=>{t.forEach((t=>{console.log(t.status),this.TicketView.createTicked(t)})),this.status(),this.descriptionTicket(),this.editTicket(),this.deleteTicket()}))}reInit(){this.ticketsContainer=this.root.querySelector(".tickets-container"),this.ticketsContainer.innerHTML="",this.init()}newTicket(){this.TicketForm.createWindowAdd(),this.btnCancell=document.querySelector('[data-id = "cancel1"]'),this.btnCancell.addEventListener("click",(()=>{this.TicketForm.cancellForm(this.btnCancell)}));let t=t=>{fetch("http://localhost:7070/?method=createTicket",{method:"POST",body:JSON.stringify(t)}),this.TicketForm.cancellForm(this.btnCancell),this.reInit()};if(document.querySelector("[data-id='addTicket-form']")){const e=document.querySelectorAll("[data-id='addTicket-form']");for(let i=0;i<e.length;i++)e[i].addEventListener("submit",(function(e){e.preventDefault();let i=new FormData(this);i=Object.fromEntries(i),t(i)}))}}deleteTicket(){this.crossArray=document.querySelectorAll("[data-idremove]");for(let t=0;t<this.crossArray.length;t++)this.crossArray[t].addEventListener("click",(t=>{const e=t.target.dataset.idremove;this.TicketForm.createWindowDelete(),this.removeTicketModal=this.root.querySelector('[data-widget="removeTicket"]');const i=t=>{const n=t.target;if(n.classList.contains("cancel"))this.removeTicketModal.removeEventListener("click",i),this.removeTicketModal.remove();else{if(!n.classList.contains("del"))return;fetch(`http://localhost:7070/?method=deleteById&id=${e}`,{}),this.removeTicketModal.removeEventListener("click",i),this.removeTicketModal.remove(),this.reInit()}};this.removeTicketModal.addEventListener("click",i)}))}editTicket(){this.pencil=document.querySelectorAll("[data-idedit]"),this.nameCollection=document.querySelectorAll(".n"),this.desCollection=document.querySelectorAll(".t");for(let t=0;t<this.pencil.length;t++)this.pencil[t].addEventListener("click",(e=>{let i=e.target.dataset.idedit;this.TicketForm.editWindowAdd(this.nameCollection[t].textContent,this.desCollection[t].textContent),this.editTicketModal=this.root.querySelector('[data-widget="editTicket"]');const n=this.editTicketModal.querySelectorAll("[data-id='editTicket-form']"),s=t=>{const e=t.target;if(e.classList.contains("canceledit"))this.editTicketModal.removeEventListener("click",s),this.editTicketModal.remove();else if(e.classList.contains("edit")){let t=t=>{fetch(`http://localhost:7070/?method=updateById&id=${i}`,{method:"POST",body:JSON.stringify(t)}),this.editTicketModal.removeEventListener("click",s),this.editTicketModal.remove(),this.reInit()};for(let e=0;e<n.length;e++)n[e].addEventListener("submit",(function(e){e.preventDefault();let i=new FormData(this);i=Object.fromEntries(i),t(i)}))}};this.editTicketModal.addEventListener("click",s)}))}descriptionTicket(){this.clickName=this.root.querySelectorAll(".ticket-name");for(let t=0;t<this.clickName.length;t++)this.clickName[t].addEventListener("click",(e=>{this.bodyTicket=document.querySelectorAll(".ticket-body");const i=e.target,n=i.dataset.body;i.classList.contains("n")&&fetch(`http://localhost:7070/?method=ticketById&id=${n}`).then((t=>t.json())).then((e=>{let i=e.description;document.querySelectorAll(".ticket-description")[t].textContent=i}))}))}status(){this.statusColection=this.root.querySelectorAll(".ticket-status"),this.colectionticket=this.root.querySelectorAll(".ticket-wrapper");for(let t=0;t<this.statusColection.length;t++)"true"===this.statusColection[t].dataset.status?this.statusColection[t].textContent="V":"false"===this.statusColection[t].dataset.status&&(this.statusColection[t].textContent=""),this.statusColection[t].addEventListener("click",(()=>{let e=this.colectionticket[t].dataset.id,i={status:null};this.statusColection[t].textContent?(this.statusColection[t].textContent="",i.status=!1):this.statusColection[t].textContent||(this.statusColection[t].textContent="V",i.status=!0),fetch(`http://localhost:7070/?method=updateById&id=${e}`,{method:"POST",body:JSON.stringify(i)}),this.reInit()}))}}(i);s.init(),n.addEventListener("click",(()=>{s.newTicket()}))})();