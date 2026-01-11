
import {bookService} from "../services/book.service.js"
import { animateCSS } from "../services/util.service.js"

window.bookService = bookService

export function BookIndex(){
    return(
        <section className = "book-index">
            <h1>The app</h1>
        </section>
    )
}