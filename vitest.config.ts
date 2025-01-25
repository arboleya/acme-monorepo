import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    workspace: ['packages/*'],
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reporter: ['json', 'text', 'html'],
      include: ['packages/**/*.ts', 'apps/**/*.ts'],
      exclude: ['**/docs', '**/dist', '**/scripts', '**/coverage', '**/run.ts'],
    },
    poolOptions: {
      threads: {
        minThreads: 1,
        maxThreads: 16,
      },
    },
  },
})
