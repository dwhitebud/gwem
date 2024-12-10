import { supabase } from './supabase'
import { supabaseAdmin } from './supabase-admin'
import type { Database } from '@/types/supabase'

type Tables = Database['public']['Tables']

type PlaidAccountWithItem = Tables['plaid_accounts']['Row'] & {
  plaid_items: {
    institution_name: string;
    plaid_access_token?: string;
    user_id?: string;
  } | null;
}

type PlaidAccountWithInstitution = Tables['plaid_accounts']['Row'] & {
  institution_name: string;
  access_token?: string;
}

export const db = {
  users: {
    create: async (data: Tables['users']['Insert']) => {
      const { data: user, error } = await supabase
        .from('users')
        .insert(data)
        .select()
        .single()
      
      if (error) throw error
      return user
    },
    
    findUnique: async (id: string) => {
      const { data: user, error } = await supabase
        .from('users')
        .select()
        .eq('id', id)
        .single()
      
      if (error) throw error
      return user
    },
    
    findByEmail: async (email: string) => {
      const { data: user, error } = await supabase
        .from('users')
        .select()
        .eq('email', email)
        .single()
      
      if (error) throw error
      return user
    },
  },
  
  plaidAccounts: {
    create: async (data: Tables['plaid_accounts']['Insert']) => {
      const { data: account, error } = await supabaseAdmin
        .from('plaid_accounts')
        .insert(data)
        .select()
        .single()
      
      if (error) throw error
      return account
    },
    
    findAll: async () => {
      const { data, error } = await supabaseAdmin
        .from('plaid_accounts')
        .select<string, PlaidAccountWithItem>(`
          *,
          plaid_items (
            institution_name
          )
        `)
      
      if (error) throw error

      if (!data) return { data: [] }

      return {
        data: data.map(account => ({
          ...account,
          institution_name: account.plaid_items?.institution_name ?? ''
        }))
      }
    },
    
    findByUserId: async (userId: string): Promise<PlaidAccountWithInstitution[]> => {
      console.log('Finding accounts for user:', userId);
      const { data, error } = await supabaseAdmin
        .from('plaid_accounts')
        .select<string, PlaidAccountWithItem>(`
          *,
          plaid_items!inner (
            institution_name,
            plaid_access_token,
            user_id
          )
        `)
        .eq('plaid_items.user_id', userId)
      
      console.log('Account query result:', { count: data?.length ?? 0, error });
      
      if (error) {
        console.error('Error fetching accounts:', error);
        throw error;
      }

      if (!data) return []

      const mappedAccounts = data.map(account => ({
        ...account,
        institution_name: account.plaid_items?.institution_name ?? '',
        access_token: account.plaid_items?.plaid_access_token
      }))
      
      console.log('Mapped accounts:', mappedAccounts.map(a => ({ 
        id: a.id, 
        name: a.name,
        institution: a.institution_name 
      })));
      
      return mappedAccounts
    },
    
    findByPlaidItemId: async (plaidItemId: string) => {
      const { data: accounts, error } = await supabaseAdmin
        .from('plaid_accounts')
        .select()
        .eq('plaid_item_id', plaidItemId)
      
      if (error) throw error
      return accounts
    },
    
    update: async (id: string, data: Tables['plaid_accounts']['Update']) => {
      const { data: account, error } = await supabaseAdmin
        .from('plaid_accounts')
        .update(data)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return account
    },
  },
  
  plaidItems: {
    create: async (data: Tables['plaid_items']['Insert']) => {
      const { data: item, error } = await supabaseAdmin
        .from('plaid_items')
        .insert(data)
        .select()
        .single()
      
      if (error) throw error
      return item
    },
    
    findByUserId: async (userId: string) => {
      console.log('Finding plaid items for user:', userId);
      const { data: items, error } = await supabaseAdmin
        .from('plaid_items')
        .select('*')
        .eq('user_id', userId)
      
      console.log('Plaid items query result:', { count: items?.length ?? 0, error });
      
      if (error) {
        console.error('Error fetching plaid items:', error);
        throw error;
      }

      if (!items) return []
      
      console.log('Found plaid items:', items);
      return items
    },
    
    findByItemId: async (plaidItemId: string) => {
      const { data: item, error } = await supabaseAdmin
        .from('plaid_items')
        .select()
        .eq('plaid_item_id', plaidItemId)
        .single()
      
      if (error) throw error
      return item
    },
    
    update: async (id: string, data: Tables['plaid_items']['Update']) => {
      const { data: item, error } = await supabaseAdmin
        .from('plaid_items')
        .update(data)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return item
    },
  },
  
  plaidTransactions: {
    create: async (data: Tables['plaid_transactions']['Insert']) => {
      const { data: transaction, error } = await supabase
        .from('plaid_transactions')
        .insert(data)
        .select()
        .single()
      
      if (error) throw error
      return transaction
    },
    
    findByPlaidAccountId: async (plaidAccountId: string) => {
      const { data: transactions, error } = await supabase
        .from('plaid_transactions')
        .select()
        .eq('plaid_account_id', plaidAccountId)
      
      if (error) throw error
      return transactions
    },
  },
}
