let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Bulbasaur",
      height: 0.7,
      types: ["Monster", "Grass"],
    },
    {
      name: "Charmander",
      height: 0.6,
      types: ["Fire"],
    },
    {
      name: "Caterpie",
      height: 0.3,
      types: ["Bug"],
    },
    {
      name: "Pidgey",
      height: 0.3,
      types: ["Flying", "Normal"],
    },
    {
      name: "Rattata",
      height: 0.3,
      types: ["Fire"],
    },
    {
      name: "Ekans",
      height: 2,
      types: ["Poison"],
    },
  ];
  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      Object.keys(pokemon).includes("name") &&
      Object.keys(pokemon).includes("height") &&
      Object.keys(pokemon).includes("types")
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log(
        "Error: only objects can be added that have name, height & type properties can be added to the Repository"
      );
    }
  }

  function addListItem(pokemon) {
    let ul = document.querySelector("ul");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button");
    listItem.appendChild(button);
    ul.appendChild(listItem);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
  };
})();

console.log(pokemonRepository.getAll());

pokemonRepository.add({
  name: "New Pokemon",
  height: 100,
  types: ["New Type"],
});

console.log(pokemonRepository.getAll());

//FOREACH() LOOP

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});

//OLD FUNCTION THAT WORKS
/*function printArrayDetails(pokemons) {
  pokemons.forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
}

pokemonRepository.add(10); //Error Message, because a number got passed instead of an Object
pokemonRepository.add("String-Pokemon"); //Error Message because a string got passed

printArrayDetails(pokemonRepository.getAll()); */
