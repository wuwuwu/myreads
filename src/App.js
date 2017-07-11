import React from 'react'
import { Link, Route } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import SearchBook from './SearchBook'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    query: {}
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  shelfChange = (book,event) => {
    const shelf = event.target.value
    console.log('am I able to do said change?')
    BooksAPI.update(book, shelf).then(() => {
      // Make the changes in the state
      this.setState((state) => ({
        books: state.books.map((b) => { return b.id === book.id ? (b.shelf = shelf, b) : (b)})
      }))

    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
                <Bookshelf  onShelfChange={this.shelfChange} books={this.state.books} category='currentlyReading'/>
              </div>
              <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
                <Bookshelf  onShelfChange={this.shelfChange} books={this.state.books} category='wantToRead'/>
              </div>
              <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
                <Bookshelf  onShelfChange={this.shelfChange} books={this.state.books} category='read'/>
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
          <SearchBook state={this.state}/>
        )}/>

      </div>
    )
  }
}

export default BooksApp
