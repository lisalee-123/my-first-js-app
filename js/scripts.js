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
  function add() {
    pokemonList.push(pokemon);
  }
  return {
    getAll: getAll,
    add: add,
  };
})();

console.log(pokemonRepository.getAll());

document.write("<div><h1> Pokemon </h1></div>");

function printArrayDetails(list) {
  list.forEach(function (pokemon) {
    //pokemon argument replaces the list[i]
    document.write(
      "<div class='pokemonList_Item'><p>" +
        pokemon.name +
        " (height: " +
        pokemon.height +
        "m) </p></div>"
    );
    if (pokemon.height > 0.6) {
      document.write(
        "<div class='pokemonList_Item'><p> - Wow, that's big! </p></div>"
      );
    }
  });
}

printArrayDetails(pokemonRepository.getAll()); // list in the function becomes the argument I put in
