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

    function checkPageCount(pageCount){
        let txt = ''
        if (pageCount >=500) txt = 'Serious Reading'
        else if (pageCount >=200) txt = 'Descent Reading'
        else if (pageCount <=100) txt = 'Light Reading'

        return txt
    }

    function checkPublishedDate(publishedDate){
        const currentDate = new Date()
        const published = new Date(publishedDate)
        const diffTime = currentDate - published
        const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365)
        let txt = ''

        if(diffYears > 10) txt = 'Vintage Book'
        else if (diffYears < 1) txt = 'New Book'

        return txt
    }

    function checkPrice(price){
        let priceTag = ''
        if (price >= 150) priceTag ='highPrice'
        else if(price <= 20) priceTag = 'lowPrice'

        return priceTag
    }

    if (!book) return <div>Loading...</div>
    const {title, listPrice, pageCount, publishedDate  } = book
    return(
        <section className = "book-details">
            <h1>Book Title: {title}</h1>
            <h2>Book Price: <span className={checkPrice(listPrice.amount)}> {listPrice.amount}</span> </h2>
            {listPrice.amount && (
                <span className="on-sale">🔥 On Sale! 🔥</span>
            )}
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolorum aliquam quibusdam corrupti? Minus, ad tenetur!
            </p>
            <p> Page Count: {pageCount} - {checkPageCount(pageCount)} </p>
            <p> Published Date: {publishedDate} {checkPublishedDate(publishedDate)} </p>
            <button onClick={onBack}>Back</button>
        </section>
    )
}