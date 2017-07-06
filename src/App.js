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
    books: [],
    /*books: [
      {
        title: 'El pendulo de foucault',
        authors: 'Umberto Eco',
        imageLinks: {smallThumbnail: 'http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'},
        shelf: 'currentlyReading',
        id: '32sdfs'
      },
      {
        title: 'Libro dos',
        authors: 'Umberto Eco',
        imageLinks: {smallThumbnail: 'http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'},
        shelf: 'wantToRead',
        id: '323sd'
      },
      {
        title: 'Libro tres',
        authors: 'Umberto Eco',
        imageLinks: {smallThumbnail: 'http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'},
        shelf: 'read',
        id: '32323'
      }
    ]*/
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
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
                <Bookshelf books={this.state.books} category='currentlyReading' bookshelf_title='Currently Reading'/>
                <Bookshelf books={this.state.books} category='wantToRead' bookshelf_title='Want to Read'/>
                <Bookshelf books={this.state.books} category='read' bookshelf_title='Read'/>
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
