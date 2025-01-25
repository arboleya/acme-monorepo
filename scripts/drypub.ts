import { log } from 'node:console'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { globby } from 'globby'

const paths = await globby(['**/*package.json', '!node_modules'])

/**
 * Will override all `package.json` files, spreading the
 * inner properties from `publishConfig` in the root node.
 *
 * This is the same behavior that takes place during publish.
 * - Packages are linked by Javascript files (not Typescript)
 *
 * CI must always use this before running tests.
 */
for (const path of paths) {
  const fullpath = join(process.cwd(), path)
  const pkgJson = require(fullpath)

  if (pkgJson.publishConfig) {
    const publishConfig = { ...pkgJson.publishConfig }
    pkgJson.publishConfig = undefined

    const newPkgJson = {
      ...pkgJson,
      ...publishConfig,
    }

    const newPkgJsonStr = JSON.stringify(newPkgJson, null, 2)

    writeFileSync(fullpath, `${newPkgJsonStr}\n`)
    log(path)
  }
}
