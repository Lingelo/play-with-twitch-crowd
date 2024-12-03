# Twitch Input Emulator

This project is inspired by Twitch Plays Pokémon, a renowned project that allowed the community to play a video game in real-time. Twitch Plays Pokémon was an experience where the game's decisions were made by the Twitch community based on votes and chat inputs received in real-time. This concept has inspired me to create this project, which enables emulating community inputs on a local device.
![Twitch plays pokemon from wikipedia](doc/Twitch_plays_pokemon_animated.gif)

## Prerequisites

- Node.js installed on your machine

## Setup

1. **Clone the repository**: Clone the project repository to your local machine to begin.

2. **Create a `.env` file**: In the root directory of the project, create a `.env` file and add the following variable:

   ```plaintext
   TWITCH_CHANNEL=<your-twitch-channel-name>
   ```
    Replace Replace `<your-twitch-channel-name>` with the name of the Twitch channel you wish to listen to.
3. **Install dependencies**: Navigate to the project directory and run the following command to install Node.js dependencies:
    ```bash
    npm install
    ```
    or, preferably:
    ```bash
    yarn
    ```
   There's a `yarn.lock` file included, so using Yarn is recommended for dependency management consistency.

## Running the project

To start the project, execute the following command:
* Using yarn:
    ```bash
    yarn dev
    ```
* Or using npm:
    ```bash
    npm run dev
    ```
## Notes 
* Make sure Node.js is installed and properly configured on your system.
* The Twitch Input Emulator project enables emulating community inputs on a local device.

## Contribution
Feel free to fork the project and submit pull requests. Your contributions are welcome!

## Licence
This project is licensed under the MIT License.

