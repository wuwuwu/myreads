import React, { Component } from 'react'
import ShelfChanger from './ShelfChanger'

class Bookshelf extends Component {
  render () {
   return(

     <div className="bookshelf-books">
       <ol className="books-grid">
         {this.props.booksToDisplay.filter(book => book.shelf === this.props.category).map(book => (
           <li key={book.id}>
             <div className="book">
               <div className="book-top">
                 <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                 <ShelfChanger book={book} books={this.props.books} onShelfChange={this.props.onShelfChange}/>
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

export default Bookshelf
