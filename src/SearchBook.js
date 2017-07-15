import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'
// Handling the queries and sorting by
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class SearchBook extends Component {
  constructor(props) {
       super(props)
   }

  state  = {
    query: '',
    searchedBooks: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim()})
  }

  render (){
    let searchedBooks
    if (this.state.query) {
      // If there is a query, they scape special characters
      const match = new RegExp(escapeRegExp(this.state.query), 'i')

      console.log(this.state.query)
      // Make the call to the api and populate the books with it
      BooksAPI.search(this.state.query, 20).then((searchedBooks) => {
        this.setState({ books: searchedBooks })
      })
    }

    return (
      <div className="list-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search">
            close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              className=""
              type="text"
              value={this.state.query}
              placeholder="search books"
              onClick={(event) => console.log(this.props)}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-book-search">
          <Bookshelf books={this.props.books} onShelfChange={this.props.onShelfChange} category='none'/>
        </div>
      </div>
    )
  }
}

export default SearchBook
