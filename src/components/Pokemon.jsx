import React from 'react'
import { useContext } from 'react'
import FavoriteContext from '../contexts/FavoriteContext'
const Pokemon = (props) => {
  const {favoritePokemons, updateFavoritePokemons}= useContext(FavoriteContext)
    const {pokemon} = props
    const onHeartClick = () => {
      updateFavoritePokemons(pokemon.name)
    }
    const heart =favoritePokemons.includes(pokemon.name) ? "❤️" : "🖤";

    const backgroundColor = () => {
      switch (pokemon.types[0].type.name) {
        case "fire":
          return "red";
        case "water":
          return "rgb(47, 112, 211)";
        case "grass":
          return "green";
        case "electric":
          return "yellow";
        case "bug":
          return "rgb(47, 211, 88)";
        case "poison":
          return "rgb(164, 47, 211)"
        case "ground":
          return "rgb(165, 51, 51)";
        case "fairy":
          return "pink"
        case "fighting":
          return "#a04e38"
        case "psychic":
          return "#571454"
        case "ghost":
          return "#571454"
        case "rock":
          return "#98865e"
        case "ice":
          return "#cef3f4"
        case "dragon":
          return "#5b7cb3"
        case "dark":
          return "#5c5e63"
        case "steel":
          return "#acb2c0"
        case "flying":
          return "#6f9cdd"
        default:
          return "gray";
      }
    };
    
  return (
    <div style={{ backgroundColor: backgroundColor(), padding: "10px" }}  className='pokemon-card'>
      <div className='pokemon-image-container'>
        <img className='pokemon-image' src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
      <div className='card-body'>
          <div className="card-top">
            <h3>{pokemon.name}</h3>
            <div>#{pokemon.id}</div>
          </div>
          <div className="card-botton">
          <div className="pokemon-type">
            {pokemon.types.map((type, index) =>{
              return (
                <div key={index} className="pokemon-type-text">{type.type.name}</div>
              )
            })}
          </div>
          <button className='pokemon-heart-btn' onClick={onHeartClick}>{heart}</button>
          </div>
      </div>
    </div>
  )
}

export default Pokemon


// buscar o tipo
// falar para o tipo qual background ele deve entrar
// botar o background