type Todo = {
    id: number
    text: string
    completed: boolean
    createdAt:Date
}

let id:number = 1

function addTodo(todo:Todo): string {
    if(todo === null) throw new Error("cant add empty todo")
    const todoContainer: Todo[] = JSON.parse(localStorage.getItem("todos") ?? "[]")
    localStorage.setItem('todos', JSON.stringify([...todoContainer,todo]))
    console.log("it happened")
    return "the todo added successfully"
}


function deleteTodo(id: number): string{
    const todoContainer: Todo[] = JSON.parse(localStorage.getItem("todos") ?? "[]")
    const selectedTodo = todoContainer.find(todo => todo.id === id)
    if(!selectedTodo) throw new Error("the todo with this `id` is not found")
    const newTodo = todoContainer.filter(todo => todo.id !== id)
    localStorage.removeItem("todos")
    localStorage.setItem('todos', JSON.stringify(newTodo))
    return "the todo deleted successfully"
}


function completeTodo(id:number): string{
    const todoContainer: Todo[] = JSON.parse(localStorage.getItem("todos") ?? "[]")
    const selectedTodo = todoContainer.find(todo => todo.id === id)
    if(!selectedTodo) throw new Error("the todo with this `id` is not found")
    selectedTodo.completed = true
    localStorage.removeItem('todos')
    localStorage.setItem('todos', JSON.stringify(todoContainer))
    return `the task "${selectedTodo.text}" is completed`
}



const input = document.getElementById("input") as HTMLInputElement
const addbtn = document.getElementById("addbtn") as HTMLButtonElement
const todo_container = document.getElementById("todo_cont") as HTMLDivElement
const todoFrag = document.createDocumentFragment()

function displayTodo(): void{
    const todoContainer: Todo[] = JSON.parse(localStorage.getItem("todos") ?? "[]")
    console.log(todoContainer)
    for(const todo of todoContainer){
        const p = document.createElement('p')
        const btn = document.createElement('button')
        p.textContent = todo.text
        btn.textContent = "delete"
        btn.classList.add('delbtn')
        todoFrag.append(p)
        todoFrag.append(btn)
    }
    todo_container.append(todoFrag)
}


addbtn?.addEventListener('click',(e)=>{
    e.preventDefault()
    if(!input || !input.value) throw new Error("the input do not have to be null")
    console.log('clicked')
    const newTodo: Todo = { id:id++, text: input.value , completed: false, createdAt:new Date() }
    const message = addTodo(newTodo)
    console.log(message)
    displayTodo()
})

displayTodo()
