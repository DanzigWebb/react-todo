import React from "react";
import PropTypes from "prop-types";

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

function TodoItem({ todo, index }) {
  return (
    <li style={styles.li}>
      <span>
        <input type="checkbox" style={styles.checkbox}/>
        <strong>{index + 1}</strong>
        &nbsp;
        <span>{todo.title}</span>
      </span>

      <button className="btn">&times;</button>
    </li>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number
}

export default TodoItem