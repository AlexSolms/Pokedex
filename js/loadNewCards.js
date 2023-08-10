// this is only for the infinite scrolling

async function loadNext40Poke() {
    if (startPokeID > 1 && blockAddNewCardsForSearch === false) {
       // debugger;
        const newContent = await render40Cards();
        if (newContent != undefined) {
            document.getElementById("fourtyBucket").insertAdjacentHTML("beforeend", newContent);
        }
    }
}

function intersectionCallback(entries, observer) {
    //console.log("entries: " + entries);
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            // console.log("entry: " + entry);
            //console.log("entry: " + IntersectionObserverEntry);
            loadNext40Poke();
            // Hier könntest du den Observer pausieren oder entfernen, wenn du ihn nicht mehr brauchst
        }
    });
}

function searchPokemon() {
    let search = document.getElementById('searchInput').value;
    search = search.toLowerCase();
    //console.log(search);
    if (search === '') { //for blocking the adding of new cards while srolling during the search
        blockAddNewCardsForSearch = false;
        for (let i = 0; i < cardObj.length - 40; i++) {
            searchCardObj[i] = cardObj[i];
        }
        console.log(searchCardObj);
        document.getElementById('fourtyBucket').innerHTML = '';
        addDataToElementID(0, searchCardObj);
    } else {
        blockAddNewCardsForSearch = true;
        searchCardObj = [];
        document.getElementById('fourtyBucket').innerHTML = '';
        let searchIndex = 0;
        for (let i = 0; i < cardObj.length; i++) {

            if (cardObj[i].pokName.toLowerCase().includes(search)) {
                searchCardObj[searchIndex] = cardObj[i];
                searchIndex++;
            }
        }
        console.log(searchCardObj);
        addDataToElementID(0, searchCardObj);
    }

}
