const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get('name');

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => response.json())
    .then(pokemon => {
        const rootElement = document.querySelector("#root");

        document.title = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} - Pokémon`;

        const formattedId = `#${String(pokemon.id).padStart(3, '0')}`;

        function formatName(str){
            return str.replaceAll('attack','atk').replaceAll('defense','def').replaceAll('special','s').replaceAll('speed','sp');
        }

        const pokemonHtml = `
        <section class="pokemon-detail">
        <span class="pokemon-detail-name">
        <button class="icon-arrow_back"></button>
        <h1>${pokemon.name}</h1>
        <p>${formattedId}</p>
        </span>
                <div class="pokemon-img-con">
                    <img class="pokemon-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${pokemon.name}" />
                </div>
                <div class="pokemon-txt-con">
                <div class="pokemon-type-con">
                    <div class="pokemon-type">
                        ${pokemon.types.map(type => `<p>${type.type.name}</p>`).join('')}
                    </div>
                </div>
                    <h3 class="pokemon-about">About</h3>
                    <div class="pokemon-about-info">
                    <div>
                    <p class="icon-weight">${pokemon.weight}</p>
                    <p>Weight</p>
                    </div>
                    <hr>
                     <div>
                    <p class="icon-straighten">${pokemon.height}</p>
                    <p>Height</p>
                    </div>
                    <hr>
                    <div class="pokemon-abilities-list">
                    ${pokemon.abilities.map(ability => `<p>${ability.ability.name}</p>`).join('')}
                    <p>Moves</p>
                    </div>
                    </div>
                    <h3 class="pokemon-stats">Stats</h3>
                    <div>
                    <li class="pokemon-stats-list">
                    <div class="pokemon-stat-con">
        ${pokemon.stats.map(stat => `<label class="pokemon-stat-label">${formatName(stat.stat.name)}</label>`).join('')}
                    </div>
                    <hr>
                    <div class="pokemon-stat-con">
        ${pokemon.stats.map(stat => `<p>${stat.base_stat}</p>`).join('')}
                    </div>
                    <div class="pokemon-stat-meter">
        ${pokemon.stats.map(stat => `<meter class="pokemon-meter" min="0%" max="100%">${stat.base_stat}</meter>`).join('')}
        </div>
        </li>
        </div>
            </section>
        `;

        rootElement.innerHTML = pokemonHtml;
    })
    .catch(error => {
        console.error("Error fetching Pokémon data:", error);
        document.querySelector("#root").innerHTML = "<p>Sorry, Pokémon details could not be found.</p>";
    });
