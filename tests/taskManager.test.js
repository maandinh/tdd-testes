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

it('deve retornar a lista completa se o ID não existir', () => {
  const tasks = [
    { id: 1, title: 'A', completed: false }
  ]

  const result = removeTask(tasks, 999)

  expect(result).toEqual(tasks)
})

it('deve retornar array vazio se a lista estiver vazia', () => {
  const result = removeTask([], 1)

  expect(result).toEqual([])
})

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