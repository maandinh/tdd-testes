export function removeTask(tasks, taskId) {
  return tasks.filter(task => task.id !== taskId)
}

export function filterTasks(tasks, status) {
  if (status === 'all') {
    return tasks
  }

  if (status === 'pending') {
    return tasks.filter(task => !task.completed)
  }

    if (status === 'completed') {
    return tasks.filter(task => task.completed)
  }

  return tasks
}

export function countTasks(tasks) {
  return tasks.length
}

export function countCompleted(tasks) {
  return tasks.filter(t => t.completed).length
}

export function countPending(tasks) {
  return tasks.filter(t => !t.completed).length
}

