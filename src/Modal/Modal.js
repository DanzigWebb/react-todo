import React from 'react'
import './Modal.css'

export default class Modal extends React.Component {

  state = {
    isOpen: false
  }

  open = () => this.setState({isOpen: true})
  close = () => this.setState({isOpen: false})

  render() {
    return (
      <React.Fragment>
        <button onClick={() => this.open()}>Open</button>

        {this.state.isOpen && (
          <div className="modal">
            <div className="overlay" onClick={() => this.close()}></div>
            <div className="modal__content">
              <h1>Title</h1>
              <p>Lorem ipsum dolor sit.</p>
              <button onClick={() => this.close()}>Close</button>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}