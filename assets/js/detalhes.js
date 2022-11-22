const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151;
const limit = 2;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon2 ${pokemon.type}">
           

            <div class="types2">
            <span class="number2">#${pokemon.number}</span>
            <span class="name2">${pokemon.name}</span>
            <img= src"./img/pokebola.png">
            <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
            
            
            <div class="detail2">
                <ol class="">
                
                    ${pokemon.types.map((type) => `<li class="type2 ${type}">${type}</li>`).join('')}
                   
                </ol>
               
            </div>
                      
            
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})