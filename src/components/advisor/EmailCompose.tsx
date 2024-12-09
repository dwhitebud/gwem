import { useState } from 'react'

export default function EmailCompose() {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would integrate with your email service
    console.log('Sending email:', formData)
    // Reset form
    setFormData({ to: '', subject: '', message: '' })
  }

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="to" className="block text-sm font-medium text-gray-700">
            To
          </label>
          <div className="mt-1">
            <input
              type="email"
              name="to"
              id="to"
              value={formData.to}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="advisor@example.com"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <div className="mt-1">
            <textarea
              id="message"
              name="message"
              rows={8}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Send Email
          </button>
        </div>
      </form>
    </div>
  )
}
