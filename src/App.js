import React from 'react'
import { Link, Route } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import SearchBook from './SearchBook'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    query: {},
    counter: 0
  }

  shelfChange = (book,event) => {
    const shelf = event.target.value
    BooksAPI.update(book, shelf).then(() => {
      // Make the changes in the state
      this.setState((state) => ({
        books: this.state.books.map((b) => { return b.id === book.id ? (b.shelf = shelf, b) : (b)})
      }))

    })
  }

  shelfChangeS = (book,event) => {
    console.log(this.props.books)
    this.setState((state) => ({
      //console.log('updating counter')
      counter: this.state.counter + 1
    }))
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
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads {this.state.counter}</h1>
            </div>
            <div className="list-books-content">
              <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
                <Bookshelf books={this.state.books} onShelfChange={this.shelfChange} category='currentlyReading'/>
              </div>
              <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
                <Bookshelf books={this.state.books} onShelfChange={this.shelfChange} category='wantToRead'/>
              </div>
              <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
                <Bookshelf books={this.state.books} onShelfChange={this.shelfChange} category='read'/>
              </div>
            </div>
            <div className="open-search">
              <Link
                to="/search">
                Add a book
              </Link>
            </div>
          </div>
        )}/>

        <Route exact path="/search"  render={() => (
          <SearchBook books={this.state.books} onShelfChange={this.shelfChange} category='none'/>
        )}/>

      </div>
    )
  }
}

export default BooksApp
