import React from 'react'
import TodoList from './Todo/TodoList'

function App() {
  const todos = [
    {id: 1, completed: false, title: 'Create React App'},
    {id: 2, completed: false, title: 'Install node'},
    {id: 3, completed: false, title: 'Save to Github'},
  ]

  return (
    <div className="wrapper">
      <h1>React</h1>

      <TodoList todos={todos}/>
    </div>
  );
}

export default App;
