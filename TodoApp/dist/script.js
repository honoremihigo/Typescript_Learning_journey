let id = 1;
function addTodo(todo) {
    if (todo === null)
        throw new Error("cant add empty todo");
    const todoContainer = JSON.parse(localStorage.getItem("todos") ?? "[]");
    localStorage.setItem('todos', JSON.stringify([...todoContainer, todo]));
    console.log("it happened");
    return "the todo added successfully";
}
function deleteTodo(id) {
    const todoContainer = JSON.parse(localStorage.getItem("todos") ?? "[]");
    const selectedTodo = todoContainer.find(todo => todo.id === id);
    if (!selectedTodo)
        throw new Error("the todo with this `id` is not found");
    const newTodo = todoContainer.filter(todo => todo.id !== id);
    localStorage.removeItem("todos");
    localStorage.setItem('todos', JSON.stringify(newTodo));
    return "the todo deleted successfully";
}
function completeTodo(id) {
    const todoContainer = JSON.parse(localStorage.getItem("todos") ?? "[]");
    const selectedTodo = todoContainer.find(todo => todo.id === id);
    if (!selectedTodo)
        throw new Error("the todo with this `id` is not found");
    selectedTodo.completed = true;
    localStorage.removeItem('todos');
    localStorage.setItem('todos', JSON.stringify(todoContainer));
    return `the task "${selectedTodo.text}" is completed`;
}
const input = document.getElementById("input");
const addbtn = document.getElementById("addbtn");
const todo_container = document.getElementById("todo_cont");
const todoFrag = document.createDocumentFragment();
function displayTodo() {
    const todoContainer = JSON.parse(localStorage.getItem("todos") ?? "[]");
    console.log(todoContainer);
    for (const todo of todoContainer) {
        const p = document.createElement('p');
        const btn = document.createElement('button');
        p.textContent = todo.text;
        btn.textContent = "delete";
        btn.classList.add('delbtn');
        todoFrag.append(p);
        todoFrag.append(btn);
    }
    todo_container.append(todoFrag);
}
addbtn?.addEventListener('click', (e) => {
    e.preventDefault();
    if (!input || !input.value)
        throw new Error("the input do not have to be null");
    console.log('clicked');
    const newTodo = { id: id++, text: input.value, completed: false, createdAt: new Date() };
    const message = addTodo(newTodo);
    console.log(message);
    displayTodo();
});
displayTodo();
export {};
//# sourceMappingURL=script.js.map