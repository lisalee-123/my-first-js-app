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

    pokemonRepository.getAll().forEach(function (pokemon) {
      let listItem = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button");
      listItem.appendChild(button);
      ul.appendChild(listItem);
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
  };
})();

console.log(pokemonRepository.getAll());

document.write("<div><h1> Pokemon </h1></div>");
//FOREACH() instead of FOR LOOP

function printArrayDetails(list) {
  let ul = document.querySelector("ul");

  //list = Array of Objects to be displayed
  list.forEach(function (pokemon) {
    //pokemon argument replaces the list[i]
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("selected");
    listItem.appendChild(button);
    ul.appendChild(listItem);
    addListItem(pokemon);
  });
}

printArrayDetails(pokemonRepository.getAll());

pokemonRepository.add({
  name: "New Pokemon",
  height: 100,
  types: ["New Type"],
});

pokemonRepository.add(10); //Error Message, because a number got passed instead of an Object
pokemonRepository.add("String-Pokemon"); //Error Message because a string got passed

printArrayDetails(pokemonRepository.getAll());

pokemonRepository.add({
  firstName: "New Pokemon",
  size: 100,
  types: ["New Type"],
});
