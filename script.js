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

    let urlDE = responseJson20Buket.results[pokemonNr].url + '?language=de';
    //console.log(urlDE);
    let responseDE = await fetch(urlDE);
    let responseJsonDE = await responseDE.json();


    console.log(responseJson);
    // console.log(responseJsonDE.name); 

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

function ability(key, index) {
    if (key[index]) {
        return key[0].ability.name;
    } else {
        return  '';        
    }  
}




/* const base_url = 'https://pokeapi.co/api/v2/pokemon-species/';

// Pokémon-IDs der ersten drei Pokémon (Bisasam, Bisaknosp, Bisaflor)
const pokemon_ids = [1, 2, 3];

async function getGermanNames() {
  for (const pokemon_id of pokemon_ids) {
    try {
      const response = await fetch(`${base_url}${pokemon_id}`);
      const data = await response.json();
console.log(data);
      // Überprüfen, ob die benötigten Eigenschaften vorhanden sind
      if (data && data.names) {
        const german_name = data.names.find(name => name.language.name === 'de');
        if (german_name) {
          console.log(`Deutscher Name von Pokémon ${pokemon_id}: ${german_name.name}`);
        } else {
          console.log(`Deutscher Name von Pokémon ${pokemon_id} nicht verfügbar.`);
        }
      } else {
        console.log(`Daten für Pokémon ${pokemon_id} nicht verfügbar.`);
      }
    } catch (error) {
      console.error(`Fehler beim Abrufen der Daten für Pokémon ${pokemon_id}: ${error.message}`);
    }
  }
}

getGermanNames();



 */




const base_url = 'https://pokeapi.co/api/v2/ability/8'; //'https://pokeapi.co/api/v2/pokemon-species/';

// Pokémon-IDs der ersten drei Pokémon (Bisasam, Bisaknosp, Bisaflor)
const pokemon_ids = [1, 2, 3];

async function getGermanNames() {
  for (const pokemon_id of pokemon_ids) {
    try {
      const response = await fetch(`${base_url}`); //${pokemon_id}
      const data = await response.json();
      console.log(data);
      // Überprüfen, ob die benötigten Eigenschaften vorhanden sind
      if (data && data.names) {
        let german_name = null;
        for (const name of data.names) {
          if (name.language.name === 'de') {
            german_name = name.name;
            break;
          }
        }

        if (german_name) {
          console.log(`Deutscher Name von Pokémon ${pokemon_id}: ${german_name}`);
        } else {
          console.log(`Deutscher Name von Pokémon ${pokemon_id} nicht verfügbar.`);
        }
      } else {
        console.log(`Daten für Pokémon ${pokemon_id} nicht verfügbar.`);
      }
    } catch (error) {
      console.error(`Fehler beim Abrufen der Daten für Pokémon ${pokemon_id}: ${error.message}`);
    }
  }
}

getGermanNames();