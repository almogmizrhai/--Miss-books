//Add Review cmp

import { UserMsg } from "../cmps/UserMsg.jsx"
import { bookService } from "../services/book.service.js"

const { useNavigate, useParams } = ReactRouterDOM
const { useState } = React

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

    function onSave(){
        console.log('review:', review)
    }

    const { fullName, readAt, txt, rating } = review
    return(
        <section className="review-add">
            <h1>Add Review: </h1>
            <form>
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
                <textarea value ={txt} onChange={handleChange} type="text" name="txt" id="txt" placeholder="Book Review" />
            </form>

            <div className="bnt-action">
                <button onClick={onBack}>Back</button>
                <button disabled={!fullName} onClick={onSave}>Save</button>
            </div>
        </section>
    )
}