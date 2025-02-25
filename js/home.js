/**
 * @param {string} pokemonUrl
 * @returns {string}
 */

let currentOffset = 1; // keeps track of where the last pokemon data fetch ended
let isLoading = false; // only one request at a time

//checks if element is in/out of viewport
const observer = new IntersectionObserver(entries => {
    //if element is fully visible  fetchPokemon() func gets called
    if (entries[0].isIntersecting && !isLoading) {
        fetchPokemon();
    }
}, {
    //element is exactly within viewport
    rootMargin: "0px",
    //trigger if 100% visible
    threshold: 1.0 
});

const sectionElm = document.createElement("section");
sectionElm.className = "pokelist";

//if isLoading is true, prevent new request until current on is done
const fetchPokemon = () => {
    if (isLoading) return;
    isLoading = true;

    // executes multiple asynchronous tasks in parallel, handles all the results together when done
    Promise.all(
        //creates array with 48 undefined values. list of 48 items to map over, array with 48 empty spots

        //.map() used to iterate over and array and transform each item
        //not using actual value (_) but need the index (i) to calculate pokemon id
        [...Array(48)].map((_, i) => 
            //call fetch api
            //currentOffset is starting pokemon id
            //i index from .map() and adding i to currentOffset allows us to fetch next 48
            fetch(`https://pokeapi.co/api/v2/pokemon/${currentOffset + i}`)
            //fetch() returns response object, res.json() parses json response from api
                .then(res => res.json())
        )

        //when done, all results are returned as array (results)
        //each entry is a pokemon object
    ).then(results => {
        //using .map() to transform result into simpler format
        const pokemon = results.map(result => ({
            //dont need all the data from the API, just these ones
            name: result.name,
            image: result.sprites.other['official-artwork'].front_default,
            type: result.types[0].type.name,
            id: result.id,
            weight: result.weight,
            height: result.height
        }));
        //transformation results in a new array (pokemon), contains simplified data

        //increment by 48 to ensure we start from correct id in next request
        currentOffset += 48;
        //calls appendToMain() func and passes newly processed pokemon array
        //appendToMain() responsible for rendering in UI
        appendToMain(pokemon);
        //after fetch and processing is done, isLoading = false, allowing another fetch
        isLoading = false;
    });
};

const appendToMain = pokeArray => {
    sectionElm.innerHTML += pokeArray.map(pokemon => `
        <article class="pokecard" data-type="${pokemon.type}">
            <a class="pokecard-name" href="detail.html?name=${pokemon.name}" style="font-size:80%;">
                <p class="pokecard-id">#${String(pokemon.id).padStart(3, '0')}</p>
                <img src="${pokemon.image}" class="pokecard-img" alt="Official artwork of ${pokemon.name}">
                ${pokemon.name}
            </a>
        </article>
    `).join("");

    document.querySelector("main").append(sectionElm);

    observer.observe(sectionElm.querySelector("article:last-child"));
};

fetchPokemon();
