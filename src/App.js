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
    newbooks: [],
    query: {}
  }
  /*
  TO DO
  // [] Add conditional, if the books exists, change the shelf value
  // X Add Logic to show in book sub menu the current category of the book
  // [] If it does not exists, add it to the state
  // [] Add a rule to check if the id actually exists in the array
  // X Show different homepage and search pages | Adding routes
  // [] Add Logic for search showing actual api returned books
  // X Add a shelf foor each category
  // X Add logic to change the shelf title acordingly with the category

  */
  onUpdate = (book, evt) => {
    console.log(this.state.counter)
    const newCounter = this.state.counter + 1
    console.log(newCounter)
    console.log(book.title)
    const newbooks = this.state.books.slice()
    newbooks.push(book)
    console.log(newbooks)
    this.setState({ counter: newCounter, books: newbooks })
  }


  updateBook = (book, evt) => {
    const shelf = evt.target.value
    const newbooks = this.state.books.concat(book)
    //Check if the book already exists in books, returns true if exists, false if not
    console.log(this.state.books.includes(book))
    // Probamos a agregarlo a un nuevo array
    var newArray = this.state.books.slice()
    newArray.push(book)

    //We use a ternary operator
    this.state.books.includes(book) ? (
      this.setState((state) => ({ books: this.state.books.map((b) => { return b.id === book.id ? (b.shelf = shelf, b) : (b)})}))
    ): (
      console.log('This is a new book'),
      console.log(newArray),
      //this.setState((state) => ({ books: newArray })),
      this.setState({books: newArray}),
      console.log(this.state.books)
    )
    // 1. to create a new array using maps, change the value of shelf if book exists
    //const newbooks = this.state.books.concat(book)
    /*
    this.setState((state) => ({
      books: this.state.books.map((b) => { return b.id === book.id ? (b.shelf = shelf, b) : (b)})
    }))
    */
        // check that it has changed the shelf value in the new arraw
  //  console.log(this.state.books.indexOf(book))
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
              <h1>MyReads {this.state.counter}</h1>
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
          <SearchBook booksSearched={this.state.booksSearched} onShelfChange={this.updateBook} onUpdate={this.onUpdate} category='none'/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
