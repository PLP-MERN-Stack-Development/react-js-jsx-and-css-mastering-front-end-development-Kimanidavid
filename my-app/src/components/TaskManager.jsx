import React, { useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import Button from './Button'
import Card from './Card'

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', [])
  const [newTaskText, setNewTaskText] = useState('')
  const [filter, setFilter] = useState('all') // all, active, completed

  // Add new task
  const addTask = (e) => {
    e.preventDefault()
    if (!newTaskText.trim()) return

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTaskText.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ])
    setNewTaskText('')
  }

  // Toggle task completion
  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  // Delete task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="mb-6">
        <form onSubmit={addTask} className="flex gap-4">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <Button type="submit" disabled={!newTaskText.trim()}>
            Add Task
          </Button>
        </form>
      </Card>

      <Card className="mb-6">
        <div className="flex gap-2 mb-4">
          <Button
            variant={filter === 'all' ? 'primary' : 'secondary'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'active' ? 'primary' : 'secondary'}
            onClick={() => setFilter('active')}
          >
            Active
          </Button>
          <Button
            variant={filter === 'completed' ? 'primary' : 'secondary'}
            onClick={() => setFilter('completed')}
          >
            Completed
          </Button>
        </div>

        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 bg-gray-50 
                       dark:bg-gray-800 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-5 h-5 text-blue-600 rounded 
                           focus:ring-blue-500 dark:focus:ring-blue-600
                           border-gray-300 dark:border-gray-600"
                />
                <span
                  className={`${
                    task.completed
                      ? 'line-through text-gray-500 dark:text-gray-400'
                      : 'text-gray-900 dark:text-gray-100'
                  }`}
                >
                  {task.text}
                </span>
              </div>
              <Button
                variant="danger"
                onClick={() => deleteTask(task.id)}
                className="ml-4"
              >
                Delete
              </Button>
            </div>
          ))}
          {filteredTasks.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No tasks found
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}

export default TaskManager