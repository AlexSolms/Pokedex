
let cardObj = [{ pokName: '', pokImg: '', pokType1: '', pokType2: '' }];
let startPokeID = 1;

async function fetch40Cards() {
    
    for (let i = startPokeID; i < startPokeID + 40; i++) {
        await fetchDetailData(i);
        cardObj[i] = {
            pokName: firstLetterBig(statsData.name),
            pokImg: getPicture(),
            pokType1: firstLetterBig(statsData.types[0].type.name),
            pokType2: firstLetterBig(statsData.types[1]?.type.name || statsData.types[0].type.name)
        }
    }
    //console.log(TWENTY_CARDS); 
}

async function render40Cards() {
    showLoader(); //showes loading screen
    if (startPokeID === 1) {await fetch40Cards();} //should run only when loading webpage the first time
    addDataToElementID(); //renders next 40 pokemon cards
    startPokeID = startPokeID + 40; //prepare startPokeID for the next 40 pokemon bucket
    await fetch40Cards(); // fetches the next 40 pokemon cards
    hideLoader(); //hides loading screen
}

function addDataToElementID() {
    for (let i = startPokeID; i < startPokeID + 40; i++) {
        if (i === 80) {
            debugger;
            console.log(i);
        }
        pokemonCard(i);
        document.getElementById('cardImgLeftTextOverview' + (i)).classList.add(cardObj[i].pokType1.toLowerCase() );
        document.getElementById('cardImgLeftTextOverview' + (i)).innerText = cardObj[i].pokType1;
        document.getElementById('cardImgRightTextOverview' + (i)).classList.add(cardObj[i].pokType2.toLowerCase());
        document.getElementById('cardImgRightTextOverview' + (i)).innerText = cardObj[i].pokType2;
        document.getElementById('pokeImgOverview' + (i)).src = cardObj[i].pokImg;
        document.getElementById('namePokeOverview' + (i)).innerText = cardObj[i].pokName;
    }
} 
// shows loading screen
function showLoader() {
  document.getElementById('preLoader').classList.remove('d-none');
  document.getElementById('myBody').classList.add('overflow-hidden');
}
 
// hides loading screen
function hideLoader() {
  document.getElementById('preLoader').classList.add('d-none');
  document.getElementById('myBody').classList.remove('overflow-hidden');
}

