import { expect, test } from 'vitest'
import { createAcme } from './create-acme'

test('create-acme', () => {
  expect(createAcme()).toEqual('create-acme')
})
