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
          <label htmlFor="title" className="block text-sm font-medium text-[#025584]">
            Meeting Title
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="shadow-[0_2px_4px_rgba(0,0,0,0.1)] focus:ring-[#00D47E] focus:border-[#00D47E] block w-full text-sm border-[#E5E7EB] rounded-xl p-3"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-[#025584]">
              Date
            </label>
            <div className="mt-2 relative">
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="shadow-[0_2px_4px_rgba(0,0,0,0.1)] focus:ring-[#00D47E] focus:border-[#00D47E] block w-full text-sm border-[#E5E7EB] rounded-xl p-3"
                required
              />
              <CalendarIcon className="h-5 w-5 text-[#02558499] absolute right-3 top-3" />
            </div>
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-[#025584]">
              Time
            </label>
            <div className="mt-2 relative">
              <input
                type="time"
                name="time"
                id="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="shadow-[0_2px_4px_rgba(0,0,0,0.1)] focus:ring-[#00D47E] focus:border-[#00D47E] block w-full text-sm border-[#E5E7EB] rounded-xl p-3"
                required
              />
              <ClockIcon className="h-5 w-5 text-[#02558499] absolute right-3 top-3" />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-[#025584]">
            Duration (minutes)
          </label>
          <select
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="mt-2 block w-full shadow-[0_2px_4px_rgba(0,0,0,0.1)] border-[#E5E7EB] focus:ring-[#00D47E] focus:border-[#00D47E] text-sm rounded-xl p-3"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </div>

        <div>
          <label htmlFor="participants" className="block text-sm font-medium text-[#025584]">
            Participants (email addresses)
          </label>
          <div className="mt-2 relative">
            <input
              type="text"
              name="participants"
              id="participants"
              value={formData.participants}
              onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
              className="shadow-[0_2px_4px_rgba(0,0,0,0.1)] focus:ring-[#00D47E] focus:border-[#00D47E] block w-full text-sm border-[#E5E7EB] rounded-xl p-3"
              placeholder="Enter email addresses separated by commas"
              required
            />
            <UserGroupIcon className="h-5 w-5 text-[#02558499] absolute right-3 top-3" />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-[#025584]">
            Meeting Description
          </label>
          <div className="mt-2">
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="shadow-[0_2px_4px_rgba(0,0,0,0.1)] focus:ring-[#00D47E] focus:border-[#00D47E] block w-full text-sm border-[#E5E7EB] rounded-xl p-3"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg bg-[#00D47E] hover:bg-[#00D47ECC] text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00D47E]"
          >
            Schedule Meeting
          </button>
        </div>
      </form>
    </div>
  )
}
