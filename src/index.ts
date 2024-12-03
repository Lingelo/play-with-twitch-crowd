import {PokemonPlaysX} from "./pokemon-plays-x"
import logger from "./utils/logger";

new PokemonPlaysX().run().catch(
  (error) => logger.error(error)
).then(
  () => logger.info("Connected waiting for messages...")
)
