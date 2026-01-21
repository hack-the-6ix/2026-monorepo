# Hack the 6ix 2026 Monorepo

A monorepo for Hack the 6ix 2026 hackathon platform using pnpm workspaces.

## Structure
```
2026-monorepo/
├── apps/
│   ├── landing/          # Main landing page (2026.hackthe6ix.com)
│   ├── apply/            # Application portal (2026.apply.hackthe6ix.com)
│   ├── dashboard/        # Hacker dashboard (2026.dash.hackthe6ix.com)
│   └── api-server/       # Backend API server
├── packages/
│   ├── ui/               # Shared React components
│   └── utils/            # Shared utilities
└── configs/
    ├── eslint-config/    # Shared ESLint configuration
    ├── tailwind-config/  # Shared Tailwind configuration
    └── typescript-config/# Shared TypeScript configuration
```

## Getting Started

### Prerequisites
- Node.js >= 18
- pnpm >= 8

### Installation
```bash
pnpm install
```

### Development

Run all apps in parallel:
```bash
pnpm dev
```

Run individual apps at root:
```bash
pnpm dev:landing    # http://localhost:3000
pnpm dev:apply      # http://localhost:3001
pnpm dev:dash       # http://localhost:3002
pnpm dev:api        # http://localhost:4000
```
or go into the individual app folder and 
```bash
pnpm dev
```

### Type Checking
```bash
pnpm type-check
```

### Linting
```bash
pnpm lint
```

## Shared Packages

### @hackthe6ix/ui
Shared React components (Button, Card, Input, etc.)

### @hackthe6ix/utils
Shared utility functions (formatDate, cn, etc.)

### @hackthe6ix/eslint-config
Shared ESLint configurations for Next.js and Node.js

### @hackthe6ix/tailwind-config
Shared Tailwind CSS configuration with brand colors

### @hackthe6ix/typescript-config
Shared TypeScript configurations for different environments