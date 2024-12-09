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
- New Risk Analysis page (/risk-analysis) with comprehensive features:
  - Interactive dashboard with tabbed interface
  - Key risk metrics display (Portfolio Beta, Value at Risk, Sharpe Ratio)
  - Risk breakdown visualization by asset class using D3.js
  - Historical risk trends with interactive charts
  - Risk analysis insights and statistics
- New components for risk analysis:
  - RiskAnalysisDashboard component with tab management
  - RiskMetrics component for key risk indicators
  - RiskBreakdown component for asset class risk distribution
  - RiskTrends component for historical risk analysis
- New Reports & Analytics page (/reports) with comprehensive features:
  - Interactive dashboard with tabbed interface using Headless UI
  - Performance Metrics section with KPIs and trends
  - Portfolio Analytics with asset allocation and sector distribution
  - Custom Reports generation and download functionality
- New components for Reports & Analytics:
  - ReportsDashboard component with tab management
  - PerformanceMetrics component for KPI display
  - PortfolioAnalytics component for portfolio breakdowns
  - CustomReports component for report generation
- Added @headlessui/react for tab components
- Added @heroicons/react for UI icons

### Changed
- Updated global CSS with new design system implementation
- Modernized UI components with Sequence-inspired design
- Enhanced typography system using Helvetica as primary font
- Refined AdvisorHub components for brand consistency:
  - Updated DocumentSharing with brand-compliant status indicators
  - Enhanced EmailCompose form styling and interactions
  - Improved MeetingScheduler layout and form elements
  - Modernized Chat interface with brand colors and improved spacing
- Implemented comprehensive brand guide styling across Advisor Hub:
  - Updated color scheme to use Deep Teal (#025584) and Bright Green (#00D47E)
  - Standardized component styling with consistent border radius (12px)
  - Applied uniform shadow styling (0 2px 4px rgba(0, 0, 0, 0.1))
  - Improved spacing and padding consistency
  - Enhanced button and input field styling
- Redesigned page.tsx to align with brand guidelines:
  - Implemented brand color palette (#025584, #00D47E)
  - Updated component styling (cards, buttons, navigation)
  - Added proper spacing and layout according to brand specifications
  - Enhanced interactive elements with branded hover states
- Improved navigation bar with branded buttons and color scheme
- Updated portfolio summary section with branded design tokens
- Updated homepage navigation to correctly link to Advisor Hub
- Updated homepage navigation to correctly link to Risk Analysis page
- Fixed advisor chat message formatting
- Updated import paths to use relative paths for better module resolution
- Fixed module resolution issues in tax planning components
- Added client-side component directives to risk analysis components for proper React hooks usage
- Updated ReportsDashboard component to use proper Headless UI Tab imports
- Added 'use client' directive to ReportsDashboard for client-side interactivity
- Fixed TypeScript types in ReportsDashboard tab components
- Standardized navigation across all components using the shared Navigation component
- Removed duplicate navigation from home dashboard in favor of global navigation
- Updated Advisor Hub navigation to use route-based approach instead of tabs
- Improved Advisor Hub URL structure for better SEO and user experience:
  - /advisor-hub (Chat interface)
  - /advisor-hub/email (Email composition)
  - /advisor-hub/schedule (Meeting scheduler)
  - /advisor-hub/documents (Document sharing)
- Enhanced Advisor Hub component organization with proper Next.js routing
- Updated page metadata for Advisor Hub sub-pages with descriptive titles and descriptions

### Deprecated
- Previous global CSS styling approach
- Legacy color variables

### Removed
- N/A

### Fixed
- Standardized design tokens across the application
- Unified shadow and border radius values
- Fixed module resolution issues with @headlessui/react Tab components
- Resolved client component function passing issues in ReportsDashboard
- Fixed tab component rendering in Reports page
