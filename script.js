const POKE_API = [];
let responseJson20Buket = '';
let url = '';
let pokemonNr = 0;
let STATS_DATA = {};

async function loadPokeApi(pokemonNr) {

  let url20Buket = 'https://pokeapi.co/api/v2/pokemon/';
  let response20Buket = await fetch(url20Buket);

  responseJson20Buket = await response20Buket.json();
  //console.log(responseJson20Buket);
  url = responseJson20Buket.results[pokemonNr].url; /* 'https://pokeapi.co/api/v2/pokemon/' + */
  let response = await fetch(url);
  let responseJson = await response.json();

  let urlStats = `https://pokeapi.co/api/v2/pokemon/${responseJson.name}`; //responseJson20Buket.results[pokemonNr].url?stats; // + '?language=de'
  //console.log(urlDE);
  let responseStats = await fetch(urlStats);
  STATS_DATA = await responseStats.json();



  //console.log(STATS_DATA.stats[1]); 

  cardHtml(responseJson); // das muss ich ändern. Ich will die Karte ansind in HTML schreiben und nur die Werte übergeben

}


function cardHtml(responseJson) {
  document.getElementById('namePoke').innerText = responseJson.name;
  typeBorders(responseJson);
  PokeAbility(responseJson.abilities);
  //document.getElementById('ability1').innerText = responseJson.abilities[0].ability.name;
  document.getElementById('pokeImg').src = responseJson.sprites.other['dream_world'].front_default;
  // Call the createRadarChart function to generate the chart
  createRadarChart();
}


function nextPokemon() {
  pokemonNr++;
  loadPokeApi(pokemonNr);
}
function prevPokemon() {
  pokemonNr--;
  loadPokeApi(pokemonNr);
}

function typeBorders(responseJson) {
  leftBorder(responseJson.types[0].type.name);
  rightBorder(responseJson.types, responseJson.types.length);
}

function leftBorder(pokeType1) {
  document.getElementById('cardImgLeft').className = '';
  document.getElementById('cardImgLeft').classList.add(pokeType1, 'typeContainer');
  document.getElementById('cardImgLeftText').innerText = pokeType1;
  console.log(pokeType1);

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

function getStats() {
  let htmlStats = '';
  for (let i = 0; i < STATS_DATA.stats.length; i++) {
    let statName = STATS_DATA.stats[i].stat.name;
    let statValue = STATS_DATA.stats[i].base_stat;
    htmlStats += `<div>${statName}: ${statValue}</div>`;
    console.log(statName + ': ' + statValue);
  }
  console.log(htmlStats);
  return htmlStats;
}

// Function to create and render the radar chart
function createRadarChart() {
  const STATS_ARRAY = STATS_DATA.stats;
  //console.log(STATS_ARRAY);
  const ctx = document.getElementById('radarChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: STATS_ARRAY.map(statName => statName.stat.name),
      datasets: radarChartDataSets(STATS_ARRAY)
    },
    options: radarChartOptions()
  });
}



function radarChartDataSets(STATS_ARRAY) {
  return [{
    display: 'false',
    label: '',
    data: STATS_ARRAY.map(stat => stat.base_stat),
     backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 1, 
    pointBackgroundColor: "rgba(54, 162, 235, 1)",
    pointBorderColor: "#fff",
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: "rgba(54, 162, 235, 1)",
    pointRadius: 3, //[0, 5, 10, 15, 20, 25], // Hier legen Sie die Größe der Datenpunkte fest
    pointStyle: "circle" // Hier können Sie das Symbol der Datenpunkte anpassen 
  }]
}

function radarChartOptions() {
  return {
    animation: {
      duration: 1000, // Dauer der Animation in Millisekunden
      easing: "easeInOutBounce", // Easing-Funktion für das Bouncing (hier: Bounce-Effekt)
    },
    scale: {
      
      ticks: {
        beginAtZero: true,
        max: 100,
        stepSize: 25,
        backdropColor: 'rgba(0, 0, 0, 0)',
       
      },
      angleLines: {
        color: '#ee46788a'
      },
      pointLabels: {
        fontColor: '#eec746f3', // Rote Label-Farbe
      },
      gridLines:{
        color: '#ee46788a'
      }
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.yLabel;
        }
      }
    },
  }
}