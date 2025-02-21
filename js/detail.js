const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get('name'); 

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => response.json())
    .then(pokemon => {
        const rootElement = document.querySelector("#root");

        document.title = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} - Pokémon`;

        const formattedId = `#${String(pokemon.id).padStart(3, '0')}`;

        const pokemonHtml = `
        <section class="pokemon-detail">
        <span>
        <h1>${pokemon.name}</h1>
        <p>${formattedId}</p>
        </span>
                <div class="pokemon-img-con">
                    <img class="pokemon-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${pokemon.name}" />
                </div>
                <div class="pokemon-txt-con">
                    <h3 class="pokemon-types">Types:</h3>
                    <ul class="pokemon-types-list">
                        ${pokemon.types.map(type => `<li>${type.type.name}</li>`).join('')}
                    </ul>
                    <h3 class="pokemon-abilities">Abilities:</h3>
                    <ul class="pokemon-abilities-list">
                        ${pokemon.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
                    </ul>
                    <h3 class="pokemon-stats">Stats:</h3>
                    <ul class="pokemon-stats-list">
                        ${pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
                    </ul>
                </div>
            </section>
        `;

        rootElement.innerHTML = pokemonHtml;
    })
    .catch(error => {
        console.error("Error fetching Pokémon data:", error);
        document.querySelector("#root").innerHTML = "<p>Sorry, we couldn't load the Pokémon details.</p>";
    });
