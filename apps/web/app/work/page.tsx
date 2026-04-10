'use client'

import TaskList from '@/features/work/components/TaskList'

export default function WorkPage() {
  return (
    <div className="flex gap-6 min-h-screen bg-zinc-950">
      {/* Main Content - Left Section (70%) */}
      <div className="flex-1">
        {/* Hero Section - Full Width */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 mb-6 text-white">
          <h1 className="text-4xl font-bold mb-2">Work Dashboard</h1>
          <p className="text-blue-100">Track your tasks, projects, and focus time</p>
        </div>

        {/* Grid Layout - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tasks - Left Column */}
          <TaskList />

          {/* Active Projects - Right Column */}
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Active Projects</h2>
            <div className="space-y-3">
              <div className="p-3 bg-zinc-800 rounded-lg border border-zinc-700 hover:border-zinc-600 transition-colors cursor-pointer">
                <p className="text-sm font-medium text-white">Project</p>
                <p className="text-xs text-zinc-400 mt-1">Status</p>
              </div>
              <div className="p-3 bg-zinc-800 rounded-lg border border-zinc-700 hover:border-zinc-600 transition-colors cursor-pointer">
                <p className="text-sm font-medium text-white">Project</p>
                <p className="text-xs text-zinc-400 mt-1">Status</p>
              </div>
            </div>
            <button className="w-full mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
              New Project
            </button>
          </div>

          {/* Focus Timer - Left Column Below Tasks */}
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Focus Timer</h2>
            <div className="flex flex-col items-center justify-center py-8">
              <div className="text-5xl font-bold text-blue-400 mb-4">25:00</div>
              <div className="flex gap-3">
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                  Start
                </button>
                <button className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm font-medium transition-colors">
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Completed/Upcoming Projects - Right Column Below Projects */}
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Completed & Upcoming</h2>
            <div className="space-y-3">
              <div className="p-3 bg-zinc-800 rounded-lg border border-green-900/30 hover:border-green-800/50 transition-colors">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-zinc-300">Completed Project</p>
                  <span className="text-xs px-2 py-1 bg-green-900/30 text-green-300 rounded">Done</span>
                </div>
              </div>
              <div className="p-3 bg-zinc-800 rounded-lg border border-orange-900/30 hover:border-orange-800/50 transition-colors">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-zinc-300">Upcoming Project</p>
                  <span className="text-xs px-2 py-1 bg-orange-900/30 text-orange-300 rounded">Soon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Sticky (30%) */}
      <aside className="w-80 hidden lg:flex flex-col gap-6 sticky top-0 h-screen overflow-y-auto">
        {/* Quick Stats */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-400">Tasks Today</span>
              <span className="text-lg font-bold text-blue-400">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-400">In Progress</span>
              <span className="text-lg font-bold text-yellow-400">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-400">Completed</span>
              <span className="text-lg font-bold text-green-400">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-400">Focus Time</span>
              <span className="text-lg font-bold text-purple-400">0h</span>
            </div>
          </div>
        </div>

        {/* Ideas Input */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Ideas</h3>
          <textarea
            placeholder="Jot down your ideas..."
            className="w-full h-24 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 resize-none"
          />
          <button className="w-full mt-3 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
            Save
          </button>
        </div>

        {/* Links */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Resources
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Support
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}
