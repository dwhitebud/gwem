import { render } from '@testing-library/react'
import RootLayout from '../../app/layout'

describe('RootLayout', () => {
  it('renders children correctly', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )
    
    expect(container).toBeInTheDocument()
    expect(container).toHaveTextContent('Test Content')
  })
})
