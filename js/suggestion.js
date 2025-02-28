document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector("#search");
    const suggestionsContainer = document.querySelector("#search-suggestions");

    // Function to fetch all Pokémon (handling pagination)
    const fetchAllPokemon = async () => {
        let allPokemon = [];
        let nextUrl = 'https://pokeapi.co/api/v2/pokemon/';

        // Fetch until all pages are retrieved
        while (nextUrl) {
            const response = await fetch(nextUrl);
            const data = await response.json();
            allPokemon = allPokemon.concat(data.results);  // Append current page's results to the list

            nextUrl = data.next;  // Set the next page URL, or null if it's the last page
        }

        return allPokemon;
    };

    // Function to get cached Pokémon or fetch new data
    const getCachedPokemon = () => {
        const cachedData = localStorage.getItem('allPokemon');
        const cacheTimestamp = localStorage.getItem('cacheTimestamp');

        // Check if cached data exists and if it's still valid (not expired)
        if (cachedData && cacheTimestamp) {
            const cacheAge = Date.now() - parseInt(cacheTimestamp);
            const cacheExpiryTime = 24 * 60 * 60 * 1000; // Cache expiry time (1 day in milliseconds)

            // If the cache is less than 1 day old, use it
            if (cacheAge < cacheExpiryTime) {
                return JSON.parse(cachedData);
            }
        }

        // If no valid cached data, fetch new data
        return null;
    };

    // Function to cache Pokémon data
    const cachePokemonData = (data) => {
        // Store Pokémon data and cache timestamp in localStorage
        localStorage.setItem('allPokemon', JSON.stringify(data));
        localStorage.setItem('cacheTimestamp', Date.now().toString());
    };


  
    // Function to fetch Pokémon suggestions based on query
    const fetchPokemonSuggestions = async (query) => {
        if (!query) {
            suggestionsContainer.innerHTML = '';  // Clear suggestions if there's no query
            return;
        }

        try {
            let allPokemon = getCachedPokemon();  // Try to get cached Pokémon

            if (!allPokemon) {
                // If no cached data, fetch from the API
                allPokemon = await fetchAllPokemon();
                cachePokemonData(allPokemon);  // Cache the fetched data
            }

            // Filter Pokémon by name (case-insensitive)
            const filteredPokemon = allPokemon.filter(pokemon =>
                pokemon.name.toLowerCase().includes(query.toLowerCase())
            );

            if (filteredPokemon.length === 0) {
                suggestionsContainer.innerHTML = "<p>No Pokémon found</p>";  // Display message if no match
            } else {
                suggestionsContainer.innerHTML = filteredPokemon.map(pokemon => `
                    <div class="suggestion-item" data-name="${pokemon.name}">
                        ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    </div>
                `).join('');
            }

            // Add click event listener to each suggestion item
            document.querySelectorAll(".suggestion-item").forEach(item => {
                item.addEventListener("click", function () {
                    searchInput.value = this.dataset.name;
                    window.location.href = `detail.html?name=${this.dataset.name}`;  
                });
            });
        } catch (error) {
            console.error("Error fetching Pokémon suggestions:", error);
            suggestionsContainer.innerHTML = "<p>Error fetching suggestions</p>";
        }
    };
    function debounce(func, timeout = 400) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        };
    }
    
    // Directly debounced function to save input and fetch suggestions
    const processChange = debounce((query) => {
        console.log('Saving data');
        localStorage.setItem('searchQuery', query);  // Save to localStorage
    
        const savedQuery = localStorage.getItem('searchQuery');
        console.log(savedQuery);  // Log the saved query
    
        fetchPokemonSuggestions(query);  // Fetch suggestions based on the query
    });
    
    // Event listener for when the user types in the search input
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.trim();
        processChange(query);  // Call the debounced function directly with the query
    });
    
    // Hide suggestions when clicking outside the search input and suggestions container
    document.addEventListener("click", (e) => {
        if (!suggestionsContainer.contains(e.target) && e.target !== searchInput) {
            suggestionsContainer.innerHTML = '';
        }
    });
})
