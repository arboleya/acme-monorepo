import { expect, test } from 'vitest'
import { acme } from './acme'

test('acme', () => {
  expect(acme()).toEqual('acme')
})
