/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const PokemonIdLazyImport = createFileRoute('/pokemon/$id')()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const PokemonIdLazyRoute = PokemonIdLazyImport.update({
  path: '/pokemon/$id',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/pokemon.$id.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/pokemon/$id': {
      id: '/pokemon/$id'
      path: '/pokemon/$id'
      fullPath: '/pokemon/$id'
      preLoaderRoute: typeof PokemonIdLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  PokemonIdLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/pokemon/$id"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/pokemon/$id": {
      "filePath": "pokemon.$id.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
