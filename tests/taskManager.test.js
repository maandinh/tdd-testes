import { describe, it, expect } from 'vitest'
import { removeTask } from '../src/taskManager.js'

describe('removeTask', () => {
  it('deve remover a tarefa correta pelo ID', () => {
    const tasks = [
      { id: 1, title: 'A', completed: false },
      { id: 2, title: 'B', completed: false }
    ]

    const result = removeTask(tasks, 1)

    expect(result).toEqual([
      { id: 2, title: 'B', completed: false }
    ])
  })
})