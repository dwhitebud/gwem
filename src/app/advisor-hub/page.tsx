import { Metadata } from 'next'
import AdvisorHub from '@/components/advisor/AdvisorHub'

export const metadata: Metadata = {
  title: 'Advisor Hub | GWEM',
  description: 'Coordinate with your financial planners, lawyers, and other professionals',
}

export default function AdvisorHubPage() {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <AdvisorHub />
      </div>
    </main>
  )
}
