/**
 * @param {string} pokemonUrl
 * @returns {string}
 */
function getIdFromPokemon(pokemonUrl) {
    return pokemonUrl.slice(0, -1).split("/").pop();
}

const artworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

let sectionElm = document.createElement("section");
sectionElm.className = "pokelist";let allpokemon = [];

const fetchPokemon = () => {

    //showLoader(true);

    const promises = [];

    for (let i = 1; i <= 48; i++) {

        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(promises).then((results) => {

        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites.other['official-artwork'].front_default,
            type: result.types.map((type) => type.type.name),
            id: result.id
        })).sort((a, b) => a.id > b.id ? 1 : -1);

        populateArray(pokemon);

        //showLoader(false);

        appendToMain(pokemon);
    });
};

function populateArray(pokeArray) {
    pokeArray.forEach((pokemon) => {
        allpokemon.push(pokemon);
    });
    console.log(allpokemon);
}

function appendToMain(pokeArray) {
    let sectionElm = document.createElement("section");
    sectionElm.className = "pokelist";

    sectionElm.innerHTML = pokeArray.map(pokemon => {
        const formattedId = `#${String(pokemon.id).padStart(3, '0')}`; // Add the formatted ID here
        return `
            <article class="pokecard">
                <a class="pokecard-name" href="detail.html?name=${pokemon.name}" style="font-size:80%;">
                    <p class="pokecard-id">${formattedId}</p>
                    <img src="${pokemon.image}" alt="Official artwork of ${pokemon.name}">
                    ${pokemon.name}
                </a>
            </article>
        `;
    }).join("");

    document.querySelector("main").append(sectionElm);
};

function getCSScolor(varName) {
    const root = document.documentElement;
    const currentColor = getComputedStyle(root).getPropertyValue(varName);
    return currentColor;
}
 

fetchPokemon();


fetch("https://pokeapi.co/api/v2/pokemon?limit=21")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        sectionElm.innerHTML = data.results.map(pokemon => {
            const pokemonId = getIdFromPokemon(pokemon.url);
            const formattedId = `#${String(pokemonId).padStart(3, '0')}`; // Add the formatted ID here
            return `
                <article class="pokecard">
                <a class="pokecard-name" href="detail.html?name=${pokemon.name}" style="font-size:80%;">
                    <p class="pokecard-id">${formattedId}</p>
                    <img src="${artworkUrl}/${pokemonId}.png" alt="Official artwork of ${pokemon.name}">
                    ${pokemon.name}</a>
                </article>
            `;
        }).join("");
    });

// Append the section element to the main element
document.querySelector("main").append(sectionElm);
