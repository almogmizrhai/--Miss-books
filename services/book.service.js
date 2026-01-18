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
    getDefaultFilter,
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

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        books.push(_createBook( 'Harry Potter', {amount: 120, currencyCode: 'ILS',isOnSale: false}))
        books.push(_createBook( 'Debugging Life', {amount: 109, currencyCode: 'ILS',isOnSale: true}))
        books.push(_createBook( 'JavaScript Secrets', {amount: 129, currencyCode: 'ILS',isOnSale: false}))

        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, listPrice) {
    const book = getEmptyBook(title, listPrice)
    book.id = utilService.makeId()
    return book
}