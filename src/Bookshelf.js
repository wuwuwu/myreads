import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ShelfChanger from './ShelfChanger'

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
                 <ShelfChanger book={book} onShelfChange={this.props.onShelfChange}/>
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
