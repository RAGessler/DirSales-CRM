import React, {useState} from 'react'


const InteractionFilter = (props) => {
    const [searchTerm, setSearchTerm] = useState('')
    function handleSearch(event){
        event.preventDefault();
        let newSearchTerm = searchTerm
        console.log(newSearchTerm)
        props.submitSearch(newSearchTerm)
    }

    return(
        <div>
            <h5>Filter</h5>
            <form className='search-bar' onSubmit={handleSearch}>
                <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}/>
                <button type='submit'>Search</button>
            </form>
        </div>
    )
}
export default InteractionFilter