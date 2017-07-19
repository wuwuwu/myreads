import React from 'react'
import {
  Route,
  Link
} from 'react-router-dom'
import Bookshelf from './Bookshelf'
import SearchBook from './SearchBook'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    counter: 0,
    books: [],
    newbooks: []
  }
  /*
  TO DO


  // [] Add Logic for search showing actual api returned books
  // [] Not all books have a Thumbnail, imageLinks or Authors, create a logic to use default values in that case (null or undefined)
  // [] In the search query, check if it has changed and only make the call if it has indeed changed
  // [] Refactor to have a Book component. Verify and operate over the book ditionary itself in the component
  // [] Isolate change of shelf as a function
  // [] Add logic to show the number of books in each category

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
    const shelf = evt.target.value
    BooksAPI.update(book, shelf).then(() => {
      // Create a new array to treat the state as stateless
      const newbooks = this.state.books.slice()
      //We use a ternary operator to check if the book exists in the array
      this.state.books.includes(book) ? (
        // if it does exists, create a new array using map, with the shelf values changed for the book
        this.setState((state) => ({ books: this.state.books.map((b) => { return b.id === book.id ? (b.shelf = shelf, b) : (b)})}))
      ): (
        // if it does not exist, change the shelf and add the book to the new array, set it in the state
        book.shelf = shelf,
        newbooks.push(book),
        this.setState({ books: newbooks })

      )
    })
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
    BooksAPI.search("Android", 20).then((booksSearched) => {
      this.setState({ booksSearched })
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
                <Bookshelf counter={ this.state.counter } books={this.state.books.filter(book => book.shelf === 'currentlyReading')} onShelfChange={this.updateBook} onUpdate={this.onUpdate} bookshelf_title={'Currently reading'}/>
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
          <SearchBook booksSearched={this.state.booksSearched} onShelfChange={this.updateBook} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
