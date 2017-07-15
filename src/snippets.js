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
