import React, { useContext } from "react"
import PropTypes from "prop-types"
import Context from '../context'

const styles = {
  li: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    border: '1px dashed #ccc',
    borderRadius: '4px',
    marginBottom: '0.8rem'
  },
  checkbox: {
    marginRight: '0.8rem'
  }
}

function TodoItem({ todo, index, onChange }) {
  const { removeTodo, toggleTodo } = useContext(Context)
  return (
    <li style={styles.li}>
      <span className={todo.completed ? 'done' : ''}>
        <input
          type="checkbox"
          style={styles.checkbox}
          onChange={() => toggleTodo(todo.id)} 
          checked={todo.completed}
        />
        <strong>{index + 1}</strong>
        &nbsp;
        <span>{todo.title}</span>
      </span>

      <button className="btn" onClick={() => removeTodo(todo.id)}>&times;</button>
    </li>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
}

export default TodoItem