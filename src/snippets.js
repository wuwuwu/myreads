// PAra cambiar los libros de estanteria

shelfChange = (book,event) => {
  const shelf = event.target.value
  BooksAPI.update(book, shelf).then(() => {
    // Make the changes in the state
    this.setState((state) => ({
      books: this.state.books.map((b) => { return b.id === book.id ? (b.shelf = shelf, b) : (b)})
    }))

  })
}


// Select handling event
<select defaultValue={book.shelf} onChange={(evt) => onShelfChange(book, evt)} onClick={(event) => this.props.onChangeFromSearch()}>

// to better organize the calls and writing less code
const { category} = this.props


// Para hacer las queries

let showingBooks
if (this.state.query) {
  // If there is a query, they scape special characters
  const match = new RegExp(escapeRegExp(this.state.query), 'i')
  //console.log(match)
  //console.log(this.state.query)
  BooksAPI.search(this.state.query, 20).then((searchedBooks) => {
    this.setState({ searchedBooks })
  })
}


// Shelf change dentro de search-book-search
shelfChange = (book,event) => {
  const shelf = event.target.value
  //console.log('we are changing the category of '+ book.title)
  //console.log(this.state.searchedBooks)
  BooksAPI.update(book, shelf).then(() => {
    // Make the changes in the state
    this.setState((state) => ({
      books: this.props.hpBooks.map((b) => { return b.id === book.id ? (b.shelf = shelf, b) : (b)})
    }))

  })
}



//Bookshelf.js

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component {
  render () {
    //console.log("this are the props of Bookshelf")
    //console.log(this.props)
   return(

     <div className="bookshelf-books">
       <ol className="books-grid">
         {this.props.books.filter(book => book.shelf === this.props.category).map(book => (
           <li key={book.id}>
             <div className="book">
               <div className="book-top">
                 <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                 <div className="book-shelf-changer">
                    <select defaultValue={book.shelf} onChange={(evt) => this.props.onShelfChange(book, evt)}>
                     <option value="none" disabled>Move to...</option>
                     <option value="currentlyReading">Currently Reading</option>
                     <option value="wantToRead">Want to Read</option>
                     <option value="read">Read</option>
                     <option value="none">None</option>
                   </select>
                 </div>
               </div>
               <div className="book-title">{book.title}</div>
               <div className="book-authors">{book.authors}</div>
             </div>
           </li>
         ))}
       </ol>
       </div>

   )
  }
}

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func
}


export default Bookshelf



// Apps.js

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


/// Shelf changer

import React, { Component } from 'react'

class ShelfChanger extends Component {
  render () {
    return (
      <div className="book-shelf-changer">
         <select defaultValue={this.props.book.shelf} onChange={(evt) => this.props.onShelfChange(this.props.book, evt)}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default ShelfChanger



// ShearchBook

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'
// Handling the queries and sorting by
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class SearchBook extends Component {
  constructor(props) {
       super(props)
   }

  state  = {
    query: '',
    searchedBooks: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim()})
  }

  render (){
    let searchedBooks
    if (this.state.query) {
      // If there is a query, they scape special characters
      const match = new RegExp(escapeRegExp(this.state.query), 'i')

      console.log(this.state.query)
      // Make the call to the api and populate the books with it
      BooksAPI.search(this.state.query, 20).then((searchedBooks) => {
        this.setState({ books: searchedBooks })
      })
    }

    return (
      <div className="list-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search">
            close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              className=""
              type="text"
              value={this.state.query}
              placeholder="search books"
              onClick={(event) => console.log(this.props)}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-book-search">
          <Bookshelf books={this.props.books} onShelfChange={this.props.onShelfChange} category='none'/>
        </div>
      </div>
    )
  }
}

export default SearchBook

// onClick={(evt) => console.log(this.props.book)}

  /*  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks.smallThumbnail})` }}></div>*/
  <div className="book-cover" style={{book.imageLinks ? width: 128, height: 193, backgroundImage:url('http://via.placeholder.com/128x193')}}></div>
style={{ book.imageLinks ? width: 128, height: 193, backgroundImage:`url(${book.imageLinks.smallThumbnail})` : width: 128, height: 193, backgroundImage:url('http://via.placeholder.com/128x193') }}




testsclass BooksApp extends React.Component {
  state = {
    books: [],
    newbooks: []
  }
  /*
  TO DO
  // [] Solve problem changing an existing book from the search view, creating a duplicated book
  // [] Refactor to have a Book component. Verify and operate over the book ditionary itself in the component
  // [] Add logic to show the number of books in each category
  // [] Handle the delay when updating books (changing shelfs), update local data directly instead of doing after updating with api put.then `BooksAPI.update` . if `success` do nothing, if `error` rollback the local change
  // [] Learn how to create regresive tests for each keyword in the search

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
    const shelf = evt.target.value
    BooksAPI.update(book, shelf).then(() => {
      /*
      const libros = []
      function checkIfExists(b) {
        //We use a ternary operator to check if the book exists in the array
        b.id === book.id ? (
        // If it does exists, change the shelf value and push to the array
        b.shelf = shelf,
        libros.push(b)
      ):(
        // If it does not exist, push to the array
        libros.push(b)
      )
      }
      Hasta aqui */
      // Create a new array to treat the state as stateless
      const newbooks = this.state.books.slice()
      newbooks.forEach(checkIfExists)
      this.setState({ books: libros.sort(sortBy('title'))})

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
        this.setState({ books: newbooks.sort(sortBy('title')) })

      )

    })
  }
