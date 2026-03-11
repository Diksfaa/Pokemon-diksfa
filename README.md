## 📂 Demo
link demo deployment:
https://pokemon-diksfa.vercel.app/

## 📂 Project Structure

```text
src/
├── app/
│   ├── battle/
│   │   ├── _components/      # battle-card.tsx, battle-pokemon.tsx
│   │   └── page.tsx
│   ├── dashboard/
│   │   ├── _components/      # pokemon-hero.tsx, pokemon-kpi.tsx, pokemon-stats.tsx
│   │   └── page.tsx
│   └── explorer/
│       ├── _components/      # pokemon-card-mini.tsx, pokemon-explorer.tsx
│       └── page.tsx
├── components/
│   ├── common/               # app-sidebar.tsx
│   └── ui/                   # shadcn/UI components
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions
├── providers/                # Context providers
├── services/                 # API service layer
├── store/                    # Redux store
└── types/                    # TypeScript interfaces
    └── pokemon.ts


## 📂 Tech Stack

-Typescript
-Next JS
-Tanstack React Query
-Redux
-Axios
-Shadcn UI
-Tailwind

## 📂 How to run project

Clone the repository using git clone [link_repository]
Install dependencies = npm install
create .env.local= {endpointAPIfromPOKEAPI}
run the development = npm run dev
