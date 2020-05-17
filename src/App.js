import React, { useEffect } from 'react'
import Context from './context'

import TodoList from './Todo/TodoList'
import AddTodo from './Todo/AddTodo'
import Loader from './Loader/Loader'
import Modal from './Modal/Modal'
import TodoFilter from './Todo/Filter/TodoFilter'
import { Search$, Filtered$ } from './Todo/Filter/FilterStreams'
import { BehaviorSubject } from 'rxjs'

const initialTodos$ = new BehaviorSubject([])

fetch('https://jsonplaceholder.typicode.com/todos?_limit=20')
  .then(response => response.json())
  .then(todos => {
    initialTodos$.next(todos)
    Filtered$.next(initialTodos$.value)
  })

function App() {

  const [todos, setTodos] = React.useState([])
  const [load, setLoad] = React.useState(true)

  useEffect(() => {
    Filtered$.subscribe((todos) => {
      setLoad(false)
      setTodos(todos)
    })

    Search$.subscribe(value => {
      const filter = initialTodos$.value.filter(todo => todo.title.includes(value))
      Filtered$.next(filter)
    })
  }, [])

  function toggleTodo(id) {
    const newTodos = initialTodos$.value.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
    setTodos(newTodos)
  }

  function removeTodo(id) {
    const newTodos = initialTodos$.value.filter(todo => todo.id !== id)
    initialTodos$.next(newTodos)
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title) {
    initialTodos$.next(
      [{ id: Date.now(), completed: false, title }, ...initialTodos$.value ]
    )
    setTodos(
      [{ id: Date.now(), completed: false, title }, ...todos ]
    )
  }


  return (
    <Context.Provider value={{ removeTodo, toggleTodo, addTodo }}>
      <div className="wrapper">
        <div className="todo__heading">
          <h1>React</h1>
          <Modal title="Create Todo" />
        </div>

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
