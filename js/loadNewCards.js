// this is only for the infinite scrolling

async function loadNext40Poke() {
    if (startPokeID > 1) {
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
            console.log("entry: " + IntersectionObserverEntry);
            loadNext40Poke();
            // Hier könntest du den Observer pausieren oder entfernen, wenn du ihn nicht mehr brauchst
        }
    });
}

// Options for IntersectionObserver
const options = {
    root: null, // the viewport is the root
    rootMargin: "0px",
    threshold: 0.5, // Trigger, wenn 50% des Ziel-Elements sichtbar sind
};

// Erstelle den IntersectionObserver mit der Callback-Funktion und den Optionen
let observer = new IntersectionObserver(intersectionCallback, options);
let targetElement = document.querySelector("#end-of-page");
observer.observe(targetElement);
