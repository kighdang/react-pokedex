import './App.css';
import './ReactPokedex';
import ReactPokedex from './ReactPokedex';
import PokedexBody from './PokedexBody';
import Pokedex from 'pokedex-promise-v2';
import Select from 'react-select';
import { useEffect, useState } from 'react';


const P = new Pokedex();

function App() {
  const titleCase = (input) => {
    return input.charAt(0).toUpperCase() + input.substr(1).toLowerCase();
  }


  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState();
  const [currentPokemon, setCurrentPokemon] = useState();
  var options = [];
  
  const handleChange = e => {   
    setSelectedPokemon(e.value)
  }

  const getPokemonList = () => {
    const interval = {
        limit: 151,
    }

    let list = [];
    P.getPokemonsList(interval)
        .then((response) => {
            let i = 0
            while(i < response.results.length){
                const pokemon = response.results[i]['name'];
                list.push(pokemon);
                i++;
            }

            setPokemonList(list);
        });

  }

  useEffect (() => {
    getPokemonList();
    
  }, [])

  useEffect (() => {
    if (currentPokemon != selectedPokemon){
      console.log(selectedPokemon)
      setCurrentPokemon(selectedPokemon)
    }
      
    
  }, [selectedPokemon])

  for (let pokemon of pokemonList){      
    options.push({value: pokemon, label:titleCase(pokemon)})
  }

  return (

    <div className="App">
      <header>  
        
        
        <Select 
            options={options} 
            onChange={handleChange}
        />
        <ReactPokedex selectedPokemon = {selectedPokemon}>
        </ReactPokedex>
        
      </header>
      

    </div>
  );
}

export default App;
