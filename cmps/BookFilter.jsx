//Book Filter

const { useState, useEffect } = React

export function BookFilter({ defaultFilter, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter)

    useEffect(() => {
        setFilterByToEdit(defaultFilter)
    }, [defaultFilter])

    function handleChange({ target }) {
        let field = target.name
        let value = target.value

        if (target.type === 'number') {
            if (value === '') {
                value = ''
            } else {
                value = Number(value)
            }

        }

        setFilterByToEdit(prevFilter => ({
            ...prevFilter,
            [field]: value
        }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt, minPrice } = filterByToEdit

    return (
        <section className="books-filter">
            <form onSubmit={onSubmitFilter}>

                <label htmlFor="txt">Search by title:</label>
                <input onChange={handleChange} value={txt} name="txt" id="txt" type="text" placeholder="Book title"/>

                <label htmlFor="minPrice">Search by price:</label>
                <input onChange={handleChange} value={minPrice || ''} name="minPrice" id="minPrice" type="number"placeholder="Book price" />

                <button>Filter</button>
            </form>
        </section>
    )
}
