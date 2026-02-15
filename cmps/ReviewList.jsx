//Review List jsx

import { ReviewDetails } from "./ReviewDetails.jsx";


export function ReviewList({reviews = [], removeReview}){
    return(
        <ul className="review-list">
            {reviews.map(review =>
                <li key={review.id}>
                    <ReviewDetails review={review} removeReview={removeReview} />
                </li>
            )}
        </ul>
    )
}