import React, { Component } from 'react'
import Bookshelf from './Bookshelf'

class SearchBook extends Component {
  render (){
    return (
      <div>
        <div className="search-books-bar">
        <a href="#" className="close-search">close</a>
          <div className="search-books-input-wrapper">
            <input
              className=""
              type="Text"
              value="Click to search books"
              placeholder="search bookss"
            />
          </div>

        </div>
        <div className="search-book-results">
          Here go the search results! yahoo!
        </div>
      </div>
    )
  }
}

export default SearchBook
