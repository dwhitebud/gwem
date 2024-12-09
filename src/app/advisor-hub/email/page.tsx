import { Metadata } from 'next'
import AdvisorHub from '@/components/advisor/AdvisorHub'

export const metadata: Metadata = {
  title: 'Email | Advisor Hub | GWEM',
  description: 'Send and receive emails with your advisors',
}

export default function AdvisorHubEmailPage() {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <AdvisorHub />
      </div>
    </main>
  )
}
