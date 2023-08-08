async function fetchDetailData(pokemonNr) {
    let urlStats = `https://pokeapi.co/api/v2/pokemon/${pokemonNr}`;
    let responseStats = await fetch(urlStats);
    statsData = await responseStats.json();
  }
  
  
  async function fetchDetailTxt(pokemonNr) {
    let urlDetailTxt = `https://pokeapi.co/api/v2/pokemon-species/${pokemonNr}`;
    let responsetxt = await fetch(urlDetailTxt);
    pokeSpecialTxt = await responsetxt.json();
  }
  
  async function loadForTests() {
    let urlDetailTxt = `https://pokeapi.co/api/v2/ability/`;
    let responsetxt = await fetch(urlDetailTxt);
    return await responsetxt.json();
  }

  async function fetchAbilityDescription(abilityURL){
    const ABILITY_DESCR = await fetch(abilityURL);
    return await ABILITY_DESCR.json();
  } 