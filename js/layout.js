

let divElm = document.createElement("div")
divElm.id = "root"

divElm.innerHTML = `
    <header>
  <span class="pokedex-title-con">
    <i src="/img/pokeball.svg" alt="Pokéball" class="icon-pokeball"></i>
    <h1 class="pokedex-title">Pokédex</h1>
</span>

    <input type="search" class="pokedex-search" name="search" placeholder="search">
    <button class="pokedex-sort"><img src="/img/3-bars.svg"></button>
    </header>
    <main></main>
    <footer>created 2025</footer>
`

document.querySelector("body").append(divElm)