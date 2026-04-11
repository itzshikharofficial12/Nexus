'use client'

import { useTaskStore } from '@/store/taskStore'
import { useState } from 'react'

export default function TaskList() {
  const { tasks, addTask, toggleTask, removeTask } = useTaskStore()
  const [input, setInput] = useState('')

  const handleAddTask = () => {
    if (input.trim()) {
      addTask(input)
      setInput('')
    }
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg hover:border-blue-500/40 hover:shadow-blue-500/10 transition-all duration-200">
      <h2 className="text-lg font-semibold text-white mb-4">Tasks</h2>

      {/* Tasks List */}
      <div className="space-y-4 mb-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg border border-zinc-700 hover:border-zinc-600 transition-colors group"
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="w-4 h-4 rounded border-zinc-600 accent-blue-500 cursor-pointer"
            />
            <span
              className={`flex-1 text-sm ${
                task.completed ? 'line-through text-zinc-400' : 'text-zinc-200'
              }`}
            >
              {task.title}
            </span>
            <button
              onClick={() => removeTask(task.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 text-xs text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Add Task Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          placeholder="Add a new task..."
          className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
        />
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  )
}
