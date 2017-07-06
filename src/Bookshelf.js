import React, {Component} from 'react'

class Bookshelf extends Component {
 render () {
   return(
     <div className="bookshelf">
       <h2 className="bookshelf-title">{this.props.bookshelf_title}</h2>
       <div className="bookshelf-books">
         <ol className="books-grid">
           {this.props.books.filter(book => book.shelf === this.props.category).map(book => (
             <li key={book.id}>
               <div className="book">
                 <div className="book-top">
                 {/* Remember back-ticks (` `) in the "style" attribute's value. Recall that these template literals allow for embedded expressions */  }
                   <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
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
   )
  }
}

export default Bookshelf
