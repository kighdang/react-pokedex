import { useState } from 'react';
import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();

function PokedexBody(params) {
    const pokemonSpeciesUrl = params.pokemonSpeciesUrl
    console.log(pokemonSpeciesUrl)

    const [flavorText, setFlavorText] = useState("");

    fetch(pokemonSpeciesUrl)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setFlavorText(data.flavor_text_entries[0]['flavor_text'].replace("\n", " ").replace("", " "))
        });

    return (
        <div className='pokedex-body'>
          <p>
            {flavorText}
         </p>
        </div>
        
        
    );

}
 
export default PokedexBody;