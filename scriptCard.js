//const POKE_API = [];
let responseJson20Buket = '';
let url = '';
let pokemonNr = 1;
let statsData = {};
let pokeSpecialTxt = {};


async function loadDetailCard(pokemonNr) {
  await fetchDetailData(pokemonNr);
  //console.log(statsData);
  await fetchDetailTxt(pokemonNr);
  console.log(await loadForTests());
  cardHtml(); // das muss ich ändern. Ich will die Karte ansind in HTML schreiben und nur die Werte übergeben
}
/* //hier sind meine fetchdateien!!!!!!
async function fetchDetailData(pokemonNr) {
  let urlStats = `https://pokeapi.co/api/v2/pokemon/${pokemonNr}`;
  let responseStats = await fetch(urlStats);
  statsData = await responseStats.json();
}


async function fetchDetailTxt(pokemonNr) {
  let urlDetailTxt = `https://pokeapi.co/api/v2/pokemon-species/${pokemonNr}`;
  let responsetxt = await fetch(urlDetailTxt);
  pokeSpecialTxt = await responsetxt.json();
}

async function loadForTests() {
  let urlDetailTxt = `https://pokeapi.co/api/v2/ability/65/`;
  let responsetxt = await fetch(urlDetailTxt);
  return await responsetxt.json();
}
 */
//diese Funtion soll beim Start aufgerufen werden um die ersten 20 Pokemon zu rendern
// Sie soll weiterhin eine Variable übergeben mit der nummer des zuletzt gerenderten Pokemon
// zweck: damit ich diese Variable nutzen kann um das nächste bucket zu laden.
function renderCardBucket() {
  loadDetailCard(pokemonNr); //diese Funktion soll aufgerufen werden, wenn eine der Karten angeklickt wird.
}

function cardHtml() {
  document.getElementById('namePoke').innerText = firstLetterBig(statsData.name);
  typeBorders('cardImgLeftText', 'cardImgRightText');
  openSelectedInfo(1);
  getFavorTxt();
  //console.log(statsData.abilities);
  PokeAbility(statsData.abilities);
  
  getHeightAndWeight();
  document.getElementById('pokeImg').src = getPicture();
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

//render menu -- info the user want to see
function openSelectedInfo(number) {
  for (let i = 1; i < 5; i++) {
    if (document.getElementById('menu' + i).classList.contains('d-none') && i === number) {
      document.getElementById('menu' + i).classList.remove('d-none');
    } else if (!document.getElementById('menu' + i).classList.contains('d-none') && i !== number)
      document.getElementById('menu' + i).classList.add('d-none');
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

function typeBorders(leftID, rightID) {
  leftBorder(statsData.types[0].type.name, leftID);
  rightBorder(statsData.types, statsData.types.length, rightID);
}

function leftBorder(pokeType1, leftID) {
  document.getElementById(leftID).className = '';
  document.getElementById(leftID).classList.add(pokeType1, 'typeContainer');
  document.getElementById(leftID).innerText = pokeType1;
  //console.log(pokeType1);

}
function rightBorder(pokeType, length, rightID) {
  if (length > 1) {
    document.getElementById(rightID).className = '';
    document.getElementById(rightID).classList.add(pokeType[1].type.name, 'typeContainer');
    document.getElementById(rightID).innerText = pokeType[1].type.name;
  } else {
    document.getElementById(rightID).className = '';
    document.getElementById(rightID).classList.add(pokeType[0].type.name, 'typeContainer');
    document.getElementById(rightID).innerText = pokeType[0].type.name;
  }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function block for left and right img border end
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function block for pysical informations start
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function getHeightAndWeight() {
  document.getElementById('pokeHeight').innerText = (statsData.height * 10) + 'cm';
  document.getElementById('pokeWeight').innerText = (statsData.weight / 10) + 'kg';
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function block for pysical informations end
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function block for abilities start
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
async function PokeAbility(abilities) {
  if (abilities[0]) {
    document.getElementById('ability1').innerText = abilities[0].ability.name;
    let abilityDescription = await getAbilityDescription(abilities[0].ability.url);
    document.getElementById('ability1').innerText += '\n' + abilityDescription;
  }
  if (abilities[1]) {
    document.getElementById('ability2').innerText = abilities[1].ability.name;
    let abilityDescription = await getAbilityDescription(abilities[1].ability.url);
    document.getElementById('ability2').innerText += '\n' + abilityDescription;
  } else {
    return '';
  }
}


async function getAbilityDescription(abilityURL) {
  const ABILITY_DESCR = await fetch(abilityURL);
  const result = await ABILITY_DESCR.json();
  let abilityDescriptionTxt = '';
  for (let i = 0; i < result.effect_entries.length; i++) { // hier möchte ich eine besser schleife die do while oder while
    if (result.effect_entries[i].language.name === "en") {
      abilityDescriptionTxt = result.effect_entries[i].effect;
      //console.log(abilityDescriptionTxt);
      return abilityDescriptionTxt.replace(/[\r\f\n]+/g, " ");
    }
  }
  return 'no text';
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function block for abilities start
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function block toe get the 1st unique flavorTexts start
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function getFavorTxt() {
  //console.log(pokeSpecialTxt['flavor_text_entries'].length);
  if (pokeSpecialTxt['flavor_text_entries'].length == 0) {
    document.getElementById('info2').innerHTML = 'We have not enough data about this pokemon!'
  } else {
    let favor_txt_array = filterAndRemoveDuplicates(pokeSpecialTxt.flavor_text_entries);
    document.getElementById('info2').innerHTML = favor_txt_array[0];
    if (pokeSpecialTxt['flavor_text_entries'].length = 2) {
      document.getElementById('info2').innerHTML += "<br>" + favor_txt_array[1];
    }
  }
}

// Funktion zum Filtern der Flavor-Texte nach Sprache "en" und Entfernen von Duplikaten
function filterAndRemoveDuplicates(flavorTexts) {
  const uniqueFlavorTexts = new Set();
  flavorTexts.forEach(entry => {
    if (entry.language.name === "en") {
      uniqueFlavorTexts.add(entry.flavor_text);
    }
  });
  let myArray1 = Array.from(uniqueFlavorTexts);
  myArray1[0] = myArray1[0].replace(/[\r\f]+/g, " ");
  myArray1[1] = myArray1[1].replace(/[\r\f]+/g, " ");
  let myArray2 = [myArray1[0], myArray1[1]];
  return myArray2;
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function block toe get the 1st unique flavorTexts end
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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