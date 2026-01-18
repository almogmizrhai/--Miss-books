//Book Details

import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({bookId, onBack}){
    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBooks()
    },[])

    function loadBooks(){
        bookService.get(bookId)
            .then(book => setBook(book))
            .catch(err => console.log('err:', err))
    }

    
    if (!book) return <div>Loading...</div>
    const {title, listPrice} = book
    return(
        <section className = "book-details">
            <h1>Book Title: {title}</h1>
            <h2>Book Price: {listPrice.amount}</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolorum aliquam quibusdam corrupti? Minus, ad tenetur!
            </p>
            <button onClick={onBack}>Back</button>
        </section>
    )
}