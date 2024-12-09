import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

// Log environment setup
console.log('Initializing Plaid client with environment:', process.env.PLAID_ENV || 'sandbox');

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SANDBOX_SECRET,
    },
  },
});

// Create and export the client
export const plaidClient = new PlaidApi(configuration);
