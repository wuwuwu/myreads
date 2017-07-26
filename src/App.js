import React from 'react'
import {
  Route,
  Link
} from 'react-router-dom'
import sortBy from 'sort-by'
import Bookshelf from './Bookshelf'
import SearchBook from './SearchBook'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    newbooks: []
  }
  /*

  // TODO: [] Refactor to have a Book component. Verify and operate over the book ditionary itself in the component
  // TODO: [] Add logic to show the number of books in each category
  // TODO: [] Handle the delay when updating books (changing shelfs), update local data directly instead of doing after updating with api put.then `BooksAPI.update` . if `success` do nothing, if `error` rollback the local change
  // TODO: [] Learn how to create regresive tests for each keyword in the search
  */

  updateBook = (book, evt) => {
    let shelf = evt.target.value
    let newbooks = this.state.books.slice()
    let booksKeys = this.state.books.map((b) => {
      return b.id
    })
    booksKeys.includes(book.id) ? (
      this.setState((state) => ({ books: this.state.books.map((b) => { return b.id === book.id ? (b.shelf = shelf, b) : (b)}).sort(sortBy('title'))})),
      BooksAPI.update(book, shelf).then(() => {})
    ):(
      book.shelf = shelf,
      newbooks.push(book),
      this.setState({ books: newbooks.sort(sortBy('title')) }),
      BooksAPI.update(book, shelf).then(() => {})
    )
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
      {/* Route for the Homepage */}
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <Bookshelf books={this.state.books.filter(book => book.shelf === 'currentlyReading')} onShelfChange={this.updateBook} bookshelf_title={'Currently reading'}/>
                <Bookshelf books={this.state.books.filter(book => book.shelf === 'wantToRead')} onShelfChange={this.updateBook} bookshelf_title={'Want to read'}/>
                <Bookshelf books={this.state.books.filter(book => book.shelf === 'read')} onShelfChange={this.updateBook} bookshelf_title={'Read'}/>
            </div>
            {/* Add a book */}
            <div className="open-search">
              <Link
                to="/search">
                Add a book
              </Link>
            </div>
          </div>
        )}/>
        {/* Route for the Search */}
        <Route exact path="/search"  render={() => (
          <SearchBook onShelfChange={this.updateBook} books={this.state.books}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
