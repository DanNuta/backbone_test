import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";
import { Animal } from "../model";
import $ from "jquery";
import underscore from "underscore";
import Backbone from "backbone";

document.querySelector("#app").innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1 id="vite">Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector("#counter"));

// const newData = new FetchData();

// const response = newData.fetch({
//   success: (model, response) => {
//     console.log(model, "success");
//   },
//   error: (model, response) => {
//     console.log(response, "error");
//   },
// });

const cat = new Animal({
  name: "Bella",
  age: 2,
  rasa: "Franceza",
});

const AnimalsCollections = Backbone.Collection.extend({
  model: Animal,
});

const animals = new AnimalsCollections([
  new Animal({
    name: "Bella",
    age: 4,
    rasa: "Franceza",
    type_animal: "pisica",
  }),
  new Animal({
    name: "Otto",
    age: 2,
    rasa: "Ciobanesc German",
    type_animal: "caine",
  }),
]);

animals.add(
  new Animal({
    name: "Pablo",
    age: 1,
    rasa: "pisica",
    type_animal: "pisica",
  }),
  { at: 0 }
);

animals.push(
  new Animal({
    name: "Isa",
    age: 3,
    rasa: "Buldog",
    type_animal: "caine",
  })
);

// const filterByAge = animals.filter((animal) => {
//   if (animal.get("age") > 2 && animal.get("age") < 4) {
//     return animal;
//   }
// });

// animals.each((item) => {

// });

// animals.at(1) => get the models by index
// animals.get("c4") => another method to access a model in collection
// animals.remove(animals.get("c4")) => delete a model from the collection
// animals.where({ name: "Isa" }) => return an array
// animals.findWhere({ name: "Isa" } => return the first instance

// --------------------------- fetch data --------------------------------------

// author": {
//   "name": "Dan",
//   "prenume": "Nuta"
//   },
//   "_id": "647996d021637256057eb79e",
//   "title": "Sherif iraspol",
//   "description": "fdsfdsfds",
//   "img": "https://img.freepik.com/free-photo/space-background-realistic-starry-night-cosmos-shining-stars-milky-way-stardust-color-galaxy_1258-154643.jpg",
//   "__v": 0

// articles.fetch({
//   success: () => {
//     console.log("datele au fost luate cu success");
//   },
//   error: () => {
//     console.log("ceav nu a mers bine");
//   },
// });

// -------------------------------------------------------------------------

const PostArticles = Backbone.Model.extend({
  defaults: {
    author: {
      name: "",
      prenume: "",
    },
    _id: "",
    title: "",
    description: "",
    img: "",
    __v: 0,
  },
});

const ArticlesServer = Backbone.Collection.extend({
  model: PostArticles,
  url: "https://leafy-parfait-dd1dba.netlify.app/.netlify/functions/api/posts",
});

const articles = new ArticlesServer();

function customSync(method, model, options) {
  const url = model.url;

  console.log(model, "model");
  console.log(options, "options");
  console.log(method, "method");

  const ajaxOptions = {
    type: "GET",
    url: url,
    data: JSON.stringify(model.toJSON()),
    contentType: "application/json",
  };

  $.ajax(ajaxOptions)
    .done(function (response) {
      options.success(response);
    })
    .fail(function (error) {
      options.error(error);
    });
}

Backbone.sync = customSync;

articles.fetch({
  success: function (data) {
    console.log("Datele au fost preluate cu succes:", data);
    data.each((item) => {
      console.log(item);
    });
  },
  error: function (error) {
    console.error("Eroare:", error);
  },
});
