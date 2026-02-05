# Gestion Courriers - SOGETRA SARL

Application React pour générer des courriers officiels avec en-tête, pied de page et export PDF.

## Installation locale

```bash
npm install
npm run dev
```

## Scripts disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Génère la version de production
- `npm run preview` - Prévisualise la version de production
- `npm run lint` - Vérifie le code avec ESLint

## Déploiement Vercel

1. Connecter le repository GitHub à Vercel
2. Framework: Vite
3. Build command: `npm run build`
4. Output: `dist`

## Fonctionnalités

- Génération automatique de référence (SGT/DG/ANNÉE/MOIS-XXX)
- Sélecteur de date intégré
- Validation des champs obligatoires
- Aperçu format A4
- Export PDF via impression
- Logo et coordonnées SOGETRA intégrés
- Protection XSS sur toutes les entrées utilisateur

## Structure du projet

```
src/
├── App.jsx                 # Composant principal
├── components/
│   ├── LetterForm.jsx      # Formulaire de saisie
│   └── LetterPreview.jsx   # Aperçu du courrier
├── constants/
│   └── sogetra.js          # Données entreprise
├── utils/
│   └── escapeHtml.js       # Protection XSS
├── index.css               # Styles Tailwind
└── main.jsx                # Point d'entrée
public/
└── logo.jpg                # Logo SOGETRA
```

## Technologies

- React 18
- Vite 5
- Tailwind CSS 3
- ESLint
