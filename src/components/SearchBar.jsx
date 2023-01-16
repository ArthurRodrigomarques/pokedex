import React from 'react'
import { useState } from 'react'
import { searchPokemon } from '../api';

const SearchBar = (props) => {
    const [search, setSearch] = useState("dito")
    const {onSearch} = props
    const onChangeHandLer = (e) => {
        console.log("pokemon: ", e.target.value)
        setSearch(e.target.value)
        if(e.target.value.length === 0) {
            onSearch(undefined)
        }
    }


    const onButtonClickHandLer = () => {
        onSearch(search)
    }


  return (
    <div className='searchbar-container'>
        <div className='searchbar'>
            <input type="text" placeholder='Buscar Pokemon' onChange={onChangeHandLer}/>
        </div>
        <div className="searchbar-btn">
            <button onClick={onButtonClickHandLer}>Buscar</button>
        </div>

    </div>
  )
};

export default SearchBar


