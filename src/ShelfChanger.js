import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ShelfChanger extends Component {

  render () {
    console.log(this.props.book)
    return (
      <div className="book-shelf-changer">
         <select defaultValue={this.props.book.shelf} onClick={(evt) => console.log(this.props.book)} onChange={(evt) => this.props.onShelfChange(this.props.book, evt)}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

ShelfChanger.propTypes = {
  book: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func
}

export default ShelfChanger
