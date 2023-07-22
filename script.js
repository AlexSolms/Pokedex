const POKE_API = [];
let responseJson20Buket = '';
let url = ''
let pokemonNr = 0

async function loadPokeApi(pokemonNr) {

    let url20Buket = 'https://pokeapi.co/api/v2/pokemon/';
    let response20Buket = await fetch(url20Buket);
    responseJson20Buket = await response20Buket.json();

    url = responseJson20Buket.results[pokemonNr].url; /* 'https://pokeapi.co/api/v2/pokemon/' + */
    let response = await fetch(url);
    let responseJson = await response.json();

    console.log(responseJson);
    console.log(responseJson.name);

    document.getElementById('start').innerHTML = cardHtml(responseJson);
    leftBorder(responseJson.types[0].type.name);
    rightBorder(responseJson.types, responseJson.types.length)
    // document.getElementById('start').innerText = responseTxt;

}


function cardHtml(responseJson) {
    return /*html*/ `<section class="container">
    <div class="card cardContent p-3 bg-dark bg-gradient text-white">
        <div class="card-body">
            <h3 class="pokeName card-title" id="namePoke">${responseJson.name}</h3>
            <div id="idCardImgContainer" class="cardImgContainer container d-flex justify-content-between">
                <div class="d-flex">
                    <button class="btn btn-outline-light" onclick="prevPokemon()">&#x21a2;</button>
                </div>
                <div id="idCardImgContainerInner" class="container d-flex justify-content-between">
                    <div id="cardImgLeft">
                    </div>
                    <div class="cardImage ">
                        <img class="img card-img" src=${responseJson.sprites.other['dream_world'].front_default} alt="">
                    </div> 
                    <div id="cardImgRight"> 
                    </div>
                </div>
                <div class="d-flex">
                    <button class="btn btn-outline-light" onclick="nextPokemon()">&#x21a3;</button>
                </div>                
            </div>
            <div class="cardStats card-text">
                <div class="firstInfo" id="info1"><span>move 1: ${responseJson.moves[0].move.name}</span><span>move 2: ${responseJson.moves[1].move.name}</span></div>
                <div class="secondInfo" id="info2">${''}</div>
                <div class="thirdInfo" id="info3">${''}</div>
                <div class="fourthInfo" id="info4">${''}</div>
           
            </div>
        </div>
    </div>
</section>`;
    //src=${responseJson.sprites.other['official-artwork'].front_default}
    // ${responseJson.sprites.back_default}  ${responseJson.moves[0].move.name} ${responseJson.moves[1].move.name}
}

function nextPokemon() {
    pokemonNr++;
    loadPokeApi(pokemonNr);
}
function prevPokemon() {
    pokemonNr--;
    loadPokeApi(pokemonNr);
}

function leftBorder(pokeType1) {
    document.getElementById('cardImgLeft').classList.add(pokeType1);
    
}
function rightBorder(pokeType, length) {
    if (length > 1) {
        document.getElementById('cardImgRight').classList.add(pokeType[1].type.name);
    } else {
        document.getElementById('cardImgRight').classList.add(pokeType[0].type.name);
    }

    
    
}