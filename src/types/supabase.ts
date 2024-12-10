export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
      }
      plaid_accounts: {
        Row: {
          id: string
          user_id: string
          institution_id: string
          institution_name: string
          access_token: string
          item_id: string
          status: string
          error: string | null
          last_synced_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          institution_id: string
          institution_name: string
          access_token: string
          item_id: string
          status?: string
          error?: string | null
          last_synced_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          institution_id?: string
          institution_name?: string
          access_token?: string
          item_id?: string
          status?: string
          error?: string | null
          last_synced_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      accounts: {
        Row: {
          id: string
          plaid_account_id: string
          name: string
          official_name: string | null
          type: string
          subtype: string | null
          mask: string | null
          current_balance: number | null
          available_balance: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          plaid_account_id: string
          name: string
          official_name?: string | null
          type: string
          subtype?: string | null
          mask?: string | null
          current_balance?: number | null
          available_balance?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          plaid_account_id?: string
          name?: string
          official_name?: string | null
          type?: string
          subtype?: string | null
          mask?: string | null
          current_balance?: number | null
          available_balance?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          account_id: string
          user_id: string
          amount: number
          date: string
          name: string
          merchant_name: string | null
          pending: boolean
          type: string | null
          category: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          account_id: string
          user_id: string
          amount: number
          date: string
          name: string
          merchant_name?: string | null
          pending?: boolean
          type?: string | null
          category?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          account_id?: string
          user_id?: string
          amount?: number
          date?: string
          name?: string
          merchant_name?: string | null
          pending?: boolean
          type?: string | null
          category?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
