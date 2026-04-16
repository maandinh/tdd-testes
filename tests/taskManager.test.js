import { describe, it, expect } from 'vitest'
import { removeTask } from '../src/taskManager.js'

it('deve retornar a lista completa se o ID não existir', () => {
  const tasks = [
    { id: 1, title: 'A', completed: false }
  ]

  const result = removeTask(tasks, 999)

  expect(result).toEqual(tasks)
})