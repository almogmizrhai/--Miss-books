//Book Edit jsx

import { bookService } from "../services/book.service.js"
console.log('bookService:', bookService)

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
    
    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        
        if (target.type === 'number') {
            value = +value
        }
        
        setBookToEdit(prevBook => ({...prevBook, [field]: value}))
    }


    function onSaveBook(ev){
        ev.preventDefault()
        bookService.save(bookToEdit)
        .then(() => navigate('/books'))
        .catch(err => {
            console.log('err:', err)
            navigate('/books')
            // showErrorMsg('Can not save the book')
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
                <input name="amount" type="number" value={listPrice.amount}
                onChange={(ev) => {
                    const value = +ev.target.value
                    setBookToEdit(prev => ({
                        ...prev,
                        listPrice: {
                            ...prev.listPrice,
                            amount: value
                        }
                    }))
                }} />
                
                <button disabled={!title}>Save</button>
            </form>
        </section>
    )
}