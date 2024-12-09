# Technical Documentation

## Architecture Overview

GWEM is built using Next.js 13+ with TypeScript, leveraging the new App Router architecture.

### Tech Stack
- Next.js 13+
- TypeScript
- Tailwind CSS
- React 18

### Project Structure
```
gwem/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout component
│   │   ├── globals.css     # Global styles and Tailwind configuration
│   │   ├── page.tsx        # Home page component
│   │   └── portfolio/      # Portfolio management section
│   │       ├── page.tsx    # Portfolio page component
│   │       └── layout.tsx  # Portfolio layout component
│   │   └── tax-planning/    # Tax planning section
│   │       ├── page.tsx     # Tax planning page component
│   │       └── layout.tsx   # Tax planning layout component
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
