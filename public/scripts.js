const currentPage = location.pathname;
const menus =  document.querySelectorAll("header .links a");

for (const menu of menus) {
  if(currentPage.includes(menu.getAttribute("href"))){
    menu.classList.add("active")
  }
}

/* verificando se deseja deletar um membro ou um instrutor*/

const formDelete = document.querySelector("#form-delete");
formDelete.addEventListener("submit",function(event){
    const confirmation = confirm("deseja realmente deletar?");
    if(!confirmation){
      event.preventDefault();
    }
}); 