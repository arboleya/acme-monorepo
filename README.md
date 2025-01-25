# Typescript Buildless Development Environment

This Proof of Concept (PoC) explores an alternative approach for running this repository in two distinct modes:
- **TypeScript (Source Mode):** Ideal for local development, running local tests, and other development-time tasks. In this mode, all operations run directly from the TypeScript source files, eliminating the need for a build step.
- **JavaScript (Built Mode):** Suited for CI environments, remote test execution, and preparing packages for NPM publishing. In this mode, exemplified by the `drypub` script, all operations run from the transpiled JavaScript files.

To achieve this, we employ the following strategies:
1. Configure `package.json` fields (like `main`, `module`, `types`, `bin`) to point to TypeScript files for Source Mode.
2. Utilize `publishConfig` in `package.json` files to override these paths, pointing to the corresponding JavaScript files for Built Mode. This ensures that published packages use the transpiled code.
3. Employ TSX shebangs (`#!/usr/bin/env tsx`) in executable TypeScript files, allowing them to be run directly from source.

With these three steps, we can develop and operate entirely from source code, significantly reducing build times during local development.

# Stack

- Env: `Node` | `Bun`
- Pkg: `PNPM` | `Bun`
- Test: `Vitest` | `Bun`
- Lint: `Biome`
- Lang: `Typescript`

# Dir Structure

```console
❯ tree acme-monorepo -L 4 --dirsfirst
acme-monorepo
├── apps
│   └── docs
│       ├── src
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
├── packages
│   ├── acme
│   │   ├── src
│   │   │   ├── acme.test.ts
│   │   │   ├── acme.ts
│   │   │   └── run.ts
│   │   ├── acme.mjs
│   │   ├── acme.mts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── create-acme
│       ├── src
│       │   ├── create-acme.test.ts
│       │   ├── create-acme.ts
│       │   └── run.ts
│       ├── create-acme.mjs
│       ├── create-acme.mts
│       ├── package.json
│       └── tsconfig.json
├── scripts
│   ├── bunshift.ts
│   └── drypub.ts
├── tests
│   └── integration
│       ├── main.test.ts
│       ├── package.json
│       └── tsconfig.json
├── README.md
├── biome.json
├── package.json
└── tsconfig.json

12 directories, 26 files
```

# Scripts

Common:
- `build` — Builds all project components (this is optional for local development but required for Built Mode).
- `test` — Runs all tests across the monorepo.
- `lint` — Performs static code analysis to find and report potential issues.
- `lintfix` — Automatically fixes linting issues where possible.
- `format` — Checks code formatting consistency.
- `formatfix` — Automatically formats code to adhere to defined styles.

Special:
- `drypub` — Simulates a publish dry-run. It merges `publishConfig` settings into the root of all `package.json` files, effectively switching the repository to operate as if it were using the built JavaScript assets. This is crucial for testing the Built Mode.
- `bunshift` — Switches the primary testing framework from `vitest` to `bun:test`.

CI (Continuous Integration):
- `ci:pnpm` — CI script optimized for PNPM and Vitest.
- `ci:bun` — CI script optimized for Bun and `bun:test`.

# Oneliners

## Bun: Source Mode

```shell
git reset --hard && \
  bun install && \
  bun run bunshift && \
  bun run test
```

## Bun: Built Mode

```shell
git reset --hard && \
  bun install && \
  bun run bunshift && \
  bun run build && \
  bun run drypub && \
  bun run test
```

## PNPM: Source Mode

```shell
git reset --hard && \
  pnpm install && \
  pnpm run test
```

## PNPM: Built Mode

```shell
git reset --hard && \
  pnpm install && \
  pnpm run build && \
  pnpm run drypub && \
  pnpm run test
```
