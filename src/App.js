import React from 'react'
import Context from './context'

import TodoList from './Todo/TodoList'
import AddTodo from './Todo/AddTodo'

function App() {

  const [todos, setTodos] = React.useState(
    [
      { id: 1, completed: false, title: 'Create React App' },
      { id: 2, completed: true, title: 'Install node' },
      { id: 3, completed: false, title: 'Save to Github' },
    ]
  )

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

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>React</h1>
        <AddTodo />
        {todos.length
          ? <TodoList todos={todos} onToggle={toggleTodo} />
          : "No todos"
        }

      </div>
    </Context.Provider>
  );
}

export default App;
