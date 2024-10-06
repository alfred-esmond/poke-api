// Seleccionamos el elemento por su ID
const pokemonList = document.querySelector("#pokemon-list");

// Definimos la url base para la API de pokemon
const URL = "https://pokeapi.co/api/v2/pokemon/";

// Creamos un array para almacenar los datos de los pokemon
const pokemonData = [];

// Creamos un bucle para obtener los primeros 151
const promises = []; //cada solicitud de fetch() se almacena en esta constante
for (let i = 1; i <= 151; i++) {
  const promise = fetch(URL + i)
    // en cada vuelta solicitamos los datos a la api con fetch() y se le suma el numero a la url
    .then((response) => response.json())
    .then((data) => pokemonData.push(data)); // si se cumple se empuja a pokemonData los datos
  promises.push(promise); // agrega la promesa a la lista de promesas
}

// Esperamos que todas las promesas se resuelvan
Promise.all(promises).then(() => {
  // Los ordenamos por su ID
  pokemonData.sort((a, b) => a.id - b.id);

  // Ahora los mostramos en orden
  pokemonData.forEach((poke) => showPokemon(poke));
});

// Función para mostrar los datos de un pokemon creando un div en el HTML
function showPokemon(poke) {
  const div = document.createElement("div");
  div.classList.add("pokemon"); // Le damos una clase base para estilo

  // Añadimos otra clase mas correspondiente al tipo de pokemon
  const pokemonType = poke.types[0].type.name; // obtener el tipo del pokemon actual
  div.classList.add(pokemonType); // Añadimos la clase del tipo de pokemon para dar color a cada tipo

  // Creamos el contenido HTML dentro del div "pokemon"
  div.innerHTML = `
    <div class="back-pokeball">
      <img src="img/pokeball.png" alt="pokeball" />
    </div>

    <div class="pokemon-info">
      <div class="name-container">
        <p class="pokemon-id">#${poke.id}</p>
        <h3 class="pokemon-name">${poke.name}</h3>
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
        src="${poke.sprites.other["official-artwork"].front_default}"
        alt="${poke.name}"/>
    </div>
  `;

  // Añadimos el div creado al contenedor de pokemon en el HTML
  pokemonList.append(div);
}
