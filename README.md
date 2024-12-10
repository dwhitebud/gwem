# GWEM (Global Wealth & Estate Management)

A comprehensive financial management platform designed for high net worth individuals to efficiently manage their complex financial portfolios.

## Features

- Real-time portfolio management and asset allocation
- Secure collaboration with financial planners and legal teams
- Multi-layered asset structure management (trusts, corporations)
- Comprehensive financial analytics and reporting

## Tech Stack

- Next.js 13+ with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- ESLint for code quality
- Jest & React Testing Library for testing

## Getting Started

1. Clone the repository
2. Copy the environment configuration:
   ```bash
   cp .env.example .env.local
   ```
3. Set up your environment variables in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `PLAID_CLIENT_ID`: Your Plaid client ID
   - `PLAID_SECRET`: Your Plaid secret key
   - `PLAID_ENV`: Your Plaid environment (sandbox/development/production)

4. Install dependencies:
   ```bash
   npm install
   ```
5. Initialize the database:
   ```bash
   npm run db:setup
   ```
6. Run the development server:
   ```bash
   npm run dev
   ```
7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `src/app/`: Next.js 13+ app router pages and layouts
- `src/components/`: Reusable UI components
- `src/lib/`: Utility functions and shared logic
- `src/types/`: TypeScript type definitions
- `public/`: Static assets
- `styles/`: Global styles and Tailwind configurations

## Development

- Run tests: `npm test`
- Build for production: `npm run build`
- Start production server: `npm start`
- Lint code: `npm run lint`
