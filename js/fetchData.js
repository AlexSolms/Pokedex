
async function fetchDetailData(pokeID) {
  try {
      let urlStats = `https://pokeapi.co/api/v2/pokemon/${pokeID}`;
      let responseStats = await fetch(urlStats);

      if (!responseStats.ok) {
          throw new Error(`Fehler beim Abrufen der Daten. Statuscode: ${responseStats.status}`);
      }
      pokeData.push(await responseStats.json());
  } catch (error) {
      console.error(`Fehler beim Fetchen der Daten: ${error.message}`);
  }
}
 


  async function fetchDetailCardData(pokeID) {
    try {
        let urlStats = `https://pokeapi.co/api/v2/pokemon/${pokeID}`;
        let responseStats = await fetch(urlStats);
        if (!responseStats.ok) {
            throw new Error(`Fehler beim Abrufen der Daten. Statuscode: ${responseStats.status}`);
        }
        statsData = await responseStats.json();
    } catch (error) {
        console.error(`Fehler beim Fetchen der Daten: ${error.message}`);
    }
}
  
  async function fetchDetailTxt(pokeID) {
    let urlDetailTxt = `https://pokeapi.co/api/v2/pokemon-species/${pokeID}`;
    let responsetxt = await fetch(urlDetailTxt);
    pokeSpecialTxt = await responsetxt.json();
  }
  
   async function fetchAbilityDescription(abilityURL){
    const ABILITY_DESCR = await fetch(abilityURL);
    return await ABILITY_DESCR.json();
  } 
