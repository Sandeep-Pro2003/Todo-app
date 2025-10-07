const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-form input[type='text']");
const todoList = document.querySelector("#todoList");
const settodo =JSON.parse(localStorage.getItem("data")) || [];

function saveTodo(){
  localStorage.setItem("data",JSON.stringify(settodo));
}
todoForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  const newTodoText = todoInput.value.trim();
  if(newTodoText==="") return; 
  settodo.push(newTodoText); 
  saveTodo();
  showData();
  todoInput.value="";
});
todoList.addEventListener("click", (e) => {
  const target = e.target;
   const li = target.closest("li");
    if (target.innerText === "Done") {
    const span = li.querySelector("span");
    span.classList.toggle("line-through");
  }
  if (target.innerText === "Delete") {
    const li = target.closest("li");
    if (li) {
      const span = li.querySelector("span");
      if (span) {
        const text = span.innerText;
        const index = settodo.indexOf(text);
        if (index !== -1) {
          settodo.splice(index, 1);
        }
      }
    }
  }

  saveTodo();
  showData();
});

function showData(){
  todoList.innerHTML ="";
  for(let todo of settodo){
    const newLi = document.createElement("li");
  const newLiinnerHtml = `
        <span class="pl-5">${todo}</span>
          <div class="pr-2">
            <button class="text-slate-600 px-3 py-0.5 bg-yellow-500 rounded hover:bg-slate-900 hover:text-white transition-all duration-200">Done</button>
            <button class="text-red-600 px-3 py-0.5 bg-slate-800 rounded hover:bg-red-900 hover:text-white transition-all duration-200">Delete</button>
          </div>`;
  newLi.innerHTML = newLiinnerHtml;
  todoList.appendChild(newLi);

  }
}

showData()