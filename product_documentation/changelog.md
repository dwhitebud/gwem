# Changelog

All notable changes to GWEM will be documented in this file.

## [Unreleased]

### Added
- New Portfolio Management page with dedicated sections:
  - Portfolio Overview with total assets, YTD performance, and risk score
  - Asset Allocation visualization section
  - Recent Activities tracking
- Portfolio-specific layout component for future extensibility
- Navigation link to Portfolio Management in main navigation bar
- Comprehensive brand guide with typography, colors, and component specifications
- Tailwind CSS integration with custom configuration
- Component-based styling system with predefined classes
- Custom color palette and design tokens
- Responsive design breakpoints and spacing scale
- Enhanced dashboard layout with portfolio summary section
- New feature cards for core functionality:
  - Portfolio Management
  - Trust & Corporate Assets
  - Advisor Hub
  - Tax Planning
  - Risk Analysis
  - Reports & Analytics
- New Advisor Hub (/advisor-hub) with comprehensive features:
  - Real-time chat interface with message history
  - Email composition system
  - Meeting scheduler with calendar integration
  - Document sharing and management system
- Tabbed interface in Advisor Hub for easy navigation
- Modern UI components using Tailwind CSS and Headless UI
- Status indicators for document sharing
- File upload functionality
- Meeting duration options and participant management
- New Tax Planning page (/tax-planning) with comprehensive features:
  - Multi-year tax forecasting with configurable projection periods (3, 5, or 10 years)
  - Multi-entity planning support (Personal, Business, Trust)
  - Interactive entity selector interface
  - Tax projections visualization with tabular display
  - Potential savings calculations and insights
  - Responsive layout with entity selection sidebar
- New TypeScript interfaces for tax planning:
  - TaxEntity type definitions
  - TaxProjection type definitions
- Tax planning components:
  - EntitySelector component for managing multiple tax entities
  - TaxProjections component for visualizing multi-year forecasts

### Changed
- Updated global CSS with new design system implementation
- Modernized UI components with Sequence-inspired design
- Enhanced typography system using Helvetica as primary font
- Redesigned page.tsx to align with brand guidelines:
  - Implemented brand color palette (#025584, #00D47E)
  - Updated component styling (cards, buttons, navigation)
  - Added proper spacing and layout according to brand specifications
  - Enhanced interactive elements with branded hover states
- Improved navigation bar with branded buttons and color scheme
- Updated portfolio summary section with branded design tokens
- Updated homepage navigation to correctly link to Advisor Hub
- Fixed advisor chat message formatting
- Updated import paths to use relative paths for better module resolution
- Fixed module resolution issues in tax planning components

### Deprecated
- Previous global CSS styling approach
- Legacy color variables

### Removed
- N/A

### Fixed
- Standardized design tokens across the application
- Unified shadow and border radius values
- Consistent typography hierarchy in dashboard
- Proper color contrast for accessibility
- Standardized padding and margin values

### Security
- N/A
