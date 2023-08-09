function pokemonCard(pokemonID) {
    return document.getElementById('fourtyBucket').innerHTML += /*html*/ `
        <div id="${pokemonID}" class="card cardBorderRadius cardContent bg-dark bg-gradient text-white w100" onclick="loadDetailCard(${pokemonID})">
            <div id="idCardImgContainer" class="cardImgContainer">
                <div id="idCardImgContainerInner" class="gap-4 d-flex justify-content-between">
                    <div id="" class="besideImg">
                        <span id="cardImgLeftTextOverview${pokemonID}" class="cardLeftTypeContainer"></span>
                    </div>
                    <div>
                        <div id="idCardhead" class=" text-center">
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