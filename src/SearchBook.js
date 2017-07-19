import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'
// Handling the queries and sorting by
import escapeRegExp from 'escape-string-regexp'
//import sortBy from 'sort-by'

class SearchBook extends Component {
  constructor(props) {
       super(props)
   }

  state  = {
    query: '',
    searchedBooks: []
  }

  updateQuery = (query) => {
    // (query !== this.state.query) && (this.setState({ query: query.trim()}),console.log(query))
    if (query !== this.state.query) {
      // 0. Checking it is calling the function from the search field
      console.log(query)
      // 1. we update the value of query in the state
      this.setState({ query: query.trim()})
      // 2. we repopulate the searchedBooks
      BooksAPI.search(this.state.query, 20).then((searchedBooks) => {
        this.setState({ searchedBooks })
      })
    }
  }


  render (){
    let searchedBooks
    if (this.state.query) {
      // If there is a query, they scape special characters
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      // Make the call to the api and populate the books with it
      /*
      BooksAPI.search(this.state.query, 20).then((searchedBooks) => {
        this.setState({ books: searchedBooks })
      })
      */
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
              placeholder="search books"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-book-search">
          <Bookshelf books={this.state.searchedBooks} onShelfChange={this.props.onShelfChange} onUpdate={this.props.onUpdate} category='none'/>
        </div>
      </div>
    )
  }
}

export default SearchBook
