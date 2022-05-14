const resultSearchPokemon = document.querySelector('.resultSearchPokemon');
const inputSearch = document.querySelector('.search-pokemons input');
const aviso = document.querySelector('.searching')


// Procura os pokemons na api
const searchPokemonsApi = async () => {

    let pokemonsArray = [];

    // Adicionando os pokemons no array com o push
    for(let i = 1; i < 150; i++){
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`

        let response = await fetch(url)
        let pokemon = await response.json();

        pokemonsArray.push(pokemon)
    }

    

    pokemonsArray.forEach(pokemon => {

        let pokemonStats = pokemon.stats

        let pokemonWheight = pokemon.stats[pokemonStats.length - 1].base_stat

        resultSearchPokemon.innerHTML += `
            <div class="pokemon-card">
                <span class="number-pokemon">N° ${pokemon.id}</span>
                <img src="${pokemon.sprites.front_default}" alt="">
                <span class="pokemon-name">${pokemon.name}</span>
                <div class="pokemon-status">
                    <span class="pokemon-weight">Força: ${pokemonWheight}</span>
                </div>
            </div>
        `
    })

    aviso.style.display = 'none'
}

searchPokemonsApi()

// Barra de pesquisa de pokemons 
inputSearch.addEventListener('input', event => {
    const inputValue = event.target.value.toLowerCase()
    const pokemonNameList = document.querySelectorAll('.pokemon-card');

    pokemonNameList.forEach( name => {
        const pokemonName = name.querySelector('.pokemon-name').textContent.toLowerCase()
    
        if(pokemonName.includes(inputValue)){
            name.style.display = 'flex'
            return
        }

        name.style.display = 'none'
    })
})