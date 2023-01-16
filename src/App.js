import { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import Pokedex from './components/Pokedex';
import { getPokemon, getPokemonData } from './api';
import { FavoriteProvider } from './contexts/FavoriteContext';


function App() {

 const [page, setPage] = useState(0)
 const [totalPages, setTotalPages] = useState(0)
 const [loading, setLoading] = useState(false)
 const [pokemons, setPokemons] = useState([])
 const [favorites, setFavorites] = useState([])

const itensPerPage = 25
const fetchPokemons = async() => {
  try {
       setLoading(true)
       const data = await getPokemon(itensPerPage, itensPerPage * page)
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url)
      })

      const results =await Promise.all(promises)
       setPokemons(results);
       setLoading(false)
       setTotalPages(Math.ceil(data.count / itensPerPage))
  } catch (error) {
    console.log("fetchPokemons error", error)
  }
 
}
useEffect(() => {
  fetchPokemons()
}, [page])

const updateFavoritePokemons = (name) => {
  const updateFavorites = [...favorites]
  const favoriteIndex = favorites.indexOf(name)
  if(favoriteIndex >= 0) {
    updateFavorites.slice(favoriteIndex,1)
  } else {
    updateFavorites.push(name)
  }
  setFavorites(updateFavorites)
}

  return (
    <FavoriteProvider
    value={{
      favoritePokemons: favorites,
      updateFavoritePokemons: updateFavoritePokemons,
    }}
  >

    <div>
      <NavBar />
      <SearchBar />
      <Pokedex 
        pokemons={pokemons} 
        loading={loading} 
        page={page} 
        totalPages={totalPages} 
        setPage={setPage} 
      /> 
      </div>
     </FavoriteProvider>
   
  );
}

export default App;




