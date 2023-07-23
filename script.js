const POKE_API = [];
let responseJson20Buket = '';
let url = '';
let pokemonNr = 0;
let STATS_DATA = {};

async function loadPokeApi(pokemonNr) {

    let url20Buket = 'https://pokeapi.co/api/v2/pokemon/';
    let response20Buket = await fetch(url20Buket);
    
    responseJson20Buket = await response20Buket.json();
    console.log(responseJson20Buket);
    url = responseJson20Buket.results[pokemonNr].url; /* 'https://pokeapi.co/api/v2/pokemon/' + */
    let response = await fetch(url);
    let responseJson = await response.json();

    let urlStats = `https://pokeapi.co/api/v2/pokemon/${responseJson.name}`; //responseJson20Buket.results[pokemonNr].url?stats; // + '?language=de'
    //console.log(urlDE);
    let responseStats = await fetch(urlStats);
    STATS_DATA = await responseStats.json();


    
    console.log(STATS_DATA.stats[1]); 

    document.getElementById('start').innerHTML = cardHtml(responseJson);
    leftBorder(responseJson.types[0].type.name);
    rightBorder(responseJson.types, responseJson.types.length)
    // document.getElementById('start').innerText = responseTxt;

}


function cardHtml(responseJson) {
    return /*html*/ `<section class="container">
    <div id="idCardContent" class="card cardContent p-3 bg-dark bg-gradient text-white">
        <div class="" >
            <div id="idCardhead" class="card-head text-center">
                <h3 class="pokeName card-title" id="namePoke">${responseJson.name}</h3>
            </div>
            <div id="idCardImgContainer" class=" card-body cardImgContainer">
                <div id="idLeftButton" class="leftButton">
                    <div class="" onclick="prevPokemon()">&#x21a2;</div>
                </div>
                <div id="idCardImgContainerInner" class="gap-4 d-flex justify-content-between">
                    <div id="cardImgLeft">
                    </div>
                    <div class="cardImage">
                        <img class="img card-img" src=${responseJson.sprites.other['dream_world'].front_default} alt="">
                    </div> 
                    <div id="cardImgRight"> 
                    </div>
                </div>
                <div id="idRightButton" class="rightButton">
                    <div class="" onclick="nextPokemon()">&#x21a3;</div>
                </div>                
            </div>
            <div class="cardStats card-text">
                <div class="firstInfo" id="info1"><span>ability 1: ${ability(responseJson.abilities, 0)}</span>
                <span>ability 2: ${ability(responseJson.abilities, 1)}</span></div>
                <div class="secondInfo" id="info2">${getStats()}</div>
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

function ability(key, index) {
    if (key[index]) {
        return key[0].ability.name;
    } else {
        return  '';        
    }  
}

function getStats() {
  let htmlStats ='';
  for (let i = 0; i < STATS_DATA.stats.length; i++) {
    let statName = STATS_DATA.stats[i].stat.name;
    let statValue = STATS_DATA.stats[i].base_stat;
    htmlStats += `<div>${statName}: ${statValue}</div>`;
    console.log(statName + ': ' + statValue);
    
  }
  console.log(htmlStats);
  return htmlStats;
  
}