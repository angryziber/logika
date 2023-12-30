import {test} from 'node:test'
import assert from 'node:assert'
import {calculateScore} from './score'

test('zero', () => {
  assert.deepEqual(calculateScore(['1'], ['0']), {correctPosition: 0, correctColor: 0})
})

test('one position', () => {
  assert.deepEqual(calculateScore(['1', '2'], ['1', '3']), {correctPosition: 1, correctColor: 0})
  assert.deepEqual(calculateScore(['1', '2', '3'], ['2', '2', '2']), {correctPosition: 1, correctColor: 0})
  assert.deepEqual(calculateScore(['2', '2', '2'], ['1', '2', '3']), {correctPosition: 1, correctColor: 0})
})

test('one color', () => {
  assert.deepEqual(calculateScore(['2', '1'], ['1', '3']), {correctPosition: 0, correctColor: 1})
})

test('with duplicates', () => {
  assert.deepEqual(calculateScore(['3', '1', '5', '2', '2'], ['1', '2', '2', '3', '4']), {correctPosition: 0, correctColor: 4})
})
