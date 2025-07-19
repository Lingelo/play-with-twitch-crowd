# CLAUDE.md

Ce fichier fournit des directives à Claude Code (claude.ai/code) lors du travail avec le code de ce dépôt.

## Aperçu du Projet

Il s'agit d'un Émulateur d'Entrées Twitch inspiré de Twitch Plays Pokémon. Il écoute les messages de chat d'un canal Twitch spécifié et les traduit en entrées clavier en utilisant RobotJS. L'application se connecte au chat Twitch via tmi.js et envoie des commandes clavier à la fenêtre active, permettant un gameplay piloté par la communauté.

## Commandes de Développement

- **Installer les dépendances** : `yarn` (préféré) ou `npm install`
- **Démarrer le développement** : `yarn dev` ou `npm run dev`
- **Construire** : `yarn build` ou `npm run build`
- **Formater le code** : `yarn format` ou `npm run format`

## Architecture

### Composants Principaux

1. **PokemonPlaysX** (`src/pokemon-plays-x.ts`) : Classe d'application principale qui se connecte au chat Twitch et traite les messages
2. **KeySender** (`src/key-sender.ts`) : Gère la simulation d'entrée clavier avec limitation et filtrage
3. **Config** (`src/config/config.ts`) : Gestion de la configuration avec support des variables d'environnement
4. **Logger** (`src/utils/logger.ts`) : Journalisation basée sur Winston avec sortie fichier et console

### Flux de Données

1. L'application se connecte au canal Twitch via le client tmi.js
2. Les messages de chat entrants sont validés contre les commandes autorisées
3. Les commandes valides sont mappées aux touches du clavier via la configuration keyMap
4. KeySender applique les règles de limitation et envoie l'entrée clavier via RobotJS
5. Toutes les actions sont journalisées avec des niveaux de log configurables

### Configuration des Touches

L'application utilise un mappage de touches par défaut pour les contrôles de jeu communs :
- Directionnel : up, down, left, right
- Actions : a, b, x, y
- Système : start (s), select (e)

Les commandes peuvent être filtrées ou limitées via des tableaux de configuration.

## Configuration de l'Environnement

Créer un fichier `.env` avec :
```
TWITCH_CHANNEL=nom-de-votre-canal
CONFIG_PROGRAM_NAME=nom-de-programme-optionnel
LOG_LEVEL=info
LOG_FILE=true
```

## Dépendances

- **tmi.js** : Client de chat Twitch
- **robotjs** : Automatisation de bureau multiplateforme
- **winston** : Framework de journalisation
- **TypeScript** : Développement avec ts-node pour le rechargement à chaud

## Structure des Fichiers

- `src/index.ts` : Point d'entrée de l'application
- `src/pokemon-plays-x.ts` : Logique principale de l'application
- `src/key-sender.ts` : Gestion des entrées avec limitation
- `src/config/config.ts` : Configuration et mappage des touches
- `src/utils/logger.ts` : Journalisation centralisée
- `dist/` : Sortie TypeScript compilée