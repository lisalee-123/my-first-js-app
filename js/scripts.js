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
];

let pokemonList2 = [
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

document.write("<div><h1> Pokemon </h1></div>");

function printArrayDetails(list) {
  //list = function parameter => placeholder
  for (let i = 0; i < list.length; i++) {
    document.write(
      "<div class='pokemonList_Item'><p>" +
        list[i].name +
        " (height: " +
        list[i].height +
        "m) </p></div>" //html within string to display as paragraph
    ); //loop through all pokemons and add text & spacing
    if (list[i].height > 0.6) {
      //conditional statemement added
      document.write(
        "<div class='pokemonList_Item'><p> - Wow, that's big! </p></div>"
      );
    }
  }
}

printArrayDetails(pokemonList2); // pokemonList2 is now an argument that gets passed onto the funtion
printArrayDetails(pokemonList); // list in the function becomes the argument I put in
