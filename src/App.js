import { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import Pokedex from './components/Pokedex';
import { getPokemon, getPokemonData } from './api';




function App() {


 const [loading, setLoading] = useState(false)
 const [pokemons, setPokemons] = useState([])

const fetchPokemons = async() => {
  try {
       setLoading(true)
       const data = await getPokemon()
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url)
      })

      const results =await Promise.all(promises)
       setPokemons(results);
       setLoading(false)
  } catch (error) {
    console.log("fetchPokemons error", error)
  }
 
}
useEffect(() => {
  console.log("carregou")
  fetchPokemons()
}, [])



  return (
    <div>
      <NavBar />
      <SearchBar />
      <Pokedex pokemons={pokemons.results} loading={loading}/>
    </div>
  );
}

export default App;





// 1:31:00     Pokedex com API, React hooks, useState, useContext, localStorage
// pasquadev
