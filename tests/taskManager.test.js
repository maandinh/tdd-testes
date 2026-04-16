import { describe, it, expect } from 'vitest'
import { removeTask, filterTasks, countTasks, countCompleted } from '../src/taskManager.js'

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

describe('filterTasks', () => {
  it('deve retornar todas as tarefas quando o filtro for "all"', () => {
    const tasks = [
      { id: 1, title: 'A', completed: false },
      { id: 2, title: 'B', completed: true }
    ]

    const result = filterTasks(tasks, 'all')

    expect(result).toEqual(tasks)
  })
})

it('deve retornar apenas tarefas pendentes', () => {
  const tasks = [
    { id: 1, title: 'A', completed: false },
    { id: 2, title: 'B', completed: true }
  ]

  const result = filterTasks(tasks, 'pending')

  expect(result).toEqual([
    { id: 1, title: 'A', completed: false }
  ])
})

it('deve retornar apenas tarefas concluídas', () => {
  const tasks = [
    { id: 1, title: 'A', completed: false },
    { id: 2, title: 'B', completed: true }
  ]

  const result = filterTasks(tasks, 'completed')

  expect(result).toEqual([
    { id: 2, title: 'B', completed: true }
  ])
})

it('deve retornar todas as tarefas quando o filtro for desconhecido', () => {
  const tasks = [
    { id: 1, title: 'A', completed: false },
    { id: 2, title: 'B', completed: true }
  ]

  const result = filterTasks(tasks, 'qualquerCoisa')

  expect(result).toEqual(tasks)
})

it('deve retornar array vazio quando não houver tarefas', () => {
  const result = filterTasks([], 'all')

  expect(result).toEqual([])
})

it('não deve modificar o array original', () => {
  const tasks = [
    { id: 1, title: 'A', completed: false }
  ]

  const result = filterTasks(tasks, 'pending')

  expect(tasks).toEqual([
    { id: 1, title: 'A', completed: false }
  ])

  expect(result).not.toBe(tasks)
})

describe('countTasks', () => {
  it('deve retornar o total de tarefas', () => {
    const tasks = [
      { id: 1, completed: false },
      { id: 2, completed: true },
    ]

    expect(countTasks(tasks)).toBe(2)
  })
})

describe('countCompleted', () => {
  it('deve contar apenas tarefas concluídas', () => {
    const tasks = [
      { id: 1, completed: false },
      { id: 2, completed: true },
      { id: 3, completed: true }
    ]

    expect(countCompleted(tasks)).toBe(2)
  })
})