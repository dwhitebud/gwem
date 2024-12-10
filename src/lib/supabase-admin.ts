import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing env.SUPABASE_SERVICE_ROLE_KEY')
}

// Create a Supabase client with the service role key for admin operations
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
)

// Create an admin version of our database helper
export const dbAdmin = {
  supabase: supabaseAdmin,
  plaidItems: {
    create: async (data: {
      user_id: string
      plaid_item_id: string
      plaid_access_token: string
      plaid_institution_id: string
      institution_name: string
      status?: string
    }) => {
      console.log('Creating Plaid item with data:', {
        ...data,
        plaid_access_token: '[REDACTED]' // Don't log access token
      });

      const now = new Date().toISOString();
      const insertData = {
        ...data,
        error_code: null,
        error_message: null,
        last_successful_update: null,
        created_at: now,
        updated_at: now
      };

      console.log('Prepared data for Supabase insert:', {
        ...insertData,
        plaid_access_token: '[REDACTED]'
      });

      const { data: item, error } = await supabaseAdmin
        .from('plaid_items')
        .insert([insertData])
        .select('id, user_id, plaid_item_id, plaid_institution_id, institution_name, status, error_code, error_message, last_successful_update, created_at, updated_at')
        .single()
      
      if (error) {
        console.error('Error creating plaid item:', {
          error,
          attemptedData: {
            ...insertData,
            plaid_access_token: '[REDACTED]'
          }
        });
        throw error;
      }

      console.log('Successfully created Plaid item:', {
        ...item,
        plaid_access_token: '[REDACTED]'
      });
      return item
    }
  },
  plaidAccounts: {
    create: async (data: {
      plaid_item_id: string
      plaid_account_id: string
      name: string
      official_name?: string | null
      type: string
      subtype?: string | null
      mask?: string | null
      current_balance?: number | null
      available_balance?: number | null
      iso_currency_code?: string | null
    }) => {
      console.log('Creating Plaid account with data:', {
        ...data,
        // Log all fields to help debug type mismatches
        fieldTypes: {
          plaid_item_id: typeof data.plaid_item_id,
          plaid_account_id: typeof data.plaid_account_id,
          name: typeof data.name,
          official_name: typeof data.official_name,
          type: typeof data.type,
          subtype: typeof data.subtype,
          mask: typeof data.mask,
          current_balance: typeof data.current_balance,
          available_balance: typeof data.available_balance,
          iso_currency_code: typeof data.iso_currency_code
        }
      });

      const now = new Date().toISOString();
      const insertData = {
        ...data,
        last_updated: null,
        created_at: now,
        updated_at: now
      };

      console.log('Prepared data for Supabase insert:', {
        ...insertData,
        fieldTypes: {
          last_updated: typeof insertData.last_updated,
          created_at: typeof insertData.created_at,
          updated_at: typeof insertData.updated_at
        }
      });

      const { data: account, error } = await supabaseAdmin
        .from('plaid_accounts')
        .insert([insertData])
        .select('id, plaid_item_id, plaid_account_id, name, official_name, type, subtype, mask, current_balance, available_balance, iso_currency_code, last_updated, created_at, updated_at')
        .single()
      
      if (error) {
        console.error('Error creating plaid account:', {
          error,
          errorCode: error.code,
          errorDetails: error.details,
          errorMessage: error.message,
          attemptedData: insertData,
          schemaFields: [
            'id', 'plaid_item_id', 'plaid_account_id', 'name', 'official_name',
            'type', 'subtype', 'mask', 'current_balance', 'available_balance',
            'iso_currency_code', 'last_updated', 'created_at', 'updated_at'
          ]
        });
        throw error;
      }

      console.log('Successfully created Plaid account:', {
        account,
        fieldTypes: {
          id: typeof account.id,
          plaid_item_id: typeof account.plaid_item_id,
          name: typeof account.name,
          current_balance: typeof account.current_balance
        }
      });
      return account
    }
  }
}
