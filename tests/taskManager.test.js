import { describe, it, expect } from 'vitest'
import { removeTask, filterTasks, countTasks, countCompleted, 
    countPending, createTask, validatePriority, filterByPriority, 
    isDuplicate, addTask, sortTasks, searchTasks } from '../src/taskManager.js'

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

describe('countPending', () => {
  it('deve contar apenas tarefas pendentes', () => {
    const tasks = [
      { id: 1, completed: false },
      { id: 2, completed: true },
      { id: 3, completed: false }
    ]

    expect(countPending(tasks)).toBe(2)
  })
})

describe('createTask com prioridade', () => {
  it('deve criar tarefa com prioridade informada', () => {
    const task = createTask('Estudar', 'high')

    expect(task.priority).toBe('high')
  })
})

it('deve usar prioridade "medium" por padrão', () => {
  const task = createTask('Estudar')

  expect(task.priority).toBe('medium')
})

describe('validatePriority', () => {
  it('deve retornar true para prioridades válidas', () => {
    expect(validatePriority('low')).toBe(true)
    expect(validatePriority('medium')).toBe(true)
    expect(validatePriority('high')).toBe(true)
  })

  it('deve retornar false para prioridade inválida', () => {
    expect(validatePriority('urgente')).toBe(false)
  })
})

it('deve usar "medium" quando prioridade for inválida', () => {
  const task = createTask('Estudar', 'invalida')

  expect(task.priority).toBe('medium')
})

describe('filterByPriority', () => {
  it('deve retornar apenas tarefas com prioridade informada', () => {
    const tasks = [
      { id: 1, title: 'A', completed: false, priority: 'low' },
      { id: 2, title: 'B', completed: false, priority: 'high' },
      { id: 3, title: 'C', completed: false, priority: 'high' }
    ]

    const result = filterByPriority(tasks, 'high')

    expect(result).toEqual([
      { id: 2, title: 'B', completed: false, priority: 'high' },
      { id: 3, title: 'C', completed: false, priority: 'high' }
    ])
  })
})

it('deve retornar array vazio para prioridade inválida', () => {
  const tasks = [
    { id: 1, priority: 'low' }
  ]

  const result = filterByPriority(tasks, 'invalida')

  expect(result).toEqual([])
})

it('não deve modificar o array original', () => {
  const tasks = [
    { id: 1, priority: 'low' }
  ]

  const result = filterByPriority(tasks, 'low')

  expect(tasks).toEqual([
    { id: 1, priority: 'low' }
  ])

  expect(result).not.toBe(tasks)
})

describe('isDuplicate', () => {
  it('deve retornar true para título igual', () => {
    const tasks = [{ title: 'Estudar' }]

    expect(isDuplicate(tasks, 'Estudar')).toBe(true)
  })

  it('deve ser case-insensitive', () => {
    const tasks = [{ title: 'Estudar' }]

    expect(isDuplicate(tasks, 'estudar')).toBe(true)
  })

  it('deve ignorar espaços extras', () => {
    const tasks = [{ title: 'Estudar' }]

    expect(isDuplicate(tasks, '  Estudar  ')).toBe(true)
  })

  it('deve retornar false para título diferente', () => {
    const tasks = [{ title: 'Estudar' }]

    expect(isDuplicate(tasks, 'Trabalhar')).toBe(false)
  })
})

describe('addTask - duplicidade', () => {
  it('deve lançar erro ao adicionar tarefa duplicada', () => {
    const tasks = [{ id: 1, title: 'Estudar', completed: false }]

    expect(() => {
      addTask(tasks, 'Estudar')
    }).toThrow()
  })
})

describe('sortTasks', () => {
  it('deve ordenar tarefas colocando pendentes antes de concluídas', () => {
    const tasks = [
      { id: 1, completed: true },
      { id: 2, completed: false },
      { id: 3, completed: true },
      { id: 4, completed: false }
    ]

    const result = sortTasks(tasks)

    expect(result).toEqual([
      { id: 2, completed: false },
      { id: 4, completed: false },
      { id: 1, completed: true },
      { id: 3, completed: true }
    ])
  })
})

it('deve manter ordem se todas forem pendentes', () => {
  const tasks = [
    { id: 1, completed: false },
    { id: 2, completed: false }
  ]

  expect(sortTasks(tasks)).toEqual(tasks)
})

it('deve manter ordem se todas forem concluídas', () => {
  const tasks = [
    { id: 1, completed: true },
    { id: 2, completed: true }
  ]

  expect(sortTasks(tasks)).toEqual(tasks)
})

it('deve retornar array vazio para lista vazia', () => {
  expect(sortTasks([])).toEqual([])
})

it('não deve modificar o array original', () => {
  const tasks = [
    { id: 1, completed: true }
  ]

  const result = sortTasks(tasks)

  expect(tasks).toEqual([
    { id: 1, completed: true }
  ])

  expect(result).not.toBe(tasks)
})

describe('searchTasks', () => {
  it('deve encontrar tarefas que contenham o texto', () => {
    const tasks = [
      { title: 'Estudar' },
      { title: 'Testar' },
      { title: 'Trabalhar' }
    ]

    const result = searchTasks(tasks, 'est')

    expect(result).toEqual([
      { title: 'Estudar' },
      { title: 'Testar' }
    ])
  })
})