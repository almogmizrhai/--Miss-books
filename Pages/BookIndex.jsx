//Book Index jsx

import { BookDetails } from "./BookDetails.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import {bookService} from "../services/book.service.js"
import { animateCSS } from "../services/util.service.js"



const { useState, useEffect, Fragment } = React

export function BookIndex(){
    const [books, setBooks] = useState(null)
    const [selectBookId, setSelectBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    },[filterBy])

    function loadBooks(){
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => console.log('err:', err))
    }

    if (!books) return <div className="loader">Loading...</div>

    function onRemoveBook(bookId, {target}){
        const elLi = target.closest('li')

        bookService.remove(bookId)
            // .then(() => animateCSS(elLi, 'fadeOut'))
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => console.log('err:', err))
    }

    function onSelectBookId(bookId){
        setSelectBookId(bookId)
    }

    function onSetFilterBy(newFilterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilterBy }))
    }

    return(
        <section className = "book-index">
            {selectBookId
                ? <BookDetails onBack={()=> setSelectBookId(null)} bookId={selectBookId} />
                : <Fragment>
                    <BookFilter onSetFilterBy={onSetFilterBy} defaultFilter={filterBy}/>
                    <BookList 
                        books = {books}
                        onRemoveBook ={onRemoveBook} 
                        onSelectBookId ={onSelectBookId}
                />
            </Fragment>
            }
        </section>
    )
}