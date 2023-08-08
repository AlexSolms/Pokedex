
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
    await fetch40Cards();
    addDataToElementID();
    
    startPokeID = startPokeID + 40;
    await fetch40Cards();
    hideLoader(); //hides loading screen
}

function addDataToElementID() {
    for (let i = startPokeID; i < startPokeID + 40; i++) {
        pokemonCard(i);
        document.getElementById('cardImgLeftTextOverview' + (i)).classList.add(cardObj[i].pokType1.toLowerCase() );
        document.getElementById('cardImgLeftTextOverview' + (i)).innerText = cardObj[i].pokType1;
        document.getElementById('cardImgRightTextOverview' + (i)).classList.add(cardObj[i].pokType2.toLowerCase());
        document.getElementById('cardImgRightTextOverview' + (i)).innerText = cardObj[i].pokType2;
        document.getElementById('pokeImgOverview' + (i)).src = cardObj[i].pokImg;
        document.getElementById('namePokeOverview' + (i)).innerText = cardObj[i].pokName;
    }
}
// Funktion, um den Ladebildschirm einzublenden
function showLoader() {
  document.getElementById('preLoader').style.display = 'block';
}

// Funktion, um den Ladebildschirm auszublenden
function hideLoader() {
  document.getElementById('preLoader').style.display = 'none';
}

function showNext40Poke() {
    
}