# Movie Explorer (ShowFlix) - React + Vite + Redux (Thunk & Persist)

A responsive movie/show web application built using React with TypeScript, powered by Redux Toolkit, Redux Thunk, and Redux Persist for state management. Designed for a seamless user experience with skeleton loaders, favorites management, and detailed show/movie information.

## Live Project

[Live Demo](http://ec2-13-232-127-207.ap-south-1.compute.amazonaws.com/)

---

## Tech Stack

| Technology         | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| React (Vite)       | Lightning-fast build tool and dev environment                               |
| TypeScript         | Strongly typed codebase for safety and scalability                          |
| Redux Toolkit      | Simplified and powerful state management                                    |
| Redux Thunk        | Middleware for async actions (API calls)                                    |
| Redux Persist      | Persisted favorites using localStorage                                      |
| Tailwind CSS       | Utility-first CSS framework for responsive styling                          |

---

## Features

- Browse a list of trending shows and movies.
- Mark any show or movie as a favorite.
- Favorites are persisted across page reloads.
- Unmark favorites with a single click.
- Click any movie or show card to view a details page:
  - Full details including title, summary, release date, etc.
  - Cast list with images and names.
  - All seasons shown in an accordion format (if applicable).
- When the user clicks a show or movie card for the first time, the app fetches data from an API and stores it in Redux.
- On subsequent visits to the same show or movie, data is served from the Redux cache to avoid redundant API calls.
- Uses skeleton loaders while data is being fetched.
- Fully responsive UI that adapts to mobile, tablet, and desktop views.
- If in case API does not provide movie card/banner image a type save image is provided

---

## State Management

- Global state is managed using Redux Toolkit.
- API side effects and asynchronous operations are handled using Redux Thunk.
- Caching strategy is implemented by storing fetched show/movie details in Redux on the first visit and reusing them on subsequent visits.
- Favorites are persisted using Redux Persist in localStorage for a seamless user experience.

---

## Styling

- Fully styled using Tailwind CSS with custom configuration.
- Responsive layouts for various screen sizes (mobile, tablet, desktop).
- Clean, accessible, and utility-first design approach.

---

## Testing

- Unit tests for the `ShowCard` component are implemented using **Jest** and **React Testing Library**.
- Tests cover rendering, props handling, and expected UI behavior.

---
### Test Command
```bash
npm test
```



## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)

### Installation & Development

```bash
# Install dependencies
npm install --force

# Start development server
npm run dev

# Build for production
npm run build

```


---

## Folder Structure (Summary)
<pre>src/
├── App.tsx
├── assets
│   └── react.svg
├── components
│   ├── MovieCard
│   │   └── ShowCard.tsx
│   ├── ShowDetails
│   │   ├── CastSection.tsx
│   │   ├── SeasonsSection.tsx
│   │   └── ShowInfo.tsx
│   ├── Skeleton
│   │   └── Skeleton.tsx
│   ├── comman
│   │   ├── AppHeader.tsx
│   │   ├── EmptyState.tsx
│   │   └── Footer.tsx
│   └── ui
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── toast.tsx
│       └── toaster.tsx
├── hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── index.css
├── lib
│   ├── queryClient.ts
│   ├── types.ts
│   └── utils.ts
├── main.tsx
├── output.css
├── pages
│   ├── 404Page
│   │   └── not-found.tsx
│   ├── FavoritesPage
│   │   └── FavoritesPage.tsx
│   ├── HomePage
│   │   └── HomePage.tsx
│   └── ShowDetailsPage
│       └── ShowDetailsPage.tsx
├── store
│   ├── index.ts
│   └── slices
│       ├── favoritesSlice.ts
│       └── showsSlice.ts
└── vite-env.d.ts
</pre>

---



