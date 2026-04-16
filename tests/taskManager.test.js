import { describe, it, expect } from 'vitest'
import { removeTask } from '../src/taskManager.js'

it('não deve modificar o array original', () => {
  const tasks = [
    { id: 1, title: 'A', completed: false }
  ]

  const result = removeTask(tasks, 1)

  expect(tasks).toEqual([
    { id: 1, title: 'A', completed: false }
  ])

  expect(result).not.toBe(tasks)
})