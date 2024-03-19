

/* async function fetch20Cards() {
    const fetchPromises = [];
    for (let i = startPokeID; i < startPokeID + 151 && i <= maxPokeID; i++) {
        fetchPromises.push(fetchDetailData(i + 1));
    }
    await Promise.all(fetchPromises);
    fillCardObj();
   
}
 */
async function fetchCards(cardcount) {
    const fetchPromises = [];
    for (let i = startPokeID; i < startPokeID + cardcount && i <= maxPokeID; i++) {
        fetchPromises.push(fetchDetailData(i + 1));
    }
    await Promise.all(fetchPromises);
    fillCardObj(cardcount);
   
}

function fillCardObj(cardcount){
    let k = 0;
    for (let i = startPokeID; i < startPokeID + cardcount && i <= maxPokeID; i++) {  
        statsData = pokeData[k];
         cardObj[i] = {
            pokName: firstLetterBig(statsData.name),
            pokId: statsData.id,
            pokImg: getPicture(statsData),
            pokType1: firstLetterBig(statsData.types[0].type.name),
            pokType2: firstLetterBig(statsData.types[1]?.type.name || statsData.types[0].type.name)       
        } 
        k++;
    }
    pokeData = [];
    cardObj = Object.values(cardObj).sort((a, b) => a.pokId - b.pokId);
}

async function renderCards(cardcount) {
    showLoader(cardcount); 
    await fetchCards(cardcount);  
    addDataToElementID(startPokeID, cardObj); 
    startPokeID = startPokeID + cardcount; 
    hideLoader(); 
}


async function renderNextCards(cardcount) {
    showLoader(); 
    await fetchCards(cardcount); 
    addDataToElementID(startPokeID, cardObj); 
    startPokeID = startPokeID + cardcount; 
    hideLoader(); 
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

