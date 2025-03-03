

let divElm = document.createElement("div")
divElm.id = "root"

divElm.innerHTML = `
    <header>
  <span class="pokedex-title-con">
    <i src="/img/pokeball.svg" alt="Pokéball" class="icon-pokeball"></i>
    <h1 class="pokedex-title">Pokédex</h1>
</span>
<form action="detail.html">
    <input type="search" class="pokedex-search" name="name" placeholder="search" id="search">
    <button class="icon-sort" id="pokedex-sort"></button>
</form> 
<div id="search-suggestions" class="search-suggestions"></div>
    </header>
    <main></main>
    <footer>created 2025</footer>
`

document.querySelector("body").append(divElm)