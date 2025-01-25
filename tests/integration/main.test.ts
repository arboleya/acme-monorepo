import { acme } from 'acme'
import { createAcme } from 'create-acme'
import { expect, test } from 'vitest'

test('gauge', () => {
  expect(acme()).toEqual('acme')
  expect(createAcme()).toEqual('create-acme')
})
