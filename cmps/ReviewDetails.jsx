// Review Details jsx

const { useParams } = ReactRouterDOM

export function ReviewDetails({review, removeReview}){
    const {bookId} = useParams()

    return(
        <section className="review-details">
            <h3>Name: {review.fullName} </h3>
            <p>Rating: {review.rating} </p>
            <p>Read At: {review.readAt} </p>
            <p>{review.txt}</p>
            <button onClick={() => removeReview(bookId, review.id )} >Remove</button>
        </section>
    )
}