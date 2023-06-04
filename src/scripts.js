let pokemonRepository = (function () {
  //IIFE (private scope)
  let pokemonList = []; //empty array
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //function to get all the pokemon in the repository
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
    //load the pokemons from the api
    showLoadingMessage();
    //fetch-function, apiURL is the promise, the jsonlist is the response
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        hideLoadingMessage();
        //convert the json list into pokemon objects
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
    //to load additional details from the api
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        hideLoadingMessage();
        // adding details to the item
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

  //function to have the Names with a capitalized first letter
  function capitalizeFirstLetter(pokemon) {
    return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  }

  //function to actually add the pokemon visually to the UI
  function addListItem(pokemon) {
    let mainElement = document.querySelector("main");
    let ul = mainElement.querySelector("ul");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.classList.add(pokemon.name);
    let div = document.createElement("div");
    div.classList.add("row");
    let button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.setAttribute("aria-label", "details");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");

    button.addEventListener("click", function () {
      showDetails(pokemon);
    });

    // Load the details of the Pokemon asynchronously
    pokemonRepository.loadDetails(pokemon).then(function () {
      let imageElement = document.createElement("img");
      imageElement.src = pokemon.imageUrl;

      let nameElement = document.createElement("p");
      nameElement.innerText = capitalizeFirstLetter(pokemon);

      div.appendChild(button);
      button.appendChild(imageElement);
      button.appendChild(nameElement);
      listItem.appendChild(button);

      ul.appendChild(listItem);
    });
  }

  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    modalTitle.empty();
    modalBody.empty();

    // MODAL CONTENT
    let nameElement = $("<h1>")
      .addClass("modal-title")
      .text(pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1));
    let imageElement = $("<img class='modal-img'>");
    imageElement.attr("src", pokemon.imageUrl);
    let heightElement = $("<p>" + "Height: " + pokemon.height + "</p>");
    let weightElement = $("<p>" + "Weight: " + pokemon.weight + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);

    // Show the Bootstrap modal
    $("#modal").modal("show");
  }

  function sortByName() {
    pokemonList.sort(function (a, b) {
      // Convert the pokemon names to lowercase for case-insensitive sorting
      let nameA = a.name.toLowerCase();
      let nameB = b.name.toLowerCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
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
    capitalizeFirstLetter: capitalizeFirstLetter,
    sortByName: sortByName,
  };
})();

console.log(pokemonRepository.getAll());

//FOREACH() LOOP

pokemonRepository.loadList().then(function () {
  pokemonRepository.sortByName();
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

document.getElementById("searchButton").addEventListener("click", function () {
  let searchInput = document.querySelector("#searchInput");
  let searchValue = searchInput.value.toLowerCase();
  let listItems = document.querySelectorAll(".list-group-item");

  listItems.forEach(function (item) {
    let pokemonName = item.classList[1]; // Assuming the pokemon name is the second class

    if (pokemonName.includes(searchValue)) {
      item.style.display = "block"; // Show the list item
    } else {
      item.style.display = "none"; // Hide the list item
    }
  });
});

document.getElementById("resetButton").addEventListener("click", function () {
  pokemonRepository.sortByName();
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
