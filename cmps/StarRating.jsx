//Star Rating jsx

export function StarRating({ rating = 0, handleChange }) {

    const isEditable = typeof handleChange === 'function'
    const editClass = isEditable ? 'edit' : ''

    function onSetRating(rate) {
        if (!isEditable) return

        handleChange({
            target: {
                name: 'rating',
                value: rate
            }
        })
    }

    return (
        <div className={`star-rating ${editClass}`}>
            {[...Array(5)].map((_, idx) => {
                const starValue = idx + 1
                return (
                    <span
                        key={idx}
                        className={`star ${starValue <= rating ? 'on' : 'off'}`}
                        onClick={() => onSetRating(starValue)}
                    >
                        &#9733;
                    </span>
                )
            })}
        </div>
    )
}
