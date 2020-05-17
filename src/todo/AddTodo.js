import React, { useState, useContext } from 'react';
import Context from '../context';

function useInput(defValue = '') {
  const [value, setValue] = useState(defValue)

  return {
    bind: {
      value,
      onChange: ({target}) => setValue(target.value)
    },
    value: () => value,
    reset: () => setValue('')
  }
}

function AddTodo() {
  const { addTodo } = useContext(Context)

  const input = useInput()

  function submitHandler(e) {
    e.preventDefault()
    if (input.value().trim()) {
      addTodo(input.value())
      input.reset()
    }
  }

  return (
    <form className="filter" onSubmit={submitHandler}>
      <input className="filter__input" {...input.bind} />
      <button className="filter__btn" type="submit">Add Todo</button>
    </form>
  )
}

export default AddTodo