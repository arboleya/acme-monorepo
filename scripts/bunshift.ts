import { log } from 'node:console'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { $ } from 'bun'
import { globby } from 'globby'

/**
 * Shape-shift the project from `vitest` to `bun test`.
 */

// Remove deps from root `package.json`
await $`bun rm @vitest/coverage-istanbul vitest`

// Remove PNPM and Vitest stuff
await $`rm vitest.config.ts`
await $`rm pnpm-workspace.yaml`
await $`rm pnpm-lock.yaml`

// Replace `vitest` with `bun:test`
const fullpath = join(__dirname, '..', 'package.json')
const json = require(fullpath)
const contents = JSON.stringify(json, null, 2)
const newContents = contents.replace('vitest run', 'bun test')

writeFileSync(fullpath, `${newContents}\n`)

// All test files
const tests = await globby(['**/*.test.ts', '!node_modules'])

for (const path of tests) {
  const fullpath = join(process.cwd(), path)
  const contents = readFileSync(fullpath, 'utf8')
  const newContents = contents.replace('vitest', 'bun:test')
  writeFileSync(fullpath, newContents)
  log(path)
}
