//root-cmp

const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { Home } from './Pages/Home.jsx'
import { AboutUs } from './Pages/AboutUs.jsx'
import { BookIndex } from './Pages/BookIndex.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { BookDetails } from './cmps/BookDetails.jsx'
import { BookEdit } from './Pages/BookEdit.jsx'
import { NotFound } from './cmps/NotFound.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'




export function App() {

    return (
       <Router>
        <section className="app">
            <AppHeader />
            <main className="container">
                <Routes>
                    <Route path="/" element={<Navigate to="/home"/>} />
                    <Route path="/home" element={<Home/>} />
                    <Route path="/about" element={<AboutUs/>} />
                    <Route path="/books" element={<BookIndex/>} />
                    <Route path="/book/:bookId" element={<BookDetails />} />
                    <Route path="/book/edit/:bookId" element={<BookEdit />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <UserMsg />
        </section>
       </Router> 
    )
}