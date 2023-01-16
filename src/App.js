import { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import Pokedex from './components/Pokedex';
import { getPokemon, getPokemonData, searchPokemon } from './api';
import { FavoriteProvider } from './contexts/FavoriteContext';

const favoritesKey = "f"
function App() {

 const [page, setPage] = useState(0)
 const [totalPages, setTotalPages] = useState(0)
 const [loading, setLoading] = useState(false)
 const [pokemons, setPokemons] = useState([])
 const [favorites, setFavorites] = useState([])
 const [notFound, setNotFound] = useState(false)

const itensPerPage = 27
const fetchPokemons = async() => {
  try {
       setLoading(true)
       setNotFound(false)
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
const loadFavoritePokemons = () => {
 const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || []
 setFavorites(pokemons)
}
useEffect(() => {
  loadFavoritePokemons()
}, [])

useEffect(() => {
  fetchPokemons()
}, [page])



const updateFavoritePokemons = (name) => {
  const updateFavorites = [...favorites]
  const favoriteIndex = favorites.indexOf(name)
  if(favoriteIndex >= 0) {
    updateFavorites.splice(favoriteIndex,1)
  } else {
    updateFavorites.push(name)
  }
  window.localStorage.setItem(favoriteIndex, JSON.stringify(updateFavorites))
  setFavorites(updateFavorites)
}
  const onSearchHandler =async (pokemon) => {
      if(!pokemon) {
       return fetchPokemons();
      }

      setLoading(true)
      setNotFound(false)
      const result = await searchPokemon(pokemon)
      if(!result) {
        setLoading(false)
        setNotFound(true)
      } else {
        setPokemons([result])
        setPage(0)
        setTotalPages(1)
      }
      setLoading(false)
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
      <SearchBar onSearch={onSearchHandler}/>
      {notFound ? (
      <div className='not-found-text'>Coé escreve direito aí!!</div>
      ) : 
      (<Pokedex 
        pokemons={pokemons} 
        loading={loading} 
        page={page} 
        totalPages={totalPages} 
        setPage={setPage} 
      />)}
      </div>
     </FavoriteProvider>
   
  );
}

export default App;




