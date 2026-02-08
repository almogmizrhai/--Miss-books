//App Header jsx

const {link, NavLink} = ReactRouterDOM

export function AppHeader(){
    return (
        <header >
            <section className="app-header">
                <h1>Miss Books</h1>
                <nav className= "app-nav">
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/about">About Us</NavLink>
                    <NavLink to="/books">Books</NavLink>
                </nav>
            </section>
        </header>
    )
}