import Backbone from "backbone";

const Song = Backbone.Model.extend({
  validate: (attributes) => {
    if (!attributes.title) {
      return "Title is required";
    }

    if (!attributes.name) {
      return "Numele trebuie sa fie setat";
    }
  },

  initialize: () => {},
  defaults: {
    gener: "Rock",
  },
});

const newSong = new Song({
  prenume: "Nuta",
});
newSong.set({
  age: 20,
  title: "New data",
  name: "Dan",
});

// newSong.unset("title") => delete a attributes
// newSong.get("title") => get a attributes value
// newSong.set("title", "New title") => add a attributes
// newSong.clear() => delete all attributes
// newSong.has("title") => check if the attributes is
// newSong.isValid() => return boolean and check if the object is valid
// newSong.isValid() => check if the object is valid, pass the validation fn
// newSong.validationError => return error if it is

// const Animal = Backbone.Model.extend({
//   walk: (name) => {
//     console.log(name);
//   },
// });

// const cat = new Animal();

// const Dog = Animal.extend();
// const dog = new Dog();

// export const FetchData = Backbone.Model.extend({
//   urlRoot:
//     "https://leafy-parfait-dd1dba.netlify.app/.netlify/functions/api/posts",

//   defaults: {
//     title: "Unde",
//   },
// });

export const Animal = Backbone.Model.extend({
  defaults: {
    name: "",
    age: null,
    rasa: "",
    type_animal: "",
  },
});

// serverResponse.fetch() => gets data from the server
//               .save() => post/put data on the server
//               .destroy() => delete data from the server
