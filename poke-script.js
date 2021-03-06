

/**CATÁLOGO FEED POKEMONS 151 */


const poke_container = document.getElementById("poke_main_container");
const pokemons_number = 151;

const getFeedPoke = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getPokemonsId(i);
  }
};

const getPokemonsId = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemonfeed = await res.json();

  createPokemonFeedCards(pokemonfeed);
};

const createPokemonFeedCards = (pokemonfeed) => {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemonfeed");
  const { id, name, sprites, types } = pokemonfeed;
  const type = types[0].type.name;
  const pokeInnerHTML = `<div class="img-feed-container"> <img src="${sprites.other.dream_world.front_default}"/>
  </div>
  <div class="infoFeed">
  <span class="numberFeed">id # ${id}</span>
  <h3 class="nameFeed">${name}</h3>
  <div class="typeMain">${type}</div>
  </div>`;
  pokemonEl.innerHTML = pokeInnerHTML;
  poke_feed_container.appendChild(pokemonEl);
};

getFeedPoke();


//** BUSCADOR (EN TODA LA API) */
const pokeCard$$ = document.querySelector("[data-container]");
const pokeName$$ = document.querySelector("[data-container-name]");
const pokeImgCont$$ = document.querySelector("[data-container-img]");
const pokeImg$$ = document.querySelector(".img-pkm");
const pokeId$$ = document.querySelector("[data-container-id]");
const pokeTypo$$ = document.querySelector("[data-container-types]");
const pokeStats$$ = document.querySelector("[data-container-stats]");


const searchPoke = (event) => {
  event.preventDefault();
  const { value } = event.target.pokemon;
  fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then((data) => data.json())
    .then((res) => getPokemonData(res));
};

const getPokemonData = (data) => {
  const img = data.sprites.other.dream_world.front_default;
  console.log(img);
  const { types  } = data;
  console.log(data);

  pokeName$$.textContent = data.name;
  pokeImg$$.setAttribute("src", img);
  pokeId$$.textContent = `Nº ${data.id}`;

  getPokemonTypes(types);
  /**getPokemonStats(stats);**/
};

const getPokemonTypes = (types) => {
  pokeTypo$$.innerHTML = "";
  types.forEach((type) => {
    const typoElement = document.createElement("div");
    typoElement.textContent = type.type.name;
    pokeTypo$$.appendChild(typoElement);
  });
};
/**const getPokemonStats = (stats) => {
  pokeStats$$.innerHTML = "";
  stats.forEach((stat) => {
    const statsElement = document.createElement("div");
    const statsElementN = document.createElement("div");
    const statsElementCant = document.createElement("div");
    statsElementN.textContent = stats.stat.name;
    statsElementCant.textContent = stats.base_stat;
    statsElement.appendChild(statsElementN);
    statsElement.appendChild(statsElementCant);
    pokeStats.appendChild(statsElement);
  });
};**/