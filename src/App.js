import React from 'react'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  shelfChange = (book,event) => {
    const valor = event.target.value
    this.setState((state) => ({
      books: state.books.map((b) => { return b.id === book.id ? (b.shelf = valor, b) : (b)})
    }))
  }

  render() {
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf  onShelfChange={this.shelfChange} books={this.state.books} category='currentlyReading' bookshelf_title='Currently Reading'/>
                <Bookshelf  onShelfChange={this.shelfChange} books={this.state.books} category='wantToRead' bookshelf_title='Want to Read'/>
                <Bookshelf  onShelfChange={this.shelfChange} books={this.state.books} category='read' bookshelf_title='Read'/>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
      </div>
    )
  }
}

export default BooksApp
