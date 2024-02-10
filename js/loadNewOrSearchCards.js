//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// infinit load function start
// comment: break if end of loadeable pokemon needs to be implemented
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
async function loadNext20Poke() {
    if (startPokeID > 1 && blockAddNewCardsForSearch === false) {
       // debugger;
        const newContent = await render20Cards();
        if (newContent != undefined) {
            document.getElementById("fourtyBucket").insertAdjacentHTML("beforeend", newContent);
        }
    }
}

function intersectionCallback(entries, observer) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            loadNext20Poke();
        }
    });
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// infinit load function end
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//~~~~~~~~~~~~~~~~~~~~~~~~~
// search function start
//~~~~~~~~~~~~~~~~~~~~~~~~~
function searchPokemon() {
    let search = document.getElementById('searchInput').value;
    search = search.toLowerCase();
    if (search === '') {home();} 
    else { searchFunction(search);}
}

function searchFunction(search) {
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
        addDataToElementID(0, searchCardObj);
}

function home() {
    blockAddNewCardsForSearch = false;
    for (let i = 0; i < cardObj.length - 40; i++) {
        searchCardObj[i] = cardObj[i];
    }
    document.getElementById('fourtyBucket').innerHTML = '';
    addDataToElementID(0, searchCardObj);
}
//~~~~~~~~~~~~~~~~~~~~~~~~~
// search function end
//~~~~~~~~~~~~~~~~~~~~~~~~~
