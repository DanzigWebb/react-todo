import React from 'react'
import Context from './context'
import { Subject } from 'rxjs'

import TodoList from './Todo/TodoList'
import AddTodo from './Todo/AddTodo'
import Loader from './Loader/Loader'
import Modal from './Modal/Modal'
import TodoFilter from './Todo/TodoFilter'
import { Search$ } from './rxjs/search'


let initialTodos = []
const filteredTodos = new Subject([])
const search = Search$.subscribe(value => {
  console.log('search', value);
  const todos = initialTodos.filter(todo => todo.title.includes(value));
  filteredTodos.next(todos)
})

fetch('https://jsonplaceholder.typicode.com/todos?_limit=20')
  .then(response => response.json())
  .then(todos => {
    initialTodos = todos
    filteredTodos.next(initialTodos)
  })

function App() {

  const [todos, setTodos] = React.useState([])
  const [load, setLoad] = React.useState(true)

  filteredTodos.subscribe((todos) => {
    setLoad(false)
    setTodos(todos)
  })

  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  function removeTodo(id) {
    setTodos(
      todos.filter(todo => todo.id !== id)
    )
  }

  function addTodo(title) {
    setTodos(
      [...todos, { id: Date.now(), completed: false, title }]
    )
  }


  return (
    <Context.Provider value={{ removeTodo, toggleTodo }}>
      <div className="wrapper">
        <h1>React</h1>
        <AddTodo onCreate={addTodo} />
        <Modal title="Modal Title" />
        <TodoFilter />
        {
          load
            ? <Loader />
            : todos.length ? <TodoList todos={todos} /> : "No todos"
        }

      </div>
    </Context.Provider>
  );
}

export default App;
