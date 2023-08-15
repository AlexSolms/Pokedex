
async function loadDetailCard(numberPoke) {
  await fetchDetailData(numberPoke);
  await fetchDetailTxt(numberPoke);
  pokemonNr = numberPoke;
  cardHtml();
  document.getElementById('detailCard').classList.remove('d-none');
  document.getElementById('myBody').classList.add('overflow-hidden');
}


function cardHtml() {
  document.getElementById('namePoke').innerText = firstLetterBig(statsData.name);
  typeBorders('cardImgLeftText', 'cardImgRightText');
  openSelectedInfo(1); //default call
  getFavorTxt();
  getPokeAbility(statsData.abilities);
  getHeightAndWeight();
  document.getElementById('pokeImg').src = getPicture();
  createPolarAreaChart();// Calles the createPolarAreaChart function to generate the chart
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
    if (!document.getElementById('menu' + i).classList.contains('d-none')){
      document.getElementById('menu' + i).classList.add('d-none');
      document.getElementById('infoBtn' + i).classList.remove('infoBtnActive');
    }
   }
  document.getElementById('menu' + number).classList.remove('d-none');
  document.getElementById('infoBtn' + number).classList.add('infoBtnActive');
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function block for left and right img border start
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


function nextPokemon() {
  if (blockAddNewCardsForSearch === true) {
    let index = searchCardObj.findIndex(pokemon => pokemon.pokId === pokemonNr);
    index++;
    index = (index === searchCardObj.length) ? 0 : index;
    loadDetailCard(searchCardObj[index].pokId);
  } else {
    pokemonNr++;
    if (pokemonNr > 1010) { pokemonNr = 1 }
    loadDetailCard(pokemonNr);
  }
}


function prevPokemon() {
  if (blockAddNewCardsForSearch === true) {
    let index = searchCardObj.findIndex(pokemon => pokemon.pokId === pokemonNr);
    index--;
    index = (index < 0) ? (searchCardObj.length - 1) : index;
    loadDetailCard(searchCardObj[index].pokId);
  } else {
    pokemonNr--;
    if (pokemonNr < 1) { pokemonNr = 1010 }
    loadDetailCard(pokemonNr);
  }
}

function typeBorders(leftID, rightID) {
  leftRightBorder(statsData.types, statsData.types.length, rightID);
  leftRightBorder(statsData.types, statsData.types.length, leftID);
}


function leftRightBorder(pokeType, length, leftOrRightID) {
  if (length > 1 && leftOrRightID === 'cardImgRightText') {
    dataForBorder(pokeType, leftOrRightID, 1);
  }
  else {
    dataForBorder(pokeType, leftOrRightID, 0);
  }
}

function dataForBorder(pokeType, leftOrRightID, eleNr) {
  document.getElementById(leftOrRightID).className = '';
  document.getElementById(leftOrRightID).classList.add(pokeType[eleNr].type.name, 'typeContainer');
  document.getElementById(leftOrRightID).innerText = pokeType[eleNr].type.name;
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function block for left and right img border end
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function block for pysical informations start
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function getHeightAndWeight() {
  document.getElementById('pokeHeight').innerText = 'Height: ' + (statsData.height * 10) + 'cm';
  document.getElementById('pokeWeight').innerText = 'Weight: ' + (statsData.weight / 10) + 'kg';
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function block for pysical informations end
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function block for abilities start
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function getPokeAbility(abilities) {
  if (abilities[0]) {
    dataForAbilities(abilities, 0);
  }
  if (abilities[1]) {
    dataForAbilities(abilities, 1);
  } else {
    return '';
  }
}

async function dataForAbilities(abilities, arrNr) {
  document.getElementById('ability' + (arrNr + 1)).innerHTML = `<h5 class='abiliHead'>${abilities[arrNr].ability.name}</h5>`;
  let abilityDescription = await getAbilityDescription(abilities[arrNr].ability.url);
  document.getElementById('ability' + (arrNr + 1)).innerHTML +=  `<p class="abiliText">${abilityDescription}</p>`;
}


async function getAbilityDescription(abilityURL) {
  const result = await fetchAbilityDescription(abilityURL);
  let abilityDescriptionTxt = '';
  for (let i = 0; i < result.effect_entries.length; i++) { 
    if (result.effect_entries[i].language.name === "en") {
      abilityDescriptionTxt = result.effect_entries[i].effect;
      return abilityDescriptionTxt.replace(/[\r\f\n]+/g, " ");
    }
  }
  return 'We do not know anything about this ability.\nPlease help us to collect data!\n As soon you meet this Pokemon your Pokedex will record.';
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


window.onclick = function (event) {
  const POPUP = document.getElementById('detailCard');
  //console.log('klicket');
  if (event.target == POPUP) {
    console.log('in idCardContent geklicket');
    document.getElementById('detailCard').classList.add('d-none');
    document.getElementById('myBody').classList.remove('overflow-hidden');
  }
}

function hideDetailCard() {
  document.getElementById('detailCard').classList.add('d-none');
  document.getElementById('myBody').classList.remove('overflow-hidden');
}
