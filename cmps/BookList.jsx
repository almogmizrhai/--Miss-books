//Book List

import { BookPreview } from "./BookPreview.jsx";

const { useState, useEffect } = React


export function BookList({books,onRemoveBook, onSelectBookId}){
  
  return(
  <ul className= "books-list" >
    {books.map(book =>
      <li key ={book.id}>
        <BookPreview book={book} />
        <section className="btn-action">
          <button onClick={ev => onRemoveBook(book.id, ev)}>Remove</button>
          <button onClick={() => onSelectBookId(book.id)} >Details</button>
        </section>
      </li>  
    )}
  </ul>
  )
}