import React, { useEffect } from 'react'
import Context from './context'

import TodoList from './Todo/TodoList'
import AddTodo from './Todo/AddTodo'
import Loader from './Loader/Loader'
import Modal from './Modal/Modal'


function App() {

  const [todos, setTodos] = React.useState([])
  const [load, setLoad] = React.useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(todos => {
        setTimeout(() => {
          setTodos(todos)
          setLoad(false)
        }, 1000);
      })
  }, [])

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
        <Modal />
        <AddTodo onCreate={addTodo} />
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
