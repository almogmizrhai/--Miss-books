//Book Edit jsx

import { UserMsg } from "../cmps/UserMsg.jsx"
import { bookService } from "../services/book.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"


const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React


export function BookEdit(){

    const[bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const[isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const {bookId} = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [bookId])

    function loadBook(){
        setIsLoading(true)
        bookService.get(bookId)
            .then(book => {
                setBookToEdit(book)
                console.log('book to edit:',book)
            })
            .catch(err => {
                console.log('err:', err)
                navigate('/books')
            })
            .finally(() => setIsLoading(false))
    }

    function onBack() {
        navigate('/books')
    }
    
    function handleChange({ target }) {
        const { name, value, type, checked } = target
        
        switch (name) {
            case 'price':
                setBookToEdit(prev => ({
                    ...prev,
                    listPrice: {
                        ...prev.listPrice,
                        amount: +value
                    }
                }))
            break;
            
            case 'isOnSale':
                setBookToEdit(prev => ({
                    ...prev,
                    listPrice: {
                        ...prev.listPrice,
                        isOnSale: checked
                    }
                }))
            break;
            
            default:
                setBookToEdit(prev => ({
                    ...prev,
                    [name]: type === 'number' ? +value : value
                }))
        }
    }

    function onSaveBook(ev){
        ev.preventDefault()
        bookService.save(bookToEdit)
        .then(() => navigate('/books'))
        .catch(err => {
            console.log('err:', err)
            navigate('/books')
            showErrorMsg('Can not save the book')
        })
    }

    const loadingClass = isLoading ? 'loading' : ''
    const { title, listPrice } = bookToEdit

    return(
        <section className="book-edit">
            <h1>{bookId ? 'Edit' : 'Add'} Book </h1>
            <form className={loadingClass} onSubmit={onSaveBook}>
                <label htmlFor="title">Book Name</label>
                <input value ={title} onChange={handleChange} type="text" name="title" id="title" />

                <label htmlFor="amount">Price</label>
                <input value={bookToEdit.listPrice.amount} onChange= {handleChange} name="listPrice.amount" type="number"  />

                <label>
                    <input type="checkbox" name="isOnSale" checked={bookToEdit.listPrice.isOnSale} onChange={handleChange} />
                    On Sale
                </label>

                <button onClick={onBack}>Back</button>
                <button disabled={!title}>Save</button>
            </form>
        </section>
    )
}