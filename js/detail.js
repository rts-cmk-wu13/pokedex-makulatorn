const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get('name');

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => response.json())
    .then(pokemon => {
        const rootElement = document.querySelector("#root");

        document.title = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} - Pokémon`;

        const formattedId = `#${String(pokemon.id).padStart(3, '0')}`;

        function formatName(str) {
            return str.replaceAll('attack', 'ATK').replaceAll('defense', 'DEF').replaceAll('special-', 'S').replaceAll('speed', 'SP').replaceAll('hp', 'HP');
        }

        const typeColors = {
            "grass": "#78C850", "fire": "#F08030", "water": "#6890F0", "bug": "#A8B820",
            "normal": "#A8A878", "electric": "#F8D030", "ground": "#E0C068", "fairy": "#EE99AC",
            "fighting": "#C03028", "psychic": "#F85888", "rock": "#B8A038", "ghost": "#705898",
            "dragon": "#7038F8", "dark": "#705848", "steel": "#B8B8D0", "ice": "#98D8D8",
            "poison": "#A040A0", "flying": "#A890F0"
        };
        const maxStatValue = 255;
        const pokemonHtml = `
        <section class="pokemon-detail">
            ${pokemon.types.map(type => `<div class="pokemon-detail-con" style="background-color:${typeColors[pokemon.types[0].type.name]};">`).join('')}
            <span class="pokemon-detail-name">
        <button class="icon-arrow_back" type="button" value="Back" onclick="window.history.back()" ></button>
        <h1 class="pokemon-name">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
        <p class="pokemon-id">${formattedId}</p>
    </span>
    ${pokemon.types.map(type => `<div class="pokemon-img-con" style="background-color:${typeColors[pokemon.types[0].type.name]};">`).join('')}
        <img class="pokemon-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${pokemon.name}" />
    </div>
                <div class="pokemon-txt-con">
                <div class="pokemon-type-con">
                    <div class="pokemon-type">
                        ${pokemon.types.map(type => `<p class="pokemon-type-name" style="background-color:${typeColors[type.type.name]};">${type.type.name}</p>`).join('')}
                    </div>
                </div>
                <h3 class="pokemon-about" style="color:${typeColors[pokemon.types[0].type.name]};">About</h3>
                    <div class="pokemon-about-info">
                    <div class="pokemon-about-stats-con">
                    <p class="icon-weight">${pokemon.weight / 10} Kg</p>
                    <p class="pokemon-about-stats">Weight</p>
                    </div>
                    <hr>
                     <div class="pokemon-about-stats-con">
                    <p class="icon-straighten">${pokemon.height / 10} M</p>
                    <p class="pokemon-about-stats">Height</p>
                    </div>
                    <hr>
                    <div>
                    ${pokemon.abilities.map(ability => `<p>${ability.ability.name}</p>`).join('')}
                    <p class="pokemon-about-stats">Moves</p>
                    </div>
                    </div>
                <h3 class="pokemon-stats" style="color:${typeColors[pokemon.types[0].type.name]};">Base Stats</h3>
                    <div>
                    <li class="pokemon-stats-list">
                    <div class="pokemon-stat-con">
        ${pokemon.stats.map(stat => {
            const normalizedValue = (stat.base_stat / maxStatValue) * 100;
            return `
            <label class="pokemon-stat-label" style="color:${typeColors[pokemon.types[0].type.name]};">${formatName(stat.stat.name)}</label>
            `;
        }).join('')}
                    </div>
                    <hr>
                    <div class="pokemon-stat-con">
        ${pokemon.stats.map(stat => `<p>${stat.base_stat}</p>`).join('')}
                    </div>
                    <div class="pokemon-stat-meter">
        ${pokemon.stats.map(stat => {
            const normalizedValue = (stat.base_stat / maxStatValue) * 100;
            return `
            <meter class="pokemon-meter" min="0" max="100" value="${normalizedValue}">${stat.base_stat}</meter>
            `;
        }).join('')}
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