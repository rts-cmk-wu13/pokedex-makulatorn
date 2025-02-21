/**
 * Extract id as string from url to pokemon
 * @param {string} pokemonUrl - a url to a pokemon from pokeApi 
 * @returns {string}
 */
function getIdFromPokemon(pokemonUrl) {
    return pokemonUrl.slice(0, -1).split("/").pop()
}

const artworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork"

// Create section element for the list of Pokémon
let sectionElm = document.createElement("section")
sectionElm.className = "pokelist"

// Fetch Pokémon data from the PokeAPI
fetch("https://pokeapi.co/api/v2/pokemon?limit=20")  // You can adjust the limit here to load more or fewer Pokémon
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        sectionElm.innerHTML = data.results.map(pokemon => `
            <article>
                <h2>${pokemon.name}</h2>
                <img src="${artworkUrl}/${getIdFromPokemon(pokemon.url)}.png" alt="${pokemon.name}">
            </article>
        `).join("");
    });

// Append the section element to the main element
document.querySelector("main").append(sectionElm);
