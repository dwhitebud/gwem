import { useState } from 'react'
import { CalendarIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline'

export default function MeetingScheduler() {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    duration: '30',
    participants: '',
    description: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would integrate with your calendar service
    console.log('Scheduling meeting:', formData)
    // Reset form
    setFormData({
      title: '',
      date: '',
      time: '',
      duration: '30',
      participants: '',
      description: '',
    })
  }

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Meeting Title
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <div className="mt-1 relative">
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                required
              />
              <CalendarIcon className="h-5 w-5 text-gray-400 absolute right-3 top-2" />
            </div>
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <div className="mt-1 relative">
              <input
                type="time"
                name="time"
                id="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                required
              />
              <ClockIcon className="h-5 w-5 text-gray-400 absolute right-3 top-2" />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duration (minutes)
          </label>
          <select
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </div>

        <div>
          <label htmlFor="participants" className="block text-sm font-medium text-gray-700">
            Participants (email addresses)
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              name="participants"
              id="participants"
              value={formData.participants}
              onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
              className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter email addresses separated by commas"
              required
            />
            <UserGroupIcon className="h-5 w-5 text-gray-400 absolute right-3 top-2" />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Meeting Description
          </label>
          <div className="mt-1">
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Schedule Meeting
          </button>
        </div>
      </form>
    </div>
  )
}
