function pokemonCard(pokemonID) {
    return document.getElementById('fourtyBucket').innerHTML += /*html*/ `
        <div id="${pokemonID}" role="button" class="pokemon-card card cardBorderRadius cardContent bg-dark bg-gradient text-white w100" onclick="loadDetailCard(${pokemonID})">
            <div id="" class="">
                <div id="" class="gap-4 d-flex justify-content-between">
                    <div id="" class="besideImg">
                        <span id="cardImgLeftTextOverview${pokemonID}" class="cardLeftTypeContainer"></span>
                    </div>
                    <div class="cardBetweenBorders">
                        <div id="" class=" text-center">
                            <h3 class="pokeName" id="namePokeOverview${pokemonID}"></h3>
                        </div>
                        <div class="d-flex align-items-center">
                            <img id="pokeImgOverview${pokemonID}" class="card-img Cardimg" src="" alt="">
                        </div>
                    </div>
                    <div id="" class="besideImg"> 
                        <span id="cardImgRightTextOverview${pokemonID}" class="cardRightTypeContainer"></span>
                    </div>
                </div>
            </div>
        </div>`
}

function impressum() {
    blockAddNewCardsForSearch = true;
    //document.getElementById('fourtyBucket').innerHTML = '';
    let impressum = document.getElementById('fourtyBucket').innerHTML = /*html*/`
    <div class="Impressum flex justify-content-center mt-5 text-light">
        <h1>Impressum and Privacy Statement</h1>
        <p> Alexander Solms <br>
            Lößniger Str.15 <br>
            04275 Leipzig
        </p>

        <h2>Privacy Statement</h2>
        <p>No data (such as measured values, status, etc.) are saved.</p>

    </div>
    `
return impressum;
    
}