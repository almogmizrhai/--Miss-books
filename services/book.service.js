//Book Service

import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    getPrevBookId,
    getDefaultFilter,
    getEmptyReview,
    addReview,
    removeReview,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regex.test(book.title))
            }

            if (filterBy.minPrice) {
                books = books.filter(book =>
                    book.listPrice.amount >= filterBy.minPrice
                )
            }
            return books
        })
        .catch(err => console.log('err:', err))
}

function getEmptyReview(){
    return {
        id: utilService.makeId(),
        fullName: '',
        rating: 0,
        readAt: new Date().toISOString().slice(0, 10),
        txt: '',
        selected: 0,
    }
}

function addReview(bookId, review) {
    return get(bookId).then(book => {
        if (!book.reviews) book.reviews = []

        review.id = utilService.makeId()
        book.reviews.push(review)

        return save(book)
    })
}

function removeReview(bookId, reviewId) {
    return get(bookId).then(book => {
        const newReviews = book.reviews.filter((review) => review.id !== reviewId)
        book.reviews = newReviews
        return save(book)
    })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', listPrice = {amount: 0, currencyCode: 'EUR', isOnSale: false}) {
    return { id: '',title, listPrice }
}

function getDefaultFilter() {
    return {txt: '',minPrice: 0 }
}


function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            let nextBookIdx = books.findIndex(book => book.id === bookId) + 1
            if (nextBookIdx === books.length) nextBookIdx = 0
            return books[nextBookIdx].id
        })
}

function getPrevBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            let prevBookIdx = books.findIndex(book => book.id === bookId) - 1
            if (prevBookIdx < 0) prevBookIdx = books.length - 1
            return books[prevBookIdx].id
        })
}


// ~~~~~~~~~~~~~~~~LOCAL FUNCTIONS~~~~~~~~~~~~~~~~~~~

function _createReview(reviewToSave) {
    return {
        id: utilService.makeId(),
        ...reviewToSave,
    }
}

function _createBooks() {
     let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [] 
        const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion'] 
        for (let i = 0; i < 20; i++) { 
            const book = { 
                id: utilService.makeId(), 
                title: utilService.makeLorem(2), 
                subtitle: utilService.makeLorem(4), 
                authors: [ 
                    utilService.makeLorem(1) 
                ], 
                publishedDate: utilService.getRandomIntInclusive(1950, 2024), 
                description: utilService.makeLorem(20), 
                pageCount: utilService.getRandomIntInclusive(20, 600), 
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]], 
                thumbnail: `http://coding-academy.org/books-photos/${i+1}.jpg`, 
                language: "en", 
                listPrice: { 
                    amount: utilService.getRandomIntInclusive(80, 500), 
                    currencyCode: "EUR", 
                    isOnSale: Math.random() > 0.7 
                } ,
                reviews: [],
            } 
            books.push(book) 
        } 
    }
    // console.log('books', books) 
    utilService.saveToStorage(BOOK_KEY, books)
}

// function _createBooks() {
//     let books = utilService.loadFromStorage(BOOK_KEY)
//     if (!books || !books.length) {
//         books = []
//         books.push(_createBook( 'Harry Potter', {amount: 120, currencyCode: 'ILS',isOnSale: false}))
//         books.push(_createBook( 'Debugging Life', {amount: 109, currencyCode: 'ILS',isOnSale: true}))
//         books.push(_createBook( 'JavaScript Secrets', {amount: 129, currencyCode: 'ILS',isOnSale: false}))

//         utilService.saveToStorage(BOOK_KEY, books)
//     }
// }

// function _createBook(title, listPrice) {
//     const book = getEmptyBook(title, listPrice)
//     book.id = utilService.makeId()
//     return book
// }