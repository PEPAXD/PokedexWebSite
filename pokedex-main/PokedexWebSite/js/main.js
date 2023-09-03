const listaPokemon = document.querySelector("#listaPokemon");
let URL = "https://pokeapi.co/api/v2/pokemon/";
let number_Pokémon_display = 1009;
let pokemonDataArray = [];

// Almacena Data
for(let i = 1; i <= number_Pokémon_display; i++) {
    fetch(URL + i)
    .then((response) => response.json())
    .then(data => {

        pokemonDataArray.push(data); 
        if (pokemonDataArray.length === number_Pokémon_display) {
            pokemonDataArray.sort((a, b) => a.id - b.id);
            pokemonDataArray.forEach(pokeData => mostrarPokemon(pokeData));
        }
    });
}

//PRINT POKEMON CARD
function mostrarPokemon(poke) {

    let tipos = poke.types.map(type => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    const button = document.createElement("a");
    button.classList.add("pokemon-todos-token");
    button.href = "https://www.pokemon.com/es/pokedex/"+poke.name;
    button.innerHTML = `
        <p class="pokemon-todos-token-text">#${poke.id}</p>
        <div class="pokemon-todos-token-sprite">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-todos-token-info">
            <div class="nombre-contenedor">
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-todos-token-info-tipos">
                ${tipos}
            </div>
        </div>
    `;

    listaPokemon.append(button);
}

//Filter Search-Bar
const searchForm = document.querySelector(".search-bar-form");

searchForm.addEventListener("submit", function (event) {
event.preventDefault();

const searchInput = document.querySelector(".search-bar-input");
const searchQuery = searchInput.value.toLowerCase().trim();

const filteredPokemons = pokemonDataArray.filter((pokeData) => {
return (
    pokeData.name.includes(searchQuery) ||
    pokeData.id.toString().includes(searchQuery) ||
    pokeData.types.some((type) => type.type.name.includes(searchQuery))
);
});

clearPokemonList();
filteredPokemons.forEach((pokeData) => mostrarPokemon(pokeData));
});

function clearPokemonList() {
listaPokemon.innerHTML = "";
}
