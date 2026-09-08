import { useState, useEffect } from 'react'

const API_URL = 'https://devtrack-x2xl.onrender.com/api'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [loading, setLoading] = useState(true)

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_URL}/tasks`)
      const data = await res.json()
      setTasks(data)
    } catch (err) {
      console.error('Failed to fetch tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    try {
      await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, priority }),
      })
      setTitle('')
      setDescription('')
      setPriority('medium')
      fetchTasks()
    } catch (err) {
      console.error('Failed to create task:', err)
    }
  }

  const toggleStatus = async (task) => {
    const nextStatus =
      task.status === 'todo' ? 'in_progress' :
      task.status === 'in_progress' ? 'done' : 'todo'

    try {
      await fetch(`${API_URL}/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      })
      fetchTasks()
    } catch (err) {
      console.error('Failed to update task:', err)
    }
  }

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' })
      fetchTasks()
    } catch (err) {
      console.error('Failed to delete task:', err)
    }
  }

  const statusColor = {
    todo: 'bg-gray-200 text-gray-800',
    in_progress: 'bg-yellow-200 text-yellow-800',
    done: 'bg-green-200 text-green-800',
  }

  const priorityColor = {
    low: 'text-gray-500',
    medium: 'text-blue-600',
    high: 'text-red-600',
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">DevTrack</h1>

        {/* Create Task Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 mb-6 space-y-3">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
          />
          <div className="flex items-center gap-3">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Add Task
            </button>
          </div>
        </form>

        {/* Task List */}
        {loading ? (
          <p className="text-gray-500">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-500">No tasks yet. Add one above.</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li key={task.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{task.title}</h3>
                    {task.description && (
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${statusColor[task.status]}`}>
                        {task.status.replace('_', ' ')}
                      </span>
                      <span className={`text-xs font-medium ${priorityColor[task.priority]}`}>
                        {task.priority} priority
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleStatus(task)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Advance
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App