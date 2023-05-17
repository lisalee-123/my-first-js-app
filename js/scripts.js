let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function getAll() {
    return pokemonList;
  }

  function showLoadingMessage() {
    let loadingMessage = document.createElement("p");
    loadingMessage.textContent = "Details loading...";
    document.body.appendChild(loadingMessage);
  }

  function hideLoadingMessage() {
    let loadingMessage = document.querySelector("p");
    document.body.removeChild(loadingMessage);
  }

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      Object.keys(pokemon).includes("name") //&&
      //Object.keys(pokemon).includes("height") &&
      //Object.keys(pokemon).includes("types")
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log(
        "Error: only objects can be added that have name, height & type properties can be added to the Repository"
      );
    }
  }

  function loadList() {
    showLoadingMessage();
    //fetch-function, apiURL is the promise, the jsonlist is the response
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        hideLoadingMessage();
        //convert the json list into our objects
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        hideLoadingMessage();
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function addListItem(pokemon) {
    let ul = document.querySelector("ul");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    (button.innerText = pokemon.name),
      button.addEventListener("click", function () {
        showDetails(pokemon);
      });
    button.classList.add("button");
    listItem.appendChild(button);
    ul.appendChild(listItem);
  }

  function showModal(pokemon) {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.innerHTML = " ";

    let modal = document.createElement("div");
    modal.classList.add("modal");
    // MODAL CONTENT
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";

    let titleElement = document.createElement("h1");
    titleElement.innerText = pokemon.name;

    let contentElement1 = document.createElement("p");
    contentElement1.innerText = "Height: " + pokemon.height + "m";

    let contentElement2 = document.createElement("p");
    contentElement2.innerText = "Types: " + pokemon.types.join(",");

    let imgElement = document.createElement("img");
    imgElement.classList.add("image");
    imgElement.src = pokemon.imageURL;
    imgElement.alt = pokemon.name;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement1);
    modal.appendChild(contentElement2);
    modal.appendChild(imgElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
    showModal: showModal,
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

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
