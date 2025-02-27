document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector("#search");
    const suggestionsContainer = document.querySelector("#search-suggestions");

    const fetchPokemonSuggestions = (query) => {
        if (!query) {
            suggestionsContainer.innerHTML = '';
            return;
        }

        fetch(`https://pokeapi.co/api/v2/pokemon?limit=50`)
            .then(response => response.json())
            .then(data => {
                const filteredPokemon = data.results.filter(pokemon =>
                    pokemon.name.toLowerCase().includes(query.toLowerCase())
                );

                suggestionsContainer.innerHTML = filteredPokemon.map(pokemon => `
                    <div class="suggestion-item" data-name="${pokemon.name}">
                        ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    </div>
                `).join('');

                document.querySelectorAll(".suggestion-item").forEach(item => {
                    item.addEventListener("click", function () {
                        searchInput.value = this.dataset.name;
                        window.location.href = `detail.html?name=${this.dataset.name}`;  // Redirect to details page
                    });
                });
            })
            .catch(error => {
                console.error("Error fetching Pokémon suggestions:", error);
                suggestionsContainer.innerHTML = "<p>Error fetching suggestions</p>";
            });
    };

    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.trim();
        fetchPokemonSuggestions(query);
    });

    document.addEventListener("click", (e) => {
        if (!suggestionsContainer.contains(e.target) && e.target !== searchInput) {
            suggestionsContainer.innerHTML = '';
        }
    });
});
