import { supabase } from './supabase'
import type { Database } from '@/types/supabase'

type Tables = Database['public']['Tables']

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
      const { data: account, error } = await supabase
        .from('plaid_accounts')
        .insert(data)
        .select()
        .single()
      
      if (error) throw error
      return account
    },
    
    findByUserId: async (userId: string) => {
      const { data: accounts, error } = await supabase
        .from('plaid_accounts')
        .select(`
          *,
          accounts (*)
        `)
        .eq('user_id', userId)
      
      if (error) throw error
      return accounts
    },
    
    update: async (id: string, data: Tables['plaid_accounts']['Update']) => {
      const { data: account, error } = await supabase
        .from('plaid_accounts')
        .update(data)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return account
    },
  },
  
  accounts: {
    create: async (data: Tables['accounts']['Insert']) => {
      const { data: account, error } = await supabase
        .from('accounts')
        .insert(data)
        .select()
        .single()
      
      if (error) throw error
      return account
    },
    
    findAll: async () => {
      return await supabase
        .from('accounts')
        .select(`
          *,
          plaid_account:plaid_account_id (*)
        `)
    },
    
    findByPlaidAccountId: async (plaidAccountId: string) => {
      const { data: accounts, error } = await supabase
        .from('accounts')
        .select()
        .eq('plaid_account_id', plaidAccountId)
      
      if (error) throw error
      return accounts
    },
    
    update: async (id: string, data: Tables['accounts']['Update']) => {
      const { data: account, error } = await supabase
        .from('accounts')
        .update(data)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return account
    },
  },
  
  transactions: {
    create: async (data: Tables['transactions']['Insert']) => {
      const { data: transaction, error } = await supabase
        .from('transactions')
        .insert(data)
        .select()
        .single()
      
      if (error) throw error
      return transaction
    },
    
    findByAccountId: async (accountId: string) => {
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select()
        .eq('account_id', accountId)
      
      if (error) throw error
      return transactions
    },
  },
}
