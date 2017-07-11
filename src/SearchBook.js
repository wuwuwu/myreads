import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'


class SearchBook extends Component {
  state  = {
    books: [],
    query: ''
  }

  updateQuery = (query) => {
    // console.log(query)
    this.setState({ query: query.trim()})
    // Here we should make the call for the api?
    /*
    BooksAPI.search(query, 20).then((books) => {
      this.setState({ books })
    })
    */
  }
  shelfChange = (book,event) => {
    const shelf = event.target.value
    console.log('we are changing the category of '+ book.title)
    BooksAPI.update(book, shelf).then(() => {
      // Make the changes in the state
      this.setState((state) => ({
        books: state.books.map((b) => { return b.id === book.id ? (b.shelf = shelf, b) : (b)})
      }))

    })
  }
  render (){
    let showingBooks
    if (this.state.query) {
      // If there is a query, they scape special characters
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      console.log(match)
      console.log(this.state.query)
      BooksAPI.search(this.state.query, 20).then((books) => {
        console.log(books)
        this.setState({ books })
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
              type="Text"
              value={this.state.query}
              placeholder="search books"
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-book-search">
          <Bookshelf onShelfChange={this.shelfChange} books={this.state.books} category='none'/>
        </div>
      </div>
    )
  }
}

export default SearchBook
