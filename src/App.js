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
  TO DO

  // [] Refactor to have a Book component. Verify and operate over the book ditionary itself in the component
  // [] Add logic to show the number of books in each category
  // [] Handle the delay when updating books (changing shelfs), update local data directly instead of doing after updating with api put.then `BooksAPI.update` . if `success` do nothing, if `error` rollback the local change
  // [] Learn how to create regresive tests for each keyword in the search

  // X Solve problem changing an existing book from the search view, creating a duplicated book
  // X Add feature: always order books alphabetically and scape characters
  // X Not all books have a Thumbnail, imageLinks or Authors, create a logic to use default values in that case (null or undefined)
  // X In the search query, check if it has changed and only make the call if it has indeed changed
  // X Add Logic for search showing actual api returned books
  // X Find out why changes in search do not update the Search view
  // X Add conditional, if the books exists, change the shelf value
  // X If it does not exists, add it to the state
  // X Clean the code from console calls
  // X Make a call updating the API when the values of the book are changed
  // X Add a rule to check if the id actually exists in the array
  // X Add logic to change shelf of the book even in the search
  // X Add Logic to show in book sub menu the current category of the book
  // X Show different homepage and search pages | Adding routes
  // X Add a shelf foor each category
  // X Add logic to change the shelf title acordingly with the category

  */

  updateBook = (book, evt) => {
    let shelf = evt.target.value
    let newbooks = this.state.books.slice()
    let booksKeys = this.state.books.map((b) => {
      return b.id
    })
    booksKeys.includes(book.id) ? (
      this.setState((state) => ({ books: this.state.books.map((b) => { return b.id === book.id ? (b.shelf = shelf, b) : (b)}).sort(sortBy('title'))}))
    ):(
      book.shelf = shelf,
      newbooks.push(book),
      this.setState({ books: newbooks.sort(sortBy('title')) })
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
