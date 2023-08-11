async function fetchDetailData(pokeID) {
    let urlStats = `https://pokeapi.co/api/v2/pokemon/${pokeID}`;
    let responseStats = await fetch(urlStats);
    statsData = await responseStats.json();
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
