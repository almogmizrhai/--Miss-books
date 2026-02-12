//Book Details jsx

import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { AddReview } from "../cmps/AddReview.jsx"


const { useState, useEffect } = React
const { useParams, useNavigate,Link } = ReactRouterDOM

export function BookDetails(){
    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBooks()
    },[params.bookId])

    function loadBooks(){
        bookService.get(params.bookId)
            .then(book => setBook(book))
            .catch(err =>{
                console.log('err:', err)
                navigate('/book')
            } )
    }

    function onBack() {
        navigate('/books')
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

    if (!book) return <div className="loader">Loading...</div>

    const {title, listPrice, pageCount, publishedDate, description} = book
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
            <p>description:  {description} </p>
            <button> <Link to={`/book/${book.id}/review`}>Add Review</Link></button> 
            <button onClick={onBack}>Back</button>

            <section>
                <button><Link to={`/book/${book.prevBookId}`}>Prev</Link></button>
                <button><Link to={`/book/${book.nextBookId}`}>Next</Link></button>
            </section>

        </section>
    )
}