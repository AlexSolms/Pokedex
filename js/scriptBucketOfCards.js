

async function fetch40Cards() {
    for (let i = startPokeID; i < startPokeID + 40; i++) {
        await fetchDetailData(i + 1);
        cardObj[i] = {
            pokName: firstLetterBig(statsData.name),
            pokId: statsData.id,
            pokImg: getPicture(),
            pokType1: firstLetterBig(statsData.types[0].type.name),
            pokType2: firstLetterBig(statsData.types[1]?.type.name || statsData.types[0].type.name)
        }
    }
}

async function render40Cards() {

    showLoader(); //showes loading screen
    if (startPokeID === 0) { await fetch40Cards(); } //should run only when loading webpage the first time
    addDataToElementID(startPokeID, cardObj); //renders next 40 pokemon cards
    startPokeID = startPokeID + 40; //prepare startPokeID for the next 40 pokemon bucket
    await fetch40Cards(); // fetches the next 40 pokemon cards
    hideLoader(); //hides loading screen
}

function addDataToElementID(startNr, myCardArr) { 
    for (let i = startNr; i < myCardArr.length; i++) { 
        pokemonCard(myCardArr[i].pokId);
        document.getElementById('cardImgLeftTextOverview' + myCardArr[i].pokId).classList.add(myCardArr[i].pokType1.toLowerCase());
        document.getElementById('cardImgLeftTextOverview' + myCardArr[i].pokId).innerText = myCardArr[i].pokType1;
        document.getElementById('cardImgRightTextOverview' + myCardArr[i].pokId).classList.add(myCardArr[i].pokType2.toLowerCase());
        document.getElementById('cardImgRightTextOverview' + myCardArr[i].pokId).innerText = myCardArr[i].pokType2;
        document.getElementById('pokeImgOverview' + myCardArr[i].pokId).src = myCardArr[i].pokImg;
        document.getElementById('namePokeOverview' + myCardArr[i].pokId).innerText = myCardArr[i].pokName;
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

