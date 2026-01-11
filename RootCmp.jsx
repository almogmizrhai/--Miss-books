  const { useState } = React

import { Home } from './Pages/Home.jsx'
import { AboutUs } from './Pages/AboutUs.jsx'
import { BookIndex } from './Pages/BookIndex.jsx'


export function App() {
    const [page , setPage] = useState('home')

    return (
        <section className="app">
            <header className="app-header">
                
                <h1>Miss Books</h1>
                <nav className= "app-nav">
                    <a onClick ={() => setPage('home')}>Home</a>
                    <a onClick ={() => setPage('about')}>About Us</a>
                    <a onClick ={() => setPage('books')}>Books</a>
                </nav>
            
            </header>
            <main className="container">
                {page ==='home' && <Home />}
                {page ==='about' && <AboutUs />}
                {page ==='books' && <BookIndex />}
            </main>
        </section>
    )
}