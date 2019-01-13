import React from 'react'
import styles from '../App.scss'
import PropTypes from 'prop-types'

export default class Modal extends React.Component {
  render () {
    const { open } = this.props
    return (
      <div
        className={`${styles.modal} ${open ? styles.openModal : ''}`}
        onClick={() => this.props.closeModal()}
      >
        <div onClick={e => {
          e.stopPropagation()
        }}>
          <header>
            <h2>Add new company</h2>
          </header>
          {this.props.children}
        </div>
      </div>
    )
  }
}
Modal.propTypes = {
  open: PropTypes.bool,
  closeModal: PropTypes.func,
  children: PropTypes.element,
}
