# Testing Guide

## Overview
This guide outlines the testing strategy and practices for the GWEM project. We use Jest as our primary testing framework along with React Testing Library for component testing.

## Testing Philosophy
- Write tests that mirror how users interact with the application
- Focus on behavior rather than implementation details
- Maintain high test coverage without sacrificing test quality
- Test both success and error scenarios

## Test Types

### 1. Unit Tests
- Test individual functions and components in isolation
- Located in `__tests__` directory, mirroring the source structure
- Filename pattern: `[ComponentName].test.tsx`

Example:
```typescript
import { render, screen } from '@testing-library/react'
import DashboardOverview from '@/components/dashboard/DashboardOverview'

describe('DashboardOverview', () => {
  it('renders dashboard title', () => {
    render(<DashboardOverview />)
    expect(screen.getByRole('heading')).toHaveTextContent('Dashboard')
  })
})
```

### 2. Integration Tests
- Test multiple components working together
- Focus on user workflows and component interactions
- Use mock data for external dependencies

Example:
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '@/context/ThemeContext'
import Dashboard from '@/components/Dashboard'

describe('Dashboard Integration', () => {
  it('updates theme when theme switcher is clicked', () => {
    render(
      <ThemeProvider>
        <Dashboard />
      </ThemeProvider>
    )
    const themeSwitch = screen.getByRole('button', { name: /switch theme/i })
    fireEvent.click(themeSwitch)
    expect(screen.getByTestId('dashboard')).toHaveClass('dark')
  })
})
```

## Testing Tools

### Primary Tools
- Jest: Testing framework
- React Testing Library: Component testing
- jest-dom: Custom DOM element matchers

### Test Commands
- `npm test`: Run all tests
- `npm test -- --watch`: Run tests in watch mode
- `npm test -- --coverage`: Generate coverage report

## Best Practices

### 1. Component Testing
- Test component rendering
- Test user interactions
- Test prop changes
- Test error states
- Use semantic queries (getByRole, getByLabelText)
- Avoid testing implementation details

### 2. Test Structure
```typescript
describe('ComponentName', () => {
  // Setup (if needed)
  beforeEach(() => {
    // Common setup
  })

  // Happy path tests
  it('renders successfully', () => {})
  it('handles user interaction', () => {})

  // Error cases
  it('displays error message when API fails', () => {})

  // Edge cases
  it('handles empty data', () => {})
})
```

### 3. Mocking
- Mock external dependencies using Jest mock functions
- Create dedicated mock files in `__mocks__` directory
- Use MSW for API mocking when needed

Example:
```typescript
jest.mock('@/services/api', () => ({
  fetchData: jest.fn()
}))
```

### 4. Coverage Requirements
- Minimum 80% coverage for new code
- 100% coverage for critical business logic
- Run coverage reports before merging PRs

## Test Organization
```
__tests__/
├── components/          # Component tests
│   ├── common/         # Shared component tests
│   └── dashboard/      # Dashboard component tests
├── hooks/              # Custom hooks tests
├── utils/              # Utility function tests
└── integration/        # Integration tests
```

## Common Patterns

### 1. Testing Hooks
```typescript
import { renderHook, act } from '@testing-library/react'
import useTheme from '@/hooks/useTheme'

test('useTheme changes theme mode', () => {
  const { result } = renderHook(() => useTheme())
  act(() => {
    result.current.toggleTheme()
  })
  expect(result.current.theme).toBe('dark')
})
```

### 2. Testing Async Operations
```typescript
test('loads and displays data', async () => {
  render(<DataComponent />)
  expect(screen.getByText('Loading...')).toBeInTheDocument()
  await screen.findByText('Data loaded')
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
})
```

## Debugging Tests
- Use `screen.debug()` to print the current DOM state
- Use `console.log` within tests for debugging
- Run specific tests using `npm test -- -t "test name"`

## CI/CD Integration
- Tests run automatically on pull requests
- Coverage reports are generated and uploaded
- Failed tests block merging

## Resources
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
