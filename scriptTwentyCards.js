
let TWENTY_CARDS = [{ pokName: '', pokImg: '', pokType1: '', pokType2: '' }];
let startPokeID = 1;

async function fetch40Cards() {

    for (let i = startPokeID; i < startPokeID + 40; i++) {
        await fetchDetailData(i);
        TWENTY_CARDS[i] = {
            pokName: firstLetterBig(statsData.name),
            pokImg: getPicture(),
            pokType1: firstLetterBig(statsData.types[0].type.name),
            pokType2: firstLetterBig(statsData.types[1]?.type.name || statsData.types[0].type.name)
        }
    }
    console.log(TWENTY_CARDS);
}

async function render40Cards() {
    await fetch40Cards();
    for (let i = startPokeID; i < startPokeID + 40; i++) {
        await pokemonCard(i);
        document.getElementById('cardImgLeftTextOverview' + (i)).classList.add(TWENTY_CARDS[i].pokType1.toLowerCase() );
        document.getElementById('cardImgLeftTextOverview' + (i)).innerText = TWENTY_CARDS[i].pokType1;
        document.getElementById('cardImgRightTextOverview' + (i)).classList.add(TWENTY_CARDS[i].pokType2.toLowerCase());
        document.getElementById('cardImgRightTextOverview' + (i)).innerText = TWENTY_CARDS[i].pokType2;
        document.getElementById('pokeImgOverview' + (i)).src = TWENTY_CARDS[i].pokImg;
        document.getElementById('namePokeOverview' + (i)).innerText = TWENTY_CARDS[i].pokName;
    }
    startPokeID = startPokeID + 20;
    await fetch40Cards();
}