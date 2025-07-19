# Twitch Input Emulator

Un projet inspiré de Twitch Plays Pokémon qui permet à une communauté Twitch de contrôler un jeu vidéo en temps réel via les messages du chat. L'application se connecte au chat Twitch et traduit les commandes en entrées clavier sur votre machine locale.

![Twitch plays pokemon from wikipedia](doc/Twitch_plays_pokemon_animated.gif)

## 🎮 Fonctionnalités

- **Connexion Twitch en temps réel** : Se connecte automatiquement au chat du canal spécifié
- **Mapping de touches configurable** : Système flexible de correspondance commandes → touches
- **Système de throttling** : Prévient le spam avec limitation temporelle configurable
- **Support émulateur optimisé** : Méthodes d'input spécialement adaptées aux émulateurs
- **Logging détaillé** : Système de logs complet avec niveaux configurables
- **Gestion d'erreurs robuste** : Fallbacks automatiques en cas d'échec

## 📋 Prérequis

- **Node.js** (version 14 ou supérieure)
- **Yarn** (recommandé) ou npm
- **Permissions système** : L'application nécessite les autorisations d'accessibilité sur macOS pour contrôler le clavier

## ⚙️ Installation

1. **Cloner le repository** :
   ```bash
   git clone <url-du-repo>
   cd PlayWithTwitchCrowd
   ```

2. **Installer les dépendances** :
   ```bash
   yarn install
   # ou
   npm install
   ```

3. **Créer le fichier de configuration** :
   Créez un fichier `.env` à la racine du projet :
   ```env
   TWITCH_CHANNEL=votre-nom-de-canal
   LOG_LEVEL=info
   LOG_FILE=true
   USE_ADVANCED_INPUT=true
   ```

## 🚀 Utilisation

### Démarrage rapide

```bash
# Construire le projet
yarn build

# Lancer en mode développement
yarn dev
```

### Configuration détaillée

#### Variables d'environnement (.env)

| Variable | Description | Valeurs | Défaut |
|----------|-------------|---------|--------|
| `TWITCH_CHANNEL` | **Obligatoire** - Nom du canal Twitch à écouter | string | - |
| `LOG_LEVEL` | Niveau de détail des logs | `debug`, `info`, `warn`, `error` | `info` |
| `LOG_FILE` | Sauvegarder les logs dans un fichier | `true`, `false` | `false` |
| `USE_ADVANCED_INPUT` | Utiliser la méthode d'input avancée pour émulateurs | `true`, `false` | `true` |

#### Commandes disponibles par défaut

| Commande Chat | Touche Émulateur | Action |
|---------------|------------------|---------|
| `up` | ↑ | Directionnel haut |
| `down` | ↓ | Directionnel bas |
| `left` | ← | Directionnel gauche |
| `right` | → | Directionnel droite |
| `a` | A | Bouton A |
| `b` | B | Bouton B |
| `x` | X | Bouton X |
| `y` | Y | Bouton Y |
| `start` | S | Start |
| `select` | E | Select |

## 🎯 Configuration pour émulateurs

### Méthode recommandée (USE_ADVANCED_INPUT=true)

Cette méthode utilise `keyToggle` avec gestion du focus, optimisée pour les émulateurs :
- Clic automatique pour s'assurer du focus de la fenêtre
- Pression et relâchement de touche séparés (plus fiable)
- Durée de pression adaptée aux émulateurs (150ms)
- Fallback automatique en cas d'échec

### Méthode simple (USE_ADVANCED_INPUT=false)

Utilise `keyTap` classique si la méthode avancée ne fonctionne pas :
```bash
USE_ADVANCED_INPUT=false yarn dev
```

### Configuration de l'émulateur

1. **Focus** : Assurez-vous que l'émulateur est au premier plan
2. **Touches** : Configurez les touches de l'émulateur pour correspondre aux valeurs du mapping (A, B, flèches directionnelles, etc.)
3. **Tests** : Utilisez les logs pour vérifier que les commandes sont bien reçues

## 🔍 Debugging et Monitoring

### Logs détaillés

Activez le mode debug pour un monitoring complet :
```env
LOG_LEVEL=debug
```

Les logs incluent :
- **Connexion Twitch** : Status de connexion/déconnexion
- **Messages reçus** : `@username: commande`
- **Validation** : Commandes autorisées/refusées
- **Throttling** : Commandes limitées temporellement
- **Envoi touches** : Succès/échecs des inputs avec fallbacks

### Exemple de logs en action
```
2024-12-06T21:56:07.740Z [info]: Connecting to /votre-canal..
2024-12-06T21:56:07.741Z [info]: Connected waiting for messages...
2024-12-06T21:56:30.182Z [debug]: @utilisateur: up
2024-12-06T21:56:30.183Z [info]: Envoi de la touche: up (commande: up)
2024-12-06T21:56:30.285Z [info]: KeyTap simple réussi pour: up
```

## 🛠️ Personnalisation

### Modifier le mapping des touches

Éditez `src/config/config.ts` :
```typescript
const defaultKeyMap = {
    up: 'w',      // Changer flèche haut → W
    down: 's',    // Changer flèche bas → S
    left: 'a',    // Changer flèche gauche → A
    right: 'd',   // Changer flèche droite → D
    // ...
}
```

### Ajouter du throttling

Pour limiter certaines commandes :
```typescript
export const config: Config = {
    // ...
    throttledCommands: ['start', 'select'], // Limiter start et select
    timeToWait: 5000, // 5 secondes entre chaque commande throttlée
}
```

### Filtrer des commandes

Pour désactiver certaines commandes :
```typescript
export const config: Config = {
    // ...
    filteredCommands: ['start'], // Désactiver complètement 'start'
}
```

## 🚨 Résolution de problèmes

### L'application se connecte mais les touches ne fonctionnent pas

1. **Vérifiez les permissions** : Sur macOS, autorisez l'accessibilité dans Préférences Système
2. **Testez les méthodes d'input** :
   ```bash
   # Méthode avancée (par défaut)
   USE_ADVANCED_INPUT=true yarn dev
   
   # Méthode simple si la première échoue
   USE_ADVANCED_INPUT=false yarn dev
   ```
3. **Vérifiez le focus** : L'émulateur doit être au premier plan et actif
4. **Contrôlez les logs** : Activez `LOG_LEVEL=debug` pour voir les erreurs détaillées

### Les commandes ne sont pas reconnues

1. **Vérifiez le canal** : Assurez-vous que `TWITCH_CHANNEL` est correct dans `.env`
2. **Testez les commandes** : Les commandes doivent correspondre exactement au mapping (sensible à la casse)
3. **Vérifiez les regex** : Les commandes sont validées par expressions régulières

### Performance et stabilité

- **Throttling** : Ajustez `timeToWait` pour éviter le spam
- **Logs** : Utilisez `LOG_LEVEL=warn` en production pour moins de verbosité
- **Fichiers de log** : Désactivez `LOG_FILE=false` si l'espace disque est limité

## 📁 Structure du projet

```
src/
├── index.ts              # Point d'entrée
├── pokemon-plays-x.ts    # Logique principale Twitch
├── key-sender.ts         # Gestion des inputs clavier
├── config/
│   └── config.ts         # Configuration et mapping
└── utils/
    └── logger.ts         # Système de logging
```

## 🤝 Contribution

Les contributions sont bienvenues ! N'hésitez pas à :
- Forker le projet
- Créer une branche pour votre fonctionnalité
- Soumettre une pull request

## 📄 Licence

Ce projet est sous licence MIT.

