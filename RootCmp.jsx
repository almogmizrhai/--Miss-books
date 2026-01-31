//root-cmp

const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { Home } from './Pages/Home.jsx'
import { AboutUs } from './Pages/AboutUs.jsx'
import { BookIndex } from './Pages/BookIndex.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { BookDetails } from './cmps/BookDetails.jsx'
import { NotFound } from './cmps/NotFound.jsx'



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

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </section>
       </Router> 
    )
}