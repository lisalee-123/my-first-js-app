let pokemonRepository = (function () {
  let e = [];
  function t() {
    return e;
  }
  function n() {
    let e = document.createElement("p");
    (e.textContent = "Details loading..."),
      (e.id = "loading-message"),
      document.body.prepend(e);
  }
  function o() {
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
      n(),
      fetch(e.detailsUrl)
        .then(function (e) {
          return e.json();
        })
        .then(function (t) {
          o(),
            (e.imageUrl = t.sprites.front_default),
            (e.height = t.height),
            (e.types = t.types),
            (e.id = t.id),
            (e.weight = t.weight);
        })
        .catch(function (e) {
          o(), console.error(e);
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
      n = $(".modal-title");
    $(".modal-header"), n.empty(), t.empty();
    let o = $("<h1>")
        .addClass("modal-title")
        .text(e.name.charAt(0).toUpperCase() + e.name.slice(1)),
      a = $("<img class='modal-img'>");
    a.attr("src", e.imageUrl);
    let i = $("<p>Height: " + e.height + "</p>"),
      l = $("<p>Weight: " + e.weight + "</p>");
    n.append(o),
      t.append(a),
      t.append(i),
      t.append(l),
      $("#modal").modal("show");
  }
  return {
    getAll: t,
    add: a,
    addListItem: function e(t) {
      let n = document.querySelector("main"),
        o = document.querySelector("ul"),
        a = document.createElement("li");
      a.classList.add("list-group-item"), a.classList.add(t.name);
      let i = document.createElement("div");
      i.classList.add("row");
      let s = document.createElement("button");
      s.classList.add("btn"),
        s.classList.add("btn-primary"),
        s.setAttribute("aria-label", "details"),
        s.setAttribute("data-toggle", "modal"),
        s.setAttribute("data-target", "#exampleModal"),
        s.addEventListener("click", function () {
          l(t);
        }),
        pokemonRepository.loadDetails(t).then(function () {
          let e = document.createElement("img");
          e.src = t.imageUrl;
          let l = document.createElement("p");
          (l.innerText = r(t)),
            n.appendChild(o),
            i.appendChild(s),
            s.appendChild(e),
            s.appendChild(l),
            a.appendChild(s),
            n.appendChild(a);
        });
    },
    showDetails: l,
    loadList: function e() {
      return (
        n(),
        fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
          .then(function (e) {
            return e.json();
          })
          .then(function (e) {
            o(),
              e.results.forEach(function (e) {
                a({ name: e.name, detailsUrl: e.url });
              });
          })
          .catch(function (e) {
            o(), console.error(e);
          })
      );
    },
    loadDetails: i,
    showLoadingMessage: n,
    hideLoadingMessage: o,
    showModal: s,
    capitalizeFirstLetter: r,
    sortByName: function t() {
      e.sort(function (e, t) {
        let n = e.name.toLowerCase(),
          o = t.name.toLowerCase();
        return n < o ? -1 : n > o ? 1 : 0;
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
    });
