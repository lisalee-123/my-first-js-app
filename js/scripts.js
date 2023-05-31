let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function getAll() {
    return pokemonList;
  }

  function showLoadingMessage() {
    let loadingMessage = document.createElement("p");
    loadingMessage.textContent = "Details loading...";
    loadingMessage.id = "loading-message";
    document.body.prepend(loadingMessage);
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
        item.id = details.id;
        item.weight = details.weight;
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

    // Load the details of the Pokemon asynchronously
    pokemonRepository.loadDetails(pokemon).then(function () {
      let image = document.createElement("img");
      image.src = pokemon.imageUrl;

      let nameElement = document.createElement("p");
      nameElement.classList.add("modal-title");

      nameElement.innerText = capitalizeFirstLetter(pokemon);
      button.addEventListener("click", function () {
        showDetails(pokemon);
      });
      button.classList.add("button");

      button.appendChild(image);
      button.appendChild(nameElement);
    });

    listItem.appendChild(button);
    ul.appendChild(listItem);
  }

  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $("modal-header");

    modalTitle.empty(); //instead of modalContainer.innerHTML = " ";
    modalBody.empty();
    //MODAL CONTENT
    let nameELement = $("<h1>" + pokemon.name + "</h1>"); //creating element in modal content
    let imageElement = $('<img class="modal-img" style="wisth:50%"');
    imageElement.attr("src", pokemon.imageUrl);
    let heightElement = $("<p>" + "height: " + pokemon.height + "</p>");
    let weightElement = $("<p>" + "weight: " + pokemon.weight + "</p");
    let typesElement = $("<p>" + "types: " + pokemon.types + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
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

//FOREACH() LOOP

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
