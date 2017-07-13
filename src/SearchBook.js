import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'


class SearchBook extends Component {
  state  = {
    searchedBooks: [],
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim()})
  }

  shelfChange = (book,event) => {
    const shelf = event.target.value
    //console.log('we are changing the category of '+ book.title)
    //console.log(this.state.searchedBooks)
    BooksAPI.update(book, shelf).then(() => {
      // Make the changes in the state
      this.setState((state) => ({
        books: this.props.hpBooks.map((b) => { return b.id === book.id ? (b.shelf = shelf, b) : (b)})
      }))

    })
  }

  render (){
    const { onShelfChange} = this.props
    // To test that I am actually passing the hp books to the search component as a props
    console.log('Homepage books are:')
    console.log(this.props.hpBooks)
    let showingBooks
    if (this.state.query) {
      // If there is a query, they scape special characters
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      //console.log(match)
      //console.log(this.state.query)
      BooksAPI.search(this.state.query, 20).then((searchedBooks) => {
        this.setState({ searchedBooks })
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
              onClick={(event) => this.props.changeFromSearch()}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-book-search">
          <Bookshelf books={this.state.searchedBooks} hpBooks={this.props.hpBooks} onShelfChange={this.shelfChange} onChangeFromSearch={this.props.changeFromSearch} category='none'/>
        </div>
      </div>
    )
  }
}

export default SearchBook
