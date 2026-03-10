import { expect, test } from 'vitest'
import { add } from './math'

test('addiert 1 + 2 und ergibt 3', () => {
  expect(add(1, 2)).toBe(3)
})

test('funktioniert auch mit negativen Zahlen', () => {
  expect(add(-1, 5)).toBe(4)
})