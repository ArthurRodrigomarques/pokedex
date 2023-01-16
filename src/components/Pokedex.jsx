import React from 'react'
import Pagination from './Pagination';
import Pokemon from './Pokemon';


const Pokedex = (props) => {
    const {pokemons, loading, page, setPage ,totalPages, onLeftClick, onRightClick } = props;
    const onLeftClickHandle = () => {
      if(page > 0) {
        setPage(page - 1)
      }
    }
    const onRightClickHandle = () => {
      if (page+1 !== totalPages) {
        setPage(page + 1)
      }
    }
  return (
    <div>
        <div className='pokedex-header'>
            <h1>Pokedex</h1> 
            <Pagination 
            page={page+1}
            totalPages={totalPages}
            onLeftClick={onLeftClickHandle}
            onRightClick={onRightClickHandle}
            />
        </div>
        {loading ? (
        <div>Carregando, segura a fera...</div>
        ) : (
            <div className="pokedex-grid">
            {pokemons && pokemons.map((pokemon, index) => {
              return (
                <Pokemon key={index}  pokemon={pokemon}/>
              );
            })}
        </div>
        )}
    </div>
  )
}

export default Pokedex