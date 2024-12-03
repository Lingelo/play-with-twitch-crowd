"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pokemon_plays_x_1 = require("./pokemon-plays-x");
new pokemon_plays_x_1.PokemonPlaysX().run().catch((error) => console.error(error)).then(() => console.log("Finished!"));
