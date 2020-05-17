import React, { useState } from 'react';
import PropTypes from 'prop-types'

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

function AddTodo({ onCreate }) {
  const input = useInput()

  function submitHandler(e) {
    e.preventDefault()
    if (input.value().trim()) {
      onCreate(input.value())
      input.reset()
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <input {...input.bind} />
      <button type="submit">Add Todo</button>
    </form>
  )
}

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired
}

export default AddTodo