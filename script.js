//const POKE_API = [];
let responseJson20Buket = '';
let url = '';
let pokemonNr = 1;
let statsData = {};
let pokeSpecialTxt = {};

async function loadPokeApi() {

  let url20Buket = 'https://pokeapi.co/api/v2/pokemon/';
  let response20Buket = await fetch(url20Buket);
  responseJson20Buket = await response20Buket.json();
  //console.log(responseJson20Buket);
  renderCardBucket();


}

async function loadDetailCard() {
  let urlStats = `https://pokeapi.co/api/v2/pokemon/${pokemonNr}`;
  let responseStats = await fetch(urlStats);
  statsData = await responseStats.json();
  console.log(statsData);
  loadDetailTxt();
  cardHtml(); // das muss ich ändern. Ich will die Karte ansind in HTML schreiben und nur die Werte übergeben
}

async function loadDetailTxt() {
  let urlDetailTxt = `https://pokeapi.co/api/v2/pokemon-species/${pokemonNr}`;
  let responsetxt = await fetch(urlDetailTxt);
  const POKE_SPECIAL_TXT = await responsetxt.json();
  console.log(POKE_SPECIAL_TXT);
  console.log(POKE_SPECIAL_TXT['flavor_text_entries'][0]);

  //Der folgende Code muss in eine eigene Funktion. Ich muss leider noch überprüfen ob der language code "en" ist
  // ich bekomme sonst schon bei Raupi einen chinesischen text
  if (POKE_SPECIAL_TXT['flavor_text_entries'][0] == null) {
    document.getElementById('info1').innerHTML = 'We have not enough data about this pokemon!'
  } else {
    document.getElementById('info1').innerHTML = POKE_SPECIAL_TXT['flavor_text_entries'][0]['flavor_text'].replace(/[\r\f]+/g, " ");
  }
  if (POKE_SPECIAL_TXT['flavor_text_entries'][1] && POKE_SPECIAL_TXT['flavor_text_entries'][1]['flavor_text'] != POKE_SPECIAL_TXT['flavor_text_entries'][0]['flavor_text']) {
    document.getElementById('info1').innerHTML += "<br>" + POKE_SPECIAL_TXT['flavor_text_entries'][1]['flavor_text'].replace(/[\r\f]+/g, " ");
  }
}

//diese Funtion soll beim Start aufgerufen werden um die ersten 20 Pokemon zu rendern
// Sie soll weiterhin eine Variable übergeben mit der nummer des zuletzt gerenderten Pokemon
// zweck: damit ich diese Variable nutzen kann um das nächste bucket zu laden.
function renderCardBucket() {
  loadDetailCard(); //diese Funktion soll aufgerufen werden, wenn eine der Karten angeklickt wird.
}

function cardHtml() {
  document.getElementById('namePoke').innerText = firstLetterBig(statsData.name);
  typeBorders();
  PokeAbility(statsData.abilities);
  getHeightAndWeight();
  //document.getElementById('ability1').innerText = responseJson.abilities[0].ability.name;

  document.getElementById('pokeImg').src = getPicture(); //STATS_DATA.sprites.other['dream_world'].front_default;
  // Call the createPolarAreaChart function to generate the chart
  createPolarAreaChart();
}

function firstLetterBig(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getPicture() {
  if (statsData.sprites.other['dream_world'].front_default != null) {
    return statsData.sprites.other['dream_world'].front_default;
  } else {
    return statsData.sprites.other['official-artwork'].front_default;
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function block for left and right img border start
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function nextPokemon() {
  pokemonNr++;
  if (pokemonNr > 1010) { pokemonNr = 1 }
  loadDetailCard(pokemonNr);
}
function prevPokemon() {
  pokemonNr--;
  if (pokemonNr < 1) { pokemonNr = 1010 }
  loadDetailCard(pokemonNr);
}

function typeBorders() {
  leftBorder(statsData.types[0].type.name);
  rightBorder(statsData.types, statsData.types.length);
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
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function block for side informations start
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function getHeightAndWeight() {
  document.getElementById('pokeHeight').innerText = (statsData.height * 10) + 'cm';
  document.getElementById('pokeWeight').innerText = (statsData.weight / 10) + 'kg';
}





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
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function block for side informations end
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function block for chart start
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function createPolarAreaChart() {
  const STATS_ARRAY = statsData.stats;
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
      gridLines: {
        color: '#ee46788a'
      }
    }
  }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function block for chart end
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~