# Technical Documentation

## Architecture Overview

GWEM is built using Next.js 13+ with TypeScript, leveraging the new App Router architecture.

### Tech Stack
- Next.js 13+
- TypeScript
- Tailwind CSS
- React 18
- Headless UI

### Project Structure
```
gwem/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout component with global navigation
│   │   ├── globals.css     # Global styles and Tailwind configuration
│   │   ├── page.tsx        # Home page component
│   │   ├── portfolio/      # Portfolio management section
│   │   │   ├── page.tsx    # Portfolio page component
│   │   │   └── layout.tsx  # Portfolio layout component
│   │   ├── tax-planning/   # Tax planning section
│   │   │   ├── page.tsx    # Tax planning page component
│   │   │   └── layout.tsx  # Tax planning layout component
│   │   ├── reports/        # Reports & Analytics section
│   │   │   ├── page.tsx    # Reports page component
│   │   │   └── layout.tsx  # Reports layout component
│   │   └── advisor-hub/    # Advisor Hub section
│   │       ├── page.tsx    # Main advisor hub page (Chat)
│   │       ├── email/      # Email composition section
│   │       │   └── page.tsx
│   │       ├── schedule/   # Meeting scheduler section
│   │       │   └── page.tsx
│   │       └── documents/  # Document sharing section
│   │           └── page.tsx
├── public/                 # Static assets
├── product_documentation/  # Product documentation
└── tailwind.config.js      # Tailwind configuration
```

## Getting Started

### Prerequisites
- Node.js 16.8 or later
- npm or yarn package manager

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`

## Development Guidelines

### Client Components
When using interactive components or browser APIs:
1. Add 'use client' directive at the top of the file
2. Place directive before any imports
3. Ensure proper TypeScript types for component props and callbacks
4. Use proper import paths for client-side libraries

### Design System
GWEM follows a comprehensive design system inspired by modern financial interfaces:

#### Colors
- Primary: Deep Teal (`#025584`)
- Secondary: Bright Green (`#00D47E`)
- Status colors for success, pending, and error states

#### Typography
- Primary font: Helvetica
- Font weights: Regular, Medium, SemiBold, Bold
- Consistent text scales through Tailwind configuration

#### Components
Pre-built components using Tailwind classes:
- `.card` - Card containers
- `.btn-primary` - Primary action buttons
- `.btn-secondary` - Secondary action buttons
- `.nav-item` - Navigation items

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper type definitions
- Follow ESLint and Prettier configurations
- Use Tailwind utility classes for styling
- Add proper type annotations for callback functions

## Advisor Hub

### Overview
The Advisor Hub is a comprehensive communication and collaboration platform built using Next.js and React. It provides a centralized location for users to interact with their financial planners, lawyers, and other professionals.

### Components

#### AdvisorHub.tsx
- Main container component using Headless UI's Tab component
- Manages tab state and navigation between features
- Implements responsive design using Tailwind CSS

#### Chat.tsx
- Real-time chat interface with message history
- Implements message threading and timestamps
- Supports different message types (user/advisor)
- Uses React state for message management

#### EmailCompose.tsx
- Email composition interface
- Form validation for required fields
- Ready for integration with email service providers
- Responsive design for all screen sizes

#### MeetingScheduler.tsx
- Calendar-based meeting scheduling
- Support for multiple time zones
- Duration selection (15, 30, 45, 60 minutes)
- Participant management system

#### DocumentSharing.tsx
- Document upload and management interface
- Status tracking for shared documents
- File type and size validation
- List view with sorting and filtering capabilities

### Integration Points
- Email service integration point in EmailCompose.tsx
- Calendar service integration point in MeetingScheduler.tsx
- File storage service integration point in DocumentSharing.tsx
- Real-time messaging service integration point in Chat.tsx

### Security Considerations
- All communication should be encrypted
- File uploads should be scanned for malware
- User authentication required for all features
- Rate limiting on API endpoints

## Tax Planning

### Overview
The tax planning feature is designed to help users visualize and manage their tax obligations.

### Tax Planning Components

The tax planning feature is implemented using several TypeScript components:

#### TaxProjections Component
- Purpose: Visualizes multi-year tax forecasts and potential savings
- Location: `src/components/tax-planning/TaxProjections.tsx`
- Key Features:
  - Dynamic year range selection (3, 5, 10 years)
  - Tabular display of projections
  - Tax planning insights section

#### EntitySelector Component
- Purpose: Manages selection of tax entities for planning
- Location: `src/components/tax-planning/EntitySelector.tsx`
- Key Features:
  - Multiple entity type support
  - Interactive checkbox interface
  - Real-time entity selection updates

#### Type Definitions
- Location: `src/types/tax.ts`
- Key Types:
  - `TaxEntity`: Defines structure for tax entities
  - `TaxProjection`: Defines structure for tax projections

### Implementation Details

The tax planning feature follows these key principles:
- Modular component architecture
- Type-safe implementations using TypeScript
- Responsive design using Tailwind CSS
- Real-time updates using React state management

## Risk Analysis

### Overview
The risk analysis feature provides comprehensive portfolio risk assessment and visualization tools.

### Risk Analysis Components

The risk analysis feature is implemented using several TypeScript components:

#### RiskAnalysisDashboard Component
- Purpose: Main container component for risk analysis features
- Location: `src/components/risk-analysis/RiskAnalysisDashboard.tsx`
- Key Features:
  - Tabbed interface using Headless UI
  - Manages navigation between risk analysis views
  - Client-side component with interactive elements

#### RiskMetrics Component
- Purpose: Displays key risk indicators and metrics
- Location: `src/components/risk-analysis/RiskMetrics.tsx`
- Key Features:
  - Portfolio Beta tracking
  - Value at Risk (VaR) calculation
  - Sharpe Ratio display
  - Visual indicators for metric changes

#### RiskBreakdown Component
- Purpose: Visualizes risk distribution across asset classes
- Location: `src/components/risk-analysis/RiskBreakdown.tsx`
- Key Features:
  - D3.js-based bar chart visualization
  - Interactive data display
  - Responsive design
  - Client-side rendering with React hooks

#### RiskTrends Component
- Purpose: Shows historical risk metrics over time
- Location: `src/components/risk-analysis/RiskTrends.tsx`
- Key Features:
  - D3.js line chart for trend visualization
  - Interactive data points
  - Statistical analysis display
  - Client-side rendering with React hooks

### Implementation Details

The risk analysis feature follows these key principles:
- Client-side components for interactive visualizations
- D3.js integration for data visualization
- Responsive design using Tailwind CSS
- Type-safe implementations using TypeScript
- Real-time updates using React state management

### Data Visualization
- D3.js is used for creating interactive charts
- SVG-based visualizations for better scaling
- Responsive design principles for all screen sizes
- Custom color schemes matching brand guidelines

## Reports & Analytics

### Overview
The Reports & Analytics section provides comprehensive reporting and analytics capabilities using Headless UI for the tab interface and custom components for various report types.

### Components

#### ReportsDashboard.tsx
- Main container component using Headless UI Tab components
- Client-side component with interactive tabs
- Manages tab state for different report types
- Implements responsive design using Tailwind CSS

#### PerformanceMetrics.tsx
- Displays key performance indicators
- Shows trends and changes over time
- Uses HeroIcons for visual indicators
- Responsive grid layout for metrics

#### PortfolioAnalytics.tsx
- Asset allocation breakdown
- Sector distribution visualization
- Progress bar components for percentages
- Clean, modern design with Tailwind CSS

#### CustomReports.tsx
- Report generation interface
- Download functionality for reports
- List view of available reports
- Last generated timestamps

### Implementation Details

#### Tab Components
```typescript
import { Tab, TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/react';

// Example usage with proper typing
<Tab
  className={({ selected }: { selected: boolean }) =>
    classNames(
      'base-classes',
      selected ? 'selected-classes' : 'unselected-classes'
    )
  }
>
  {/* Tab content */}
</Tab>
```

## Component Architecture

### Navigation System

#### Global Navigation
- Component: `src/components/shared/Navigation.tsx`
- Purpose: Provides consistent navigation across all pages
- Features:
  - Main navigation items (Portfolio, Risk Analysis, Reports, etc.)
  - Dropdown menus for sub-sections
  - Active state indicators
  - Notifications and settings buttons
  - Contact advisor button

#### Route-Based Navigation
The application uses Next.js App Router for navigation:
- Each major section has its own directory in `src/app`
- Sub-sections are nested directories (e.g., `advisor-hub/email`)
- Pages use the `page.tsx` convention for routing
- Layouts (`layout.tsx`) provide section-specific UI wrappers

#### Advisor Hub Navigation
- Component: `src/components/advisor/AdvisorHub.tsx`
- Sub-navigation implementation:
  - Route-based approach using Next.js navigation
  - URL-driven content rendering
  - Active state management using `usePathname`
  - Consistent styling with global navigation

## Testing Plan

### Jest Testing Framework
Jest is our primary testing framework for unit and integration testing in GWEM.

#### Setup and Configuration
- Run tests: `npm test`
- Watch mode: `npm test -- --watch`
- Coverage report: `npm test -- --coverage`

#### Test Structure
```
__tests__/
├── components/     # Component tests
├── utils/         # Utility function tests
└── hooks/         # Custom hooks tests
```

#### Testing Guidelines
1. **Component Testing**
   - Test component rendering
   - Test prop changes
   - Test user interactions
   - Test error states

2. **Utility Function Testing**
   - Test input/output
   - Test edge cases
   - Test error handling

3. **Custom Hook Testing**
   - Test state changes
   - Test effect behaviors
   - Test cleanup functions

#### Best Practices
- Use descriptive test names
- Follow the AAA pattern (Arrange, Act, Assert)
- Keep tests focused and isolated
- Mock external dependencies when needed
- Write meaningful assertions

#### Example Test Structure
```javascript
describe('ComponentName', () => {
  beforeEach(() => {
    // Setup before each test
  });

  test('should render correctly', () => {
    // Test implementation
  });

  test('should handle user interaction', () => {
    // Test implementation
  });
});
