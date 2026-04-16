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
}
