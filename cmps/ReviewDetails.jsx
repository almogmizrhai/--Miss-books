// Review Details jsx

export function ReviewDetails({review}){
    return(
        <section className="review-details">
            <h3>Name: {review.fullName} </h3>
            <p>Rating: {review.rating} </p>
            <p>Read At: {review.readAt} </p>
            <p>{review.txt}</p>
        </section>
    )
}