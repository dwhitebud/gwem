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
          <label htmlFor="to" className="block text-sm font-medium text-[#025584]">
            To
          </label>
          <div className="mt-2">
            <input
              type="email"
              name="to"
              id="to"
              value={formData.to}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              className="shadow-[0_2px_4px_rgba(0,0,0,0.1)] focus:ring-[#00D47E] focus:border-[#00D47E] block w-full text-sm border-[#E5E7EB] rounded-xl p-3"
              placeholder="advisor@example.com"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-[#025584]">
            Subject
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="shadow-[0_2px_4px_rgba(0,0,0,0.1)] focus:ring-[#00D47E] focus:border-[#00D47E] block w-full text-sm border-[#E5E7EB] rounded-xl p-3"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[#025584]">
            Message
          </label>
          <div className="mt-2">
            <textarea
              id="message"
              name="message"
              rows={8}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="shadow-[0_2px_4px_rgba(0,0,0,0.1)] focus:ring-[#00D47E] focus:border-[#00D47E] block w-full text-sm border border-[#E5E7EB] rounded-xl p-3"
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg bg-[#00D47E] hover:bg-[#00D47ECC] text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00D47E]"
          >
            Send Email
          </button>
        </div>
      </form>
    </div>
  )
}
