import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

class Bookshelf extends React.Component {
  render () {

    const books = [
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
    ]

    return <div className="bookshelf">
      <h2 className="bookshelf-title">{this.props.bookshelf_title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.filter(book => book.shelf === this.props.category).map(book => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url({book.imageLinks.smallThumbnail})' }}></div>
                  <div className="book-shelf-changer">
                    <select>
                      <option value="none" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">book.authors</div>
              </div>
            </li>
          ))}
        </ol>
        </div>
    </div>
  }
}

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
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
                <Bookshelf category='currentlyReading' bookshelf_title='Currently Reading'/>
                <Bookshelf category='wantToRead' bookshelf_title='Want to Read'/>
                <Bookshelf category='read' bookshelf_title='Read'/>
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
