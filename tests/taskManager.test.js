import { describe, it, expect } from 'vitest'
import { removeTask } from '../src/taskManager.js'

it('deve retornar array vazio se a lista estiver vazia', () => {
  const result = removeTask([], 1)

  expect(result).toEqual([])
})