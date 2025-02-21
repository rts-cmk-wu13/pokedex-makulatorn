/**
 * @param {string} pokemonUrl
 * @returns {string}
 */
function getIdFromPokemon(pokemonUrl) {
    return pokemonUrl.slice(0, -1).split("/").pop()
}

const artworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork"

let sectionElm = document.createElement("section")
sectionElm.className = "pokelist"

fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        sectionElm.innerHTML = data.results.map(pokemon => {
            const pokemonId = getIdFromPokemon(pokemon.url);
            return `
                <article>
                <a href="detail.html?name=${pokemon.name}">
                    <h2>
                    </h2>
                    <img src="${artworkUrl}/${pokemonId}.png" alt="${pokemon.name}">
                    ${pokemon.name}</a>
                </article>
            `;
        }).join("");
    });


// Append the section element to the main element
document.querySelector("main").append(sectionElm);
