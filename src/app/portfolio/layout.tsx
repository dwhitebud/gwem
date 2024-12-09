import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio Management - GWEM',
  description: 'Manage your investment portfolio and asset allocations',
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
