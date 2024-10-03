const pokemonList = document.querySelector("#pokemon-list");

// Definimos la URL base para la API de Pokémon
let URL = "https://pokeapi.co/api/v2/pokemon/";

// Creamos un array para almacenar los datos de los Pokémon
let pokemonData = [];

// Creamos un bucle para obtener los primeros 151 Pokémon
let promises = [];
for (let i = 1; i <= 151; i++) {
  const promise = fetch(URL + i)
    .then((response) => response.json())
    .then((data) => pokemonData.push(data));  // Almacenamos cada Pokémon en el array
  promises.push(promise);
}

// Esperamos que todas las promesas se resuelvan
Promise.all(promises).then(() => {
  // Ordenamos los Pokémon por su ID
  pokemonData.sort((a, b) => a.id - b.id);
  
  // Ahora mostramos los Pokémon en orden
  pokemonData.forEach((poke) => showPokemon(poke));
});

// Función para mostrar los datos de un Pokémon en el HTML
function showPokemon(poke) {
  const div = document.createElement("div");
  div.classList.add("pokemon"); // Le damos una clase base para estilo

  // Añadimos la clase correspondiente al tipo de Pokémon
  const pokemonType = poke.types[0].type.name;
  div.classList.add(pokemonType);  // Añadimos la clase del tipo de Pokémon

  // Creamos el contenido HTML dentro del div para el Pokémon
  div.innerHTML = `
    <div class="back-pokeball">
      <img src="img/pokeball.png" alt="pokeball" />
    </div>

    <div class="pokemon-info">
      <div class="name-container">
        <p class="pokemon-id">#${poke.id}</p>
        <h2 class="pokemon-name">${poke.name}</h2>
      </div>
      
      <div class="pokemon-types">
        <p class="type">${poke.types[0].type.name}</p>
      </div>
      
      <div class="pokemon-stats">
        <p class="height">${poke.height * 10}cm</p>
        <p class="weight">${poke.weight / 10}kg</p>
      </div>
    </div>

    <div class="pokemon-img">
      <img
        src="${poke.sprites.other['official-artwork'].front_default}"
        alt="${poke.name}"/>
    </div>
  `;

  // Añadimos el div creado al contenedor de Pokémon en el HTML
  pokemonList.append(div);
}
