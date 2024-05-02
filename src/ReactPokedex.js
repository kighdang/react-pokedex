import logo from './logo.svg';
import { useState, useEffect } from 'react';
import Pokedex from 'pokedex-promise-v2';
import PokedexBody from './PokedexBody';
import Select from 'react-select';

const P = new Pokedex();


function ReactPokedex(props) {
    const [pokemonName, setPokemonName] = useState('Pokemon Name')
    const [pokemonImage , setPokemonImage] = useState(logo)
    const [pokemonNumber, setPokemonNumber] = useState('No. 000')
    const [pokemonType, setPokemonType] = useState('Pokemon Type')
    const [pokemonHeight, setPokemonHeight] = useState('Pokemon Height')
    const [pokemonWeight, setPokemonWeight] = useState('Pokemon Weight')
    const [pokemonSpeciesUrl, setPokemonSpeciesUrl] = useState("")
    const [isEmpty, setIsEmpty] = useState(true)
    let selectedPokemon =  props.selectedPokemon
    const [currentPokemon, setCurrentPokemon] = useState()
    
    console.log(selectedPokemon)
   

    const titleCase = (input) => {
        return input.charAt(0).toUpperCase() + input.substr(1).toLowerCase();
    }

    
    
    const updateWithSearchTerm = (selectedPokemon) => {    
        console.log(selectedPokemon)
        if (selectedPokemon){
            P.getPokemonByName(selectedPokemon)
            .then((response) => {
            
                setPokemonImage(response.sprites.front_default)
                setPokemonNumber("#"+String(response.id).padStart(3,"0"))
                setPokemonName(titleCase(response.name))
                setPokemonType(titleCase(response.types[0].type.name))
                setPokemonHeight(response.height/10 +" m")
                setPokemonWeight(response.weight/10 + " kg")
                
                setPokemonSpeciesUrl(response.species.url)
                console.log(response.species.url)
                setIsEmpty(false)
            })
            .catch((error) => {
            console.log('There was an ERROR: ', error);
            });
        }
        
    }
    
    useEffect (() => {
        console.log(currentPokemon)
        if (currentPokemon != selectedPokemon) {
            updateWithSearchTerm(selectedPokemon)
            setCurrentPokemon(selectedPokemon)
        }
        

    }, [selectedPokemon]);
    

    

    
    


    return (
        <>
        
        <div className="pokedex">
            <div className='pokedex-header-column'>
                <img src={pokemonImage}/>  
                <p className='pokemon-number'>{pokemonNumber}</p>
            </div>
            
            <div className='pokedex-header-column'>
            <p>{pokemonName}</p>
            <p>{pokemonType}</p>
            <p>{pokemonHeight}</p>
            <p>{pokemonWeight}</p>
            </div>
            
        </div>
        {!isEmpty && <PokedexBody pokemonSpeciesUrl = {pokemonSpeciesUrl}></PokedexBody>}
        </>
        
    );

}
 
export default ReactPokedex;