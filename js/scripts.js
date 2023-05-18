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

  function capitalizeFirstLetter(pokemon) {
    return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  }

  function addListItem(pokemon) {
    let ul = document.querySelector("ul");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    (button.innerText = capitalizeFirstLetter(pokemon)),
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
    modalContainer.addEventListener("click", (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

    let modal = document.createElement("div");
    modal.classList.add("modal");
    // MODAL CONTENT
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "X";
    closeButtonElement.addEventListener("click", hideModal);

    let imgElement = document.createElement("img");
    imgElement.classList.add("image");
    imgElement.src = pokemon.imageUrl;
    imgElement.alt = pokemon.name;

    let titleElement = document.createElement("h1");
    titleElement.classList.add("modal-title");
    titleElement.innerText = capitalizeFirstLetter(pokemon);

    let contentElement1 = document.createElement("p");
    contentElement1.classList.add("modal-content");
    contentElement1.innerText = "Height: " + pokemon.height + "m";

    modal.appendChild(closeButtonElement);
    modal.appendChild(imgElement);

    modal.appendChild(titleElement);
    modal.appendChild(contentElement1);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
  }

  function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

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
    hideModal: hideModal,
    capitalizeFirstLetter: capitalizeFirstLetter,
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
