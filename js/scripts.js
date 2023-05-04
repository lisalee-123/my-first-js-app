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

for (i = 0; i < pokemonList.length; i++) {
  document.write(
    pokemonList[i].name + " (height: " + pokemonList[i].height + ") </br>" //html within string to write in a new line
  ); //loop through all pokemons and add text & spacing
  if (pokemonList[i].height > 0.6) {
    //conditional statemement added
    document.write(" - Wow, that's big!</br> </br>");
  }
}
