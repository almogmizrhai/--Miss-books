//Book Preview

export function BookPreview ({book }){

    const {title, listPrice} = book

    return(
        <section className = "book-prev">
            <h3>Book Title: </h3> 
                <p>{title}</p>
            <h3>Book Price: </h3> 
                <p>{listPrice.amount}</p>
        </section>
    )

}
