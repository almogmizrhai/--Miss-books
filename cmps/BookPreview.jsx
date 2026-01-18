//Book Preview

export function BookPreview ({book }){

    const {title, listPrice, thumbnail} = book

    return(
        <section className = "book-prev">
            <h3>Book Title: <p>{title}</p></h3> 
            <h3>Book Price: <p>{listPrice.amount}</p></h3> 
            <img src={thumbnail} alt="Book Image" />
        </section>
    )

}
