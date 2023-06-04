let pokemonRepository = (function () {
  let e = [];
  function t() {
    return e;
  }
  function o() {
    let e = document.createElement("p");
    (e.textContent = "Details loading..."),
      (e.id = "loading-message"),
      document.body.prepend(e);
  }
  function n() {
    let e = document.querySelector("p");
    document.body.removeChild(e);
  }
  function a(t) {
    "object" == typeof t && Object.keys(t).includes("name")
      ? e.push(t)
      : console.log(
          "Error: only objects can be added that have name, height & type properties can be added to the Repository"
        );
  }
  function i(e) {
    return (
      o(),
      fetch(e.detailsUrl)
        .then(function (e) {
          return e.json();
        })
        .then(function (t) {
          n(),
            (e.imageUrl = t.sprites.front_default),
            (e.height = t.height),
            (e.types = t.types),
            (e.id = t.id),
            (e.weight = t.weight);
        })
        .catch(function (e) {
          n(), console.error(e);
        })
    );
  }
  function l(e) {
    i(e).then(function () {
      s(e);
    });
  }
  function r(e) {
    return e.name.charAt(0).toUpperCase() + e.name.slice(1);
  }
  function s(e) {
    let t = $(".modal-body"),
      o = $(".modal-title");
    $(".modal-header"), o.empty(), t.empty();
    let n = $("<h1>")
        .addClass("modal-title")
        .text(e.name.charAt(0).toUpperCase() + e.name.slice(1)),
      a = $("<img class='modal-img'>");
    a.attr("src", e.imageUrl);
    let i = $("<p>Height: " + e.height + "</p>"),
      l = $("<p>Weight: " + e.weight + "</p>");
    o.append(n),
      t.append(a),
      t.append(i),
      t.append(l),
      $("#modal").modal("show");
  }
  return {
    getAll: t,
    add: a,
    addListItem: function e(t) {
      let o = document.querySelector("main").querySelector("ul"),
        n = document.createElement("li");
      n.classList.add("list-group-item"), n.classList.add(t.name);
      let a = document.createElement("div");
      a.classList.add("row");
      let i = document.createElement("button");
      i.classList.add("btn"),
        i.classList.add("btn-primary"),
        i.setAttribute("aria-label", "details"),
        i.setAttribute("data-toggle", "modal"),
        i.setAttribute("data-target", "#exampleModal"),
        i.addEventListener("click", function () {
          l(t);
        }),
        pokemonRepository.loadDetails(t).then(function () {
          let e = document.createElement("img");
          e.src = t.imageUrl;
          let l = document.createElement("p");
          (l.innerText = r(t)),
            a.appendChild(i),
            i.appendChild(e),
            i.appendChild(l),
            n.appendChild(i),
            o.appendChild(n);
        });
    },
    showDetails: l,
    loadList: function e() {
      return (
        o(),
        fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
          .then(function (e) {
            return e.json();
          })
          .then(function (e) {
            n(),
              e.results.forEach(function (e) {
                a({ name: e.name, detailsUrl: e.url });
              });
          })
          .catch(function (e) {
            n(), console.error(e);
          })
      );
    },
    loadDetails: i,
    showLoadingMessage: o,
    hideLoadingMessage: n,
    showModal: s,
    capitalizeFirstLetter: r,
    sortByName: function t() {
      e.sort(function (e, t) {
        let o = e.name.toLowerCase(),
          n = t.name.toLowerCase();
        return o < n ? -1 : o > n ? 1 : 0;
      });
    },
  };
})();
console.log(pokemonRepository.getAll()),
  pokemonRepository.loadList().then(function () {
    pokemonRepository.sortByName(),
      pokemonRepository.getAll().forEach(function (e) {
        pokemonRepository.addListItem(e);
      });
  }),
  document
    .getElementById("searchButton")
    .addEventListener("click", function () {
      let e = document.querySelector("#searchInput").value.toLowerCase();
      document.querySelectorAll(".list-group-item").forEach(function (t) {
        t.classList[1].includes(e)
          ? (t.style.display = "block")
          : (t.style.display = "none");
      });
    }),
  document.getElementById("resetButton").addEventListener("click", function () {
    pokemonRepository.sortByName(),
      pokemonRepository.getAll().forEach(function (e) {
        pokemonRepository.addListItem(e);
      });
  });
