

let divElm = document.createElement("div")
divElm.id = "root"

divElm.innerHTML = `
    <header>
  <span class="pokedex-title-con">
    <i src="/img/pokeball.svg" alt="Pokéball" class="icon-pokeball"></i>
    <h1 class="pokedex-title">Pokédex</h1>
</span>
  <search>
    <input type="search" class="pokedex-search" name="search" placeholder="search">
    <button class="icon-sort" id="pokedex-sort"></button>
    </search>
    </header>
    <main></main>
    <footer>created 2025</footer>
`

document.querySelector("body").append(divElm)