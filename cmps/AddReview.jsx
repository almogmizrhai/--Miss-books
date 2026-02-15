//Add Review cmp

import { UserMsg } from "../cmps/UserMsg.jsx"
import { bookService } from "../services/book.service.js"
import { StarRating } from "./StarRating.jsx"

const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect  } = React

export function AddReview(){

    const [review, setReview] = useState(bookService.getEmptyReview())

    const navigate = useNavigate()
    const {bookId} = useParams()

    function handleChange({ target }) {
        const { name, value } = target
        
        setReview(prevReview => ({
            ...prevReview,
            [name]: name === 'rating' ? +value : value
        }))
    }

    function onBack() {
        navigate(`/book/${bookId}`)
    }

    function onSaveReview(ev){
        ev.preventDefault()        
        bookService.addReview(bookId, review)
            .then(()=>{
                navigate(`/book/${bookId}`)
            })
    }

    const { fullName, readAt, txt, rating } = review
    return(
        <section className="review-add">
            <h1>Add Review: </h1>
            <form onSubmit={onSaveReview} className="review-form"> 
                <label htmlFor="fullName">Full Name</label>
                <input value ={fullName} onChange={handleChange} type="text" name="fullName" id="fullName" placeholder="Full Name" />

                <label htmlFor="rating">Rating </label>
                <select name="rating"  value ={rating} onChange={handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <label htmlFor="readAt">Read At</label>
                <input value ={readAt} onChange={handleChange} type="date" name="readAt" id="readAt" />

                <label htmlFor="txt">Book Review</label>
                <textarea value ={txt} onChange={handleChange}  name="txt" id="txt" placeholder="Book Review" />
                
                <div className="btn-action">
                    <button className="btn" type="button" onClick={onBack}>Back</button>
                    <button disabled={!fullName && !rating && !txt} className="btn">Save</button>
                </div>
            </form>
        </section>
    )
}