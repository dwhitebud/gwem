export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      <div className="flex-1">{children}</div>
    </div>
  )
}
