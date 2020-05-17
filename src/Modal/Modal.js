import React from 'react'
import './Modal.css'
import AddTodo from '../Todo/AddTodo'

export default class Modal extends React.Component {

  state = {
    isOpen: false
  }

  open = () => this.setState({ isOpen: true })
  close = () => this.setState({ isOpen: false })

  render() {
    return (
      <React.Fragment>
        <button className="modal__btn" onClick={() => this.open()}>New</button>

        {this.state.isOpen && (
          <div className="modal">
            <div className="overlay" onClick={() => this.close()}></div>
            <div className="modal__content">
              <h1>{this.props.title}</h1>
              <AddTodo />
              <button className="modal__btn" onClick={() => this.close()}>Close</button>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}