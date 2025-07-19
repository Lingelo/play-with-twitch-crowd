# 🎮 Twitch Input Emulator

> **Un système de contrôle de jeu révolutionnaire permettant à une communauté Twitch de jouer collectivement en temps réel**

Inspiré du légendaire projet "Twitch Plays Pokémon", ce projet transforme votre chat Twitch en une interface de contrôle communautaire pour n'importe quel jeu vidéo. L'application capture les messages du chat en temps réel et les traduit en entrées clavier précises, créant une expérience de jeu collaborative unique.

![Twitch plays pokemon from wikipedia](doc/Twitch_plays_pokemon_animated.gif)

## 📖 Table des matières

- [🌟 Aperçu du projet](#-aperçu-du-projet)
- [🎯 Fonctionnalités](#-fonctionnalités)
- [🏗️ Architecture technique](#️-architecture-technique)
- [📋 Prérequis](#-prérequis)
- [⚙️ Installation](#️-installation)
- [🚀 Utilisation](#-utilisation)
- [🎮 Configuration pour émulateurs](#-configuration-pour-émulateurs)
- [🔧 Configuration avancée](#-configuration-avancée)
- [🔍 Monitoring et debugging](#-monitoring-et-debugging)
- [📊 Performance et optimisation](#-performance-et-optimisation)
- [🚨 Résolution de problèmes](#-résolution-de-problèmes)
- [🛠️ Développement](#️-développement)
- [🤝 Contribution](#-contribution)

## 🌟 Aperçu du projet

### Concept

Le Twitch Input Emulator crée un pont entre votre audience Twitch et n'importe quel jeu vidéo. Chaque spectateur peut influencer le jeu en temps réel en tapant des commandes simples dans le chat, transformant le streaming en expérience interactive collaborative.

### Cas d'usage principaux

- **Streaming interactif** : Engager votre audience avec des sessions de jeu communautaires
- **Événements gaming** : Organiser des marathons de jeu collectifs
- **Éducation** : Démonstrations interactives de mécaniques de jeu
- **Expérimentation sociale** : Étudier la prise de décision collective

### Technologies utilisées

- **Backend** : Node.js + TypeScript pour la robustesse et la maintenabilité
- **Interface Twitch** : tmi.js pour une connexion chat optimisée
- **Contrôle système** : RobotJS pour une simulation d'input précise
- **Logging** : Winston pour un monitoring professionnel
- **Build** : Système de compilation TypeScript avec hot-reload

## 🎯 Fonctionnalités

### 🔌 Connectivité Twitch avancée
- **Connexion temps réel** : Latence minimale avec reconnexion automatique
- **Multi-canal** : Support de plusieurs canaux simultanés (configurable)
- **Gestion des permissions** : Filtrage par rôle utilisateur (mods, VIPs)
- **Rate limiting** : Protection contre le spam intégrée

### ⌨️ Système d'input intelligent
- **Mapping flexible** : Configuration complète touches ↔ commandes
- **Méthodes d'input multiples** : keyTap et keyToggle selon le contexte
- **Focus automatique** : Gestion intelligente du focus fenêtre
- **Compatibilité émulateur** : Optimisations spéciales pour émulateurs

### 🛡️ Contrôles anti-spam
- **Throttling configurable** : Limitation temporelle par commande
- **Filtrage intelligent** : Blacklist/whitelist de commandes
- **Validation stricte** : Regex de validation des inputs
- **Historique de commandes** : Tracking pour analytics

### 📈 Monitoring professionnel
- **Logs structurés** : Format JSON pour analyse automatisée
- **Niveaux configurables** : Debug, info, warn, error
- **Métriques temps réel** : Latence, taux de commandes, erreurs
- **Alertes automatiques** : Notifications sur problèmes critiques

## 🏗️ Architecture technique

### Vue d'ensemble

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Chat Twitch   │───▶│  Input Emulator │───▶│ Jeu/Émulateur   │
│                 │    │                 │    │                 │
│ Spectateurs     │    │ • Validation    │    │ • Pokémon       │
│ • up            │    │ • Mapping       │    │ • Rétro gaming  │
│ • down          │    │ • Throttling    │    │ • Autres jeux   │
│ • a, b          │    │ • Logging       │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Flux de données détaillé

1. **Capture** : tmi.js intercepte les messages du chat Twitch
2. **Validation** : Vérification des commandes contre les règles configurées
3. **Normalisation** : Conversion en format standardisé (minuscules, trim)
4. **Throttling** : Application des limitations temporelles
5. **Mapping** : Conversion commande → touche système
6. **Exécution** : Envoi de l'input via RobotJS
7. **Logging** : Enregistrement pour monitoring et debug

### Composants principaux

#### PokemonPlaysX (`src/pokemon-plays-x.ts`)
- **Rôle** : Orchestrateur principal et gestionnaire Twitch
- **Responsabilités** :
  - Connexion/déconnexion chat Twitch
  - Validation des messages entrants
  - Coordination avec KeySender
  - Gestion des événements réseau

#### KeySender (`src/key-sender.ts`)
- **Rôle** : Gestionnaire d'inputs système
- **Responsabilités** :
  - Simulation des frappes clavier
  - Gestion du focus fenêtre
  - Implémentation du throttling
  - Fallbacks en cas d'erreur

#### Config (`src/config/config.ts`)
- **Rôle** : Centre de configuration
- **Responsabilités** :
  - Mapping touches/commandes
  - Variables d'environnement
  - Règles de validation
  - Paramètres de performance

#### Logger (`src/utils/logger.ts`)
- **Rôle** : Système de logging centralisé
- **Responsabilités** :
  - Logs formatés et colorés
  - Rotation de fichiers
  - Niveaux configurables
  - Sortie console et fichier

## 📋 Prérequis

### Système

- **Node.js** : Version 14.0+ (recommandé : 18.0+)
- **NPM/Yarn** : Yarn 1.22+ recommandé pour la cohérence
- **Système d'exploitation** :
  - macOS 10.14+ (avec permissions d'accessibilité)
  - Windows 10+ 
  - Linux (X11 requis)

### Permissions système

#### macOS
```bash
# Autoriser les permissions d'accessibilité dans :
# Préférences Système → Sécurité et confidentialité → Confidentialité → Accessibilité
# Ajouter votre terminal et/ou Node.js
```

#### Windows
```powershell
# Exécuter en tant qu'administrateur pour RobotJS
# Ou configurer les permissions UAC appropriées
```

#### Linux
```bash
# Installer les dépendances X11
sudo apt-get install libxtst6 libxrandr2 libasound2-dev
```

### Compte Twitch

- **Canal Twitch actif** : Pour recevoir les commandes
- **Pas d'authentification requise** : Lecture seule du chat public

## ⚙️ Installation

### Installation rapide

```bash
# 1. Cloner le projet
git clone https://github.com/votre-username/PlayWithTwitchCrowd.git
cd PlayWithTwitchCrowd

# 2. Installer les dépendances
yarn install

# 3. Configuration
cp .env.example .env
# Éditer .env avec vos paramètres

# 4. Build et test
yarn build
yarn dev
```

### Installation détaillée

#### 1. Téléchargement du code

```bash
git clone https://github.com/votre-username/PlayWithTwitchCrowd.git
cd PlayWithTwitchCrowd

# Vérifier la version Node.js
node --version  # Doit être >= 14.0

# Vérifier Yarn
yarn --version  # Recommandé >= 1.22
```

#### 2. Installation des dépendances

```bash
# Installation avec Yarn (recommandé)
yarn install

# Ou avec NPM si nécessaire
npm install

# Vérification de l'installation
yarn list --depth=0
```

#### 3. Configuration de l'environnement

```bash
# Créer le fichier de configuration
touch .env

# Configuration minimale
echo "TWITCH_CHANNEL=votre-canal" >> .env
echo "LOG_LEVEL=info" >> .env
echo "USE_ADVANCED_INPUT=true" >> .env
```

#### 4. Test de l'installation

```bash
# Compilation TypeScript
yarn build

# Test de démarrage (arrêter avec Ctrl+C)
yarn dev

# Vérification des logs
ls -la *.log
```

## 🚀 Utilisation

### Démarrage rapide

```bash
# Lancement standard
yarn dev

# Avec logs détaillés
LOG_LEVEL=debug yarn dev

# Mode production
yarn build && node dist/index.js
```

### Configuration de base (.env)

```env
# Configuration obligatoire
TWITCH_CHANNEL=votre-nom-de-canal

# Configuration recommandée
LOG_LEVEL=info                    # debug, info, warn, error
LOG_FILE=true                     # Sauvegarder les logs
USE_ADVANCED_INPUT=true           # Méthode optimisée émulateurs

# Configuration optionnelle
CONFIG_PROGRAM_NAME=MonJeu        # Nom pour les logs
```

### Variables d'environnement complètes

| Variable | Description | Valeurs | Défaut | Requis |
|----------|-------------|---------|--------|--------|
| `TWITCH_CHANNEL` | Canal Twitch à écouter | string | - | ✅ |
| `LOG_LEVEL` | Niveau de détail des logs | `debug`, `info`, `warn`, `error` | `info` | ❌ |
| `LOG_FILE` | Écrire logs dans fichiers | `true`, `false` | `false` | ❌ |
| `USE_ADVANCED_INPUT` | Méthode input avancée | `true`, `false` | `true` | ❌ |
| `CONFIG_PROGRAM_NAME` | Nom du jeu pour logs | string | `""` | ❌ |

### Commandes de chat disponibles

| Commande | Touche émulée | Description | Exemple d'usage |
|----------|---------------|-------------|-----------------|
| `up` | ↑ | Déplacement haut | Navigation, menus |
| `down` | ↓ | Déplacement bas | Navigation, menus |
| `left` | ← | Déplacement gauche | Navigation, menus |
| `right` | → | Déplacement droite | Navigation, menus |
| `a` | A | Action principale | Confirmer, attaquer |
| `b` | B | Action secondaire | Annuler, défendre |
| `x` | X | Action tertiaire | Menu, objet |
| `y` | Y | Action quaternaire | Course, sorts |
| `start` | S | Pause/Menu | Pause du jeu |
| `select` | E | Sélection | Changement mode |

## 🎮 Configuration pour émulateurs

### Émulateurs testés et compatibles

#### ✅ Parfaitement compatibles
- **VisualBoyAdvance-M** (GBA) - Recommandé
- **Snes9x** (SNES) - Configuration simple
- **FCEUX** (NES) - Fonctionne nativement
- **DeSmuME** (Nintendo DS) - Avec configuration

#### ⚠️ Compatibilité partielle
- **RetroArch** - Nécessite configuration spéciale
- **OpenEmu** (macOS) - Support limité
- **Dolphin** (GameCube/Wii) - Configuration complexe

#### ❌ Problèmes connus
- **Émulateurs fullscreen exclusif** - Focus difficile
- **Émulateurs avec capture input** - Conflit possible

### Configuration recommandée

#### 1. Préparation de l'émulateur

```bash
# Configurer les touches dans l'émulateur pour correspondre :
# A → Touche A du clavier
# B → Touche B du clavier
# Directionnelles → Flèches du clavier
# Start → Touche S
# Select → Touche E
```

#### 2. Optimisation des paramètres

```env
# .env optimisé pour émulateurs
USE_ADVANCED_INPUT=true           # OBLIGATOIRE pour émulateurs
LOG_LEVEL=debug                   # Pour diagnostiquer les problèmes
```

#### 3. Test de fonctionnement

```bash
# Lancer avec logs détaillés
LOG_LEVEL=debug yarn dev

# Dans le chat Twitch, taper : a
# Vérifier dans les logs :
# ✅ "Envoi de la touche: a (commande: a)"
# ✅ "KeyTap simple réussi pour: a"
```

### Méthodes d'input

#### Méthode avancée (par défaut)
```typescript
// Utilise keyToggle avec gestion de focus
robot.keyToggle(key, 'down')
setTimeout(() => robot.keyToggle(key, 'up'), 150)
```

**Avantages** :
- ✅ Meilleure compatibilité émulateurs
- ✅ Gestion automatique du focus
- ✅ Durée de pression configurable
- ✅ Fallback automatique

#### Méthode simple (fallback)
```bash
USE_ADVANCED_INPUT=false yarn dev
```

**Utilisation** :
- 🔧 Si la méthode avancée échoue
- 🔧 Pour des applications simples
- 🔧 Debugging de problèmes spécifiques

## 🔧 Configuration avancée

### Personnalisation du mapping

#### Modifier les commandes de base

```typescript
// src/config/config.ts
const defaultKeyMap = {
    // Commandes directionnelles
    up: 'w',           // Chat: "up" → Touche: W
    down: 's',         // Chat: "down" → Touche: S
    left: 'a',         // Chat: "left" → Touche: A
    right: 'd',        // Chat: "right" → Touche: D
    
    // Actions principales
    action: 'space',   // Chat: "action" → Touche: ESPACE
    jump: 'z',         // Chat: "jump" → Touche: Z
    run: 'shift',      // Chat: "run" → Touche: SHIFT
    
    // Touches spéciales
    pause: 'p',        // Chat: "pause" → Touche: P
    menu: 'escape',    // Chat: "menu" → Touche: ÉCHAP
}
```

#### Touches spéciales supportées

```typescript
// Touches modificatrices
'shift', 'ctrl', 'alt', 'cmd'

// Touches de fonction
'f1', 'f2', 'f3', ..., 'f12'

// Touches spéciales
'space', 'enter', 'escape', 'tab', 'backspace'

// Pavé numérique
'numpad_0', 'numpad_1', ..., 'numpad_9'
```

### Système de throttling avancé

#### Configuration globale

```typescript
export const config: Config = {
    timeToWait: 5000,              // 5 secondes entre commandes
    throttledCommands: ['start', 'select', 'reset'],
    globalThrottle: true,          // Throttling pour tous ou par utilisateur
}
```

#### Throttling par commande

```typescript
const advancedThrottling = {
    'start': 10000,    // 10 secondes pour start
    'select': 5000,    // 5 secondes pour select
    'reset': 30000,    // 30 secondes pour reset
    default: 1000,     // 1 seconde par défaut
}
```

#### Throttling par utilisateur

```typescript
// Limiter par utilisateur au lieu de globalement
private userThrottling: Map<string, Map<string, number>> = new Map()

private isUserThrottled(username: string, command: string): boolean {
    // Implémentation personnalisée
}
```

### Filtrage et validation

#### Blacklist de commandes

```typescript
export const config: Config = {
    filteredCommands: [
        'delete',      // Empêcher commandes destructrices
        'format',      // Empêcher commandes système
        'shutdown',    // Sécurité
    ]
}
```

#### Validation par regex personnalisée

```typescript
// Commandes alphanumériques uniquement
const commandValidation = /^[a-zA-Z0-9]+$/

// Commandes avec longueur limitée
const lengthValidation = /^.{1,10}$/

// Commandes avec préfixe obligatoire
const prefixValidation = /^game_.+/
```

#### Filtrage par rôle utilisateur

```typescript
// Réserver certaines commandes aux mods
const modOnlyCommands = ['reset', 'save', 'load']

if (modOnlyCommands.includes(command) && !tags.mod) {
    logger.warn(`Commande mod refusée pour ${tags.username}: ${command}`)
    return
}
```

## 🔍 Monitoring et debugging

### Système de logs avancé

#### Configuration des niveaux

```typescript
// winston configuration
const logLevels = {
    error: 0,    // Erreurs critiques uniquement
    warn: 1,     // Avertissements + erreurs
    info: 2,     // Informations + warn + error
    debug: 3,    // Tout (très verbeux)
}
```

#### Formats de logs personnalisés

```typescript
// Format JSON pour analyse automatisée
format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.metadata()
)

// Format lisible pour développement
format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message, metadata }) => {
        return `${timestamp} [${level}] ${message} ${JSON.stringify(metadata)}`
    })
)
```

#### Rotation automatique des logs

```typescript
import 'winston-daily-rotate-file'

const fileRotateTransport = new winston.transports.DailyRotateFile({
    filename: 'logs/app-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d'
})
```

### Métriques en temps réel

#### Tracking des performances

```typescript
class MetricsCollector {
    private commandCount: Map<string, number> = new Map()
    private responseTime: number[] = []
    private errorCount: number = 0
    
    logCommand(command: string, responseTime: number) {
        this.commandCount.set(command, (this.commandCount.get(command) || 0) + 1)
        this.responseTime.push(responseTime)
    }
    
    getStats() {
        return {
            totalCommands: Array.from(this.commandCount.values()).reduce((a, b) => a + b, 0),
            averageResponseTime: this.responseTime.reduce((a, b) => a + b, 0) / this.responseTime.length,
            mostUsedCommand: this.getMostUsedCommand(),
            errorRate: this.errorCount / this.totalCommands
        }
    }
}
```

#### Dashboard de monitoring

```bash
# Affichage stats en temps réel
curl http://localhost:3000/metrics

# Export pour Grafana/Prometheus
curl http://localhost:3000/metrics/prometheus
```

### Debugging de problèmes

#### Debug mode complet

```bash
# Logs maximum + métriques
DEBUG=* LOG_LEVEL=debug yarn dev

# Profiling de performance
NODE_ENV=profiling yarn dev
```

#### Outils de diagnostic

```typescript
// Test de connectivité Twitch
async function testTwitchConnection() {
    try {
        const client = new tmi.client({ channels: [channel] })
        await client.connect()
        logger.info('✅ Connexion Twitch OK')
        await client.disconnect()
    } catch (error) {
        logger.error('❌ Échec connexion Twitch:', error)
    }
}

// Test de RobotJS
function testRobotJS() {
    try {
        robot.keyTap('a')
        logger.info('✅ RobotJS OK')
    } catch (error) {
        logger.error('❌ Échec RobotJS:', error)
    }
}
```

## 📊 Performance et optimisation

### Benchmarks de référence

| Métrique | Valeur cible | Valeur critique |
|----------|--------------|-----------------|
| **Latence chat → input** | < 100ms | > 500ms |
| **Mémoire utilisée** | < 50MB | > 200MB |
| **CPU en idle** | < 5% | > 20% |
| **Commandes/seconde** | 10-50 | > 100 |

### Optimisations de performance

#### Optimisation mémoire

```typescript
// Limiter l'historique des commandes
const MAX_COMMAND_HISTORY = 1000
private commandHistory: Array<CommandEntry> = []

addCommand(command: CommandEntry) {
    this.commandHistory.push(command)
    if (this.commandHistory.length > MAX_COMMAND_HISTORY) {
        this.commandHistory.shift()
    }
}
```

#### Optimisation CPU

```typescript
// Debouncing des commandes identiques
private lastCommand: string = ''
private lastCommandTime: number = 0

sendKey(command: string): void {
    const now = Date.now()
    if (command === this.lastCommand && now - this.lastCommandTime < 100) {
        return // Ignorer si même commande < 100ms
    }
    this.lastCommand = command
    this.lastCommandTime = now
    // ... rest of logic
}
```

#### Optimisation réseau

```typescript
// Connexion avec options optimisées
const client = new tmi.client({
    connection: {
        secure: true,
        reconnect: true,
        maxReconnectAttempts: 10,
        maxReconnectInterval: 30000,
        reconnectDecay: 1.5,
        timeout: 180000,
    },
    options: {
        messagesLogLevel: 'error', // Réduire les logs tmi.js
        skipUpdatingEmotesets: true,
        skipMembership: true,
    }
})
```

### Monitoring de performance

#### Alertes automatiques

```typescript
class PerformanceMonitor {
    private readonly MAX_MEMORY_MB = 100
    private readonly MAX_LATENCY_MS = 200
    
    checkPerformance() {
        const memUsage = process.memoryUsage()
        const memMB = memUsage.heapUsed / 1024 / 1024
        
        if (memMB > this.MAX_MEMORY_MB) {
            logger.warn(`⚠️ Mémoire élevée: ${memMB.toFixed(2)}MB`)
            this.triggerGarbageCollection()
        }
    }
    
    private triggerGarbageCollection() {
        if (global.gc) {
            global.gc()
            logger.info('🧹 Garbage collection forcé')
        }
    }
}
```

## 🚨 Résolution de problèmes

### Problèmes courants et solutions

#### 1. L'application se connecte mais ne reçoit pas de messages

**Symptômes** :
```
[info]: Connected! Waiting for messages...
[info]: Connecting to /votre-canal..
# Mais aucun message @username: commande
```

**Solutions** :
```bash
# 1. Vérifier le nom du canal (sans #)
echo "TWITCH_CHANNEL=nomducanal" > .env  # ✅ Correct
echo "TWITCH_CHANNEL=#nomducanal" > .env # ❌ Incorrect

# 2. Tester avec un canal actif
echo "TWITCH_CHANNEL=shroud" > .env  # Canal très actif pour test

# 3. Vérifier la connectivité
curl -I https://tmi.twitch.tv
```

#### 2. Les commandes sont reçues mais les touches ne fonctionnent pas

**Diagnostic** :
```bash
# Activer logs détaillés
LOG_LEVEL=debug yarn dev

# Chercher dans les logs :
# ✅ "Envoi de la touche: a (commande: a)"
# ❌ "Erreur lors de l'envoi de la touche a: ..."
```

**Solutions macOS** :
```bash
# Autoriser les permissions d'accessibilité
# Préférences Système → Sécurité → Confidentialité → Accessibilité
# Ajouter Terminal et/ou Node.js

# Tester les permissions
osascript -e 'tell application "System Events" to keystroke "a"'
```

**Solutions Windows** :
```powershell
# Exécuter en tant qu'administrateur
# Ou configurer UAC pour Node.js

# Tester RobotJS
node -e "require('robotjs').keyTap('a')"
```

#### 3. Latence élevée (commandes lentes)

**Diagnostic** :
```typescript
// Ajouter timing dans les logs
const startTime = Date.now()
robot.keyTap(key)
const endTime = Date.now()
logger.info(`Temps d'exécution: ${endTime - startTime}ms`)
```

**Solutions** :
```bash
# 1. Utiliser la méthode simple
USE_ADVANCED_INPUT=false yarn dev

# 2. Réduire le délai clavier
KEYBOARD_DELAY=50 yarn dev  # Au lieu de 100ms par défaut

# 3. Optimiser le throttling
TIME_TO_WAIT=500 yarn dev   # Au lieu de 10000ms par défaut
```

#### 4. Spam de commandes

**Protection automatique** :
```typescript
// Throttling global
export const config: Config = {
    timeToWait: 2000,  // 2 secondes minimum entre commandes
    throttledCommands: ['up', 'down', 'left', 'right'], // Toutes les directions
}

// Rate limiting par utilisateur
private userCommandCount: Map<string, number[]> = new Map()

private isRateLimited(username: string): boolean {
    const now = Date.now()
    const userCommands = this.userCommandCount.get(username) || []
    
    // Garder seulement les commandes des 10 dernières secondes
    const recentCommands = userCommands.filter(time => now - time < 10000)
    this.userCommandCount.set(username, recentCommands)
    
    // Limite : 5 commandes par 10 secondes par utilisateur
    return recentCommands.length >= 5
}
```

### Outils de diagnostic

#### Script de test complet

```bash
#!/bin/bash
# test-installation.sh

echo "🔍 Test de l'installation Twitch Input Emulator"

# Test Node.js
echo "📦 Version Node.js:"
node --version

# Test dépendances
echo "📦 Test des dépendances:"
node -e "console.log('✅ Node.js OK')"
node -e "require('robotjs'); console.log('✅ RobotJS OK')" 2>/dev/null || echo "❌ RobotJS échoue"
node -e "require('tmi.js'); console.log('✅ tmi.js OK')" 2>/dev/null || echo "❌ tmi.js échoue"

# Test build
echo "🏗️ Test de compilation:"
yarn build && echo "✅ Build OK" || echo "❌ Build échoue"

# Test configuration
echo "⚙️ Test configuration:"
[ -f .env ] && echo "✅ Fichier .env présent" || echo "❌ Fichier .env manquant"
grep -q "TWITCH_CHANNEL" .env && echo "✅ TWITCH_CHANNEL configuré" || echo "❌ TWITCH_CHANNEL manquant"

echo "✨ Test terminé"
```

#### Monitoring en continu

```typescript
// health-check.ts
class HealthChecker {
    private checkInterval: NodeJS.Timeout
    
    start() {
        this.checkInterval = setInterval(() => {
            this.performHealthCheck()
        }, 30000) // Toutes les 30 secondes
    }
    
    private performHealthCheck() {
        const health = {
            timestamp: new Date().toISOString(),
            memory: this.getMemoryUsage(),
            uptime: process.uptime(),
            twitchConnected: this.isTwitchConnected(),
            robotjsWorking: this.testRobotJS(),
        }
        
        logger.info('Health check:', health)
        
        if (!health.twitchConnected) {
            logger.error('🚨 Connexion Twitch perdue - tentative de reconnexion')
            this.reconnectTwitch()
        }
    }
}
```

## 🛠️ Développement

### Structure du projet détaillée

```
PlayWithTwitchCrowd/
├── 📁 src/                          # Code source principal
│   ├── 📄 index.ts                  # Point d'entrée application
│   ├── 📄 pokemon-plays-x.ts        # Gestionnaire Twitch principal
│   ├── 📄 key-sender.ts             # Système d'input clavier
│   ├── 📁 config/
│   │   └── 📄 config.ts             # Configuration centralisée
│   ├── 📁 utils/
│   │   ├── 📄 logger.ts             # Système de logging
│   │   ├── 📄 metrics.ts            # Collecte de métriques
│   │   └── 📄 health-checker.ts     # Monitoring santé
│   └── 📁 types/
│       └── 📄 interfaces.ts         # Types TypeScript
├── 📁 dist/                         # Code compilé (généré)
├── 📁 logs/                         # Fichiers de logs (généré)
├── 📁 doc/                          # Documentation et assets
├── 📁 tests/                        # Tests unitaires et intégration
├── 📁 scripts/                      # Scripts utilitaires
├── 📄 package.json                  # Configuration NPM
├── 📄 tsconfig.json                 # Configuration TypeScript
├── 📄 .env                          # Variables d'environnement
└── 📄 README.md                     # Ce fichier
```

### Scripts disponibles

```bash
# Développement
yarn dev              # Mode développement avec hot-reload
yarn build            # Compilation TypeScript
yarn start            # Lancement production
yarn format           # Formatage code avec Prettier

# Testing
yarn test             # Tests unitaires
yarn test:watch       # Tests en mode watch
yarn test:coverage    # Tests avec coverage

# Qualité
yarn lint             # Vérification ESLint
yarn type-check       # Vérification types TypeScript
yarn audit            # Audit sécurité dépendances

# Utilitaires
yarn clean            # Nettoyage dist/ et logs/
yarn reset            # Reset complet (clean + install)
yarn logs             # Affichage logs temps réel
```

### Workflow de développement

#### 1. Setup environnement

```bash
# Fork et clone
git clone https://github.com/votre-username/PlayWithTwitchCrowd.git
cd PlayWithTwitchCrowd

# Installation dépendances
yarn install

# Configuration
cp .env.example .env
# Éditer .env avec vos paramètres

# Test installation
yarn test-install
```

#### 2. Développement de features

```bash
# Créer branche feature
git checkout -b feature/nouvelle-fonctionnalite

# Développement avec hot-reload
yarn dev

# Tests en continu
yarn test:watch

# Vérification qualité
yarn lint && yarn type-check
```

#### 3. Testing et validation

```bash
# Tests complets
yarn test:coverage

# Test avec émulateur réel
yarn build
TWITCH_CHANNEL=test-channel yarn start

# Validation performance
yarn benchmark
```

### Contribution au projet

#### Guidelines de code

```typescript
// ✅ Bon style
class KeySender {
    private readonly config: Config
    private commandHistory: Map<string, number> = new Map()
    
    constructor(config: Config) {
        this.config = config
        this.setupValidation()
    }
    
    async sendKey(command: string): Promise<void> {
        const normalizedCommand = this.normalizeCommand(command)
        
        if (!this.isValidCommand(normalizedCommand)) {
            throw new InvalidCommandError(`Invalid command: ${command}`)
        }
        
        await this.executeKeyPress(normalizedCommand)
    }
    
    private normalizeCommand(command: string): string {
        return command.toLowerCase().trim()
    }
}
```

#### Standards de commit

```bash
# Format des messages de commit
type(scope): description courte

# Types autorisés
feat:     # Nouvelle fonctionnalité
fix:      # Correction de bug
docs:     # Documentation
style:    # Formatage, style
refactor: # Refactoring
test:     # Tests
chore:    # Maintenance

# Exemples
feat(input): add support for gamepad inputs
fix(twitch): resolve connection timeout issues
docs(readme): update installation instructions
```

#### Process de Pull Request

1. **Fork** le repository
2. **Créer** une branche feature
3. **Développer** avec tests
4. **Valider** qualité code
5. **Créer** Pull Request avec description détaillée
6. **Répondre** aux reviews
7. **Merger** après approbation

## 🤝 Contribution

### Comment contribuer

Ce projet est ouvert aux contributions ! Voici comment vous pouvez aider :

#### 🐛 Rapporter des bugs

1. **Vérifier** que le bug n'est pas déjà reporté
2. **Utiliser** le template de bug report
3. **Inclure** logs et configuration
4. **Fournir** étapes de reproduction

#### 💡 Proposer des améliorations

1. **Créer** une issue avec le template feature request
2. **Décrire** le problème à résoudre
3. **Proposer** une solution détaillée
4. **Discuter** avec la communauté

#### 🔧 Développer des features

1. **Consulter** les issues ouvertes
2. **Commenter** pour prendre une tâche
3. **Suivre** le workflow de développement
4. **Soumettre** une Pull Request

### Roadmap du projet

#### Version 1.0 (Actuelle)
- ✅ Base fonctionnelle Twitch → Jeu
- ✅ Support émulateurs principaux
- ✅ Système de throttling
- ✅ Logging avancé

#### Version 1.1 (Prochaine)
- 🔄 Interface web de monitoring
- 🔄 Support multi-canaux
- 🔄 Système de permissions avancé
- 🔄 Métriques en temps réel

#### Version 2.0 (Future)
- 📋 Support manettes/gamepad
- 📋 Plugins pour jeux spécifiques
- 📋 IA pour modération automatique
- 📋 Dashboard streamer complet

### Support et communauté

#### 💬 Obtenir de l'aide

- **GitHub Issues** : Pour bugs et questions techniques
- **Discord** : `[Lien vers serveur Discord]` - Support communautaire
- **Documentation** : Wiki GitHub avec guides détaillés
- **Email** : `support@twitch-input-emulator.com`

#### 🏆 Contributeurs

Merci à tous les contributeurs qui font vivre ce projet !

<!-- AUTO-GENERATED CONTRIBUTORS LIST -->

#### 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

<div align="center">

**🎮 Créé avec ❤️ pour la communauté gaming**

[![GitHub stars](https://img.shields.io/github/stars/username/PlayWithTwitchCrowd)](https://github.com/username/PlayWithTwitchCrowd/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/username/PlayWithTwitchCrowd)](https://github.com/username/PlayWithTwitchCrowd/issues)
[![GitHub license](https://img.shields.io/github/license/username/PlayWithTwitchCrowd)](https://github.com/username/PlayWithTwitchCrowd/blob/main/LICENSE)

</div>