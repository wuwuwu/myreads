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
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
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

  changeFromSearch = (event) => {
    console.log('Doing my best to sync the hp and search view')
    console.log(this.state.books)
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
          <SearchBook state={this.state} onShelfChange={this.shelfChange} hpBooks={this.state.books} changeFromSearch={this.changeFromSearch}/>
        )}/>

      </div>
    )
  }
}

export default BooksApp
