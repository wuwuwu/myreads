import React from 'react'
import { Link, Route } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import SearchBook from './SearchBook'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      booksSearched: [],
      query: {}
    }
  }

  shelfChange = (book,event) => {

    //ok console.log(this.state.books)
    //ok console.log(book)
    //ok but not render
    //this.setState((state,book) => ({ books: state.books.concat(book) }))
    //console.log(this.state.books)

    console.log('changing books to one shelf, ' + event.target.value + ', from another.')
    // agregamos el valor a una constante
    const shelf = event.target.value
    // We update the book with the new shelf
    BooksAPI.update(book, shelf).then(() => {
      // if the update is successful we then either change the value of self in the state array
      if (this.state.books.indexOf(book) !== -1) {
        console.log('Esta en el array, change shelf')
        // Update the value of shelf for book in array
        this.setState((state) => ({
            books: this.state.books.map((b) => { return b.id === book.id ? (b.shelf = shelf, b) : (b)})
          }))
      } else {
        console.log('No esta en el array, we need to add it')
        // or we add the new book in the state array
        /*
        this.setState((state) => {
          return {
            books: this.state.books.concat([book])
          }
        })
        */
        this.setState((state,book) => ({ books: state.books.concat(book) }))
        console.log(this.state.books)
      }
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
//    console.log(this.state.books)
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
                <Bookshelf booksToDisplay={this.state.books} onShelfChange={this.shelfChange} category='currentlyReading'/>
              </div>
              <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
                <Bookshelf booksToDisplay={this.state.books} onShelfChange={this.shelfChange} category='wantToRead'/>
              </div>
              <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
                <Bookshelf booksToDisplay={this.state.books} onShelfChange={this.shelfChange} category='read'/>
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
          <SearchBook booksToDisplay={this.state.booksSearched} books={this.state.books} onShelfChange={this.shelfChange} category='none'/>
        )}/>

      </div>
    )
  }
}

export default BooksApp
