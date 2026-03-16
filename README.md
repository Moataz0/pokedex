# ⚡ Pokédex

A responsive Pokémon browser built with React + TypeScript, using the [PokéAPI](https://pokeapi.co/).

## Features

- 📄 **Pagination view** — grid of Pokémon with page number controls (prev/next + page numbers)
- 🔄 **Load More view** — "Load More" button appending Pokémon without duplicates
- 🔍 **Detail page** — dedicated route for each Pokémon showing stats, abilities, height, weight
- 💀 **Skeleton loaders** — shimmer placeholders while data fetches
- ⚠️ **Error states** — clear error messages with retry option on all views
- 📱 **Fully responsive** — 4-col desktop → 3-col tablet → 2-col mobile

## Tech Stack

- React 18 + TypeScript
- React Router v6
- Vite
- CSS Modules

## Getting Started

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build
# Deploy the `dist/` folder to Vercel / Netlify / Cloudflare Pages
```

### Vercel (recommended)
```bash
npx vercel
```

### Netlify
```bash
npx netlify deploy --prod --dir=dist
```

## Project Structure

```
src/
├── api/          # API layer — fetchPokemonList, fetchPokemon
├── components/   # PokemonCard, PokemonGrid, Pagination, StatBar, ...
├── hooks/        # usePokemonList, useLoadMore, usePokemonDetail
├── pages/        # ListPage, DetailPage
└── types/        # Shared TypeScript interfaces
```
