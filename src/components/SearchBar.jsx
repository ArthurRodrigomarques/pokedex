import React from 'react'
import { useState } from 'react'
import { searchPokemon } from '../api';

const SearchBar = () => {
    const [search, setSearch] = useState("dito")
    const [pokemon, setPokemon] = useState()
    const onChangeHandLer = (e) => {
        console.log("pokemon: ", e.target.value)
        setSearch(e.target.value)
    }


    const onButtonClickHandLer = () => {
        onSearchHandler(search)
    }
    const onSearchHandler =async (pokemon) => {
        const result = await searchPokemon(pokemon)
        setPokemon(result)
      }

  return (
    <div className='searchbar-container'>
        <div className='searchbar'>
            <input type="text" placeholder='Buscar Pokemon' onChange={onChangeHandLer}/>
        </div>
        <div className="searchbar-btn">
            <button onClick={onButtonClickHandLer}>Buscar</button>
        </div>
        {pokemon ? (
            <div>
                <div>Nome:{pokemon.name}</div>
                <div>Peso:{pokemon.weight}</div>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>
        ) : null}
    </div>
  )
};

export default SearchBar


