const POKE_API = [];
let responseJson20Buket = '';
let url = '';
let pokemonNr = 1;
let STATS_DATA = {};

async function loadPokeApi() {

  let url20Buket = 'https://pokeapi.co/api/v2/pokemon/';
  let response20Buket = await fetch(url20Buket);

  responseJson20Buket = await response20Buket.json();
  console.log(responseJson20Buket);
 
  loadDetailCard();
  //Ich möchte den unteren Teil in einer eigenen Funktion haben
  
  /* let urlStats = `https://pokeapi.co/api/v2/pokemon/${pokemonNr}`; 
  let responseStats = await fetch(urlStats);
  STATS_DATA = await responseStats.json();
  console.log(STATS_DATA);
  cardHtml(); // das muss ich ändern. Ich will die Karte ansind in HTML schreiben und nur die Werte übergeben */
}

async function loadDetailCard() {
  let urlStats = `https://pokeapi.co/api/v2/pokemon/${pokemonNr}`; 
  let responseStats = await fetch(urlStats);
  STATS_DATA = await responseStats.json();
  console.log(STATS_DATA);
  loadDetailTxt();
  cardHtml(); // das muss ich ändern. Ich will die Karte ansind in HTML schreiben und nur die Werte übergeben
}

async function loadDetailTxt(){
  let urlDetailTxt = `https://pokeapi.co/api/v2/pokemon-species/${pokemonNr}`; 
  let responsetxt = await fetch(urlDetailTxt);
  let pokeSpecialtxt = await responsetxt.json();
  console.log(pokeSpecialtxt);
}


function cardHtml() {
  document.getElementById('namePoke').innerText = firstLetterBig(STATS_DATA.name);
  typeBorders();
  PokeAbility(STATS_DATA.abilities);
  //document.getElementById('ability1').innerText = responseJson.abilities[0].ability.name;
  
  document.getElementById('pokeImg').src = getPicture(); //STATS_DATA.sprites.other['dream_world'].front_default;
  // Call the createPolarAreaChart function to generate the chart
  createPolarAreaChart();
}

function firstLetterBig(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getPicture() {
  if(STATS_DATA.sprites.other['dream_world'].front_default != null){
    return STATS_DATA.sprites.other['dream_world'].front_default;
  }else{
    return STATS_DATA.sprites.other['official-artwork'].front_default;
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function block for left and right img border start
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function nextPokemon() {
  pokemonNr++;
  if (pokemonNr > 1010) {pokemonNr = 1}
  loadDetailCard(pokemonNr);
}
function prevPokemon() {
  pokemonNr--;
  if (pokemonNr < 1) {pokemonNr = 1010}
  loadDetailCard(pokemonNr);
}

function typeBorders() {
  leftBorder(STATS_DATA.types[0].type.name);
  rightBorder(STATS_DATA.types, STATS_DATA.types.length);
}

function leftBorder(pokeType1) {
  document.getElementById('cardImgLeft').className = '';
  document.getElementById('cardImgLeft').classList.add(pokeType1, 'typeContainer');
  document.getElementById('cardImgLeftText').innerText = pokeType1;
  //console.log(pokeType1);

}
function rightBorder(pokeType, length) {
  if (length > 1) {
    document.getElementById('cardImgRight').className = '';
    document.getElementById('cardImgRight').classList.add(pokeType[1].type.name, 'typeContainer');
    document.getElementById('cardImgRightText').innerText = pokeType[1].type.name;
  } else {
    document.getElementById('cardImgRight').className = '';
    document.getElementById('cardImgRight').classList.add(pokeType[0].type.name, 'typeContainer');
    document.getElementById('cardImgRightText').innerText = pokeType[0].type.name;
  }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function block for left and right img border end
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function PokeAbility(key) { // checken ob der Code hier so passt, oder ob das nicht zu viel ist
  if (key[0]) {
    //console.log(key[0].ability.name);
    document.getElementById('ability1').innerText = key[0].ability.name;
  }
  if (key[1]) {
    document.getElementById('ability2').innerText = key[1].ability.name;
  } else {
    return '';
  }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function block for chart start
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function createPolarAreaChart() {
  const STATS_ARRAY = STATS_DATA.stats;
  const ctx = document.getElementById('polarChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'polarArea',
    data: {
      //I've add here for lables a combination from stat.name and base_stat to get a beter legend
      labels: STATS_ARRAY.map((statName, i) => statName.stat.name + ": " + STATS_ARRAY[i].base_stat),
      datasets: polarChartDataSets(STATS_ARRAY)
    },
    options: polarChartOptions()
  });
}


function polarChartDataSets(STATS_ARRAY) {
  return [{
    data: STATS_ARRAY.map(stat => stat.base_stat),
    //each stat gets its own color
    backgroundColor: [
      '#FF00008a',
      '#F080308a',
      '#F8D0308a',
      '#6890F08a',
      '#78C8508a',
      '#F858888a'
    ],
    borderWidth: 0,    
  }]
}

function polarChartOptions() {
  return {
    responsive: true,
    animation: {
      duration: 500, 
      easing: "easeInOutBounce", 
    },
    scale: {
      ticks: {
        beginAtZero: true,
        max: 150,
        stepSize: 25,
        backdropColor: 'rgba(0, 0, 0, 0)',
      },
       gridLines:{
        color: '#ee46788a'
      }
    }
  }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function block for chart end
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~