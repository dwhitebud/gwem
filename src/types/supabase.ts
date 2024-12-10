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
      plaid_items: {
        Row: {
          id: string
          user_id: string
          plaid_item_id: string
          plaid_access_token: string
          plaid_institution_id: string
          institution_name: string
          status: string
          error_code: string | null
          error_message: string | null
          last_successful_update: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plaid_item_id: string
          plaid_access_token: string
          plaid_institution_id: string
          institution_name: string
          status?: string
          error_code?: string | null
          error_message?: string | null
          last_successful_update?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plaid_item_id?: string
          plaid_access_token?: string
          plaid_institution_id?: string
          institution_name?: string
          status?: string
          error_code?: string | null
          error_message?: string | null
          last_successful_update?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      plaid_accounts: {
        Row: {
          id: string
          plaid_item_id: string
          plaid_account_id: string
          name: string
          official_name: string | null
          type: string
          subtype: string | null
          mask: string | null
          current_balance: number | null
          available_balance: number | null
          iso_currency_code: string | null
          last_updated: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
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
          last_updated?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          plaid_item_id?: string
          plaid_account_id?: string
          name?: string
          official_name?: string | null
          type?: string
          subtype?: string | null
          mask?: string | null
          current_balance?: number | null
          available_balance?: number | null
          iso_currency_code?: string | null
          last_updated?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      plaid_transactions: {
        Row: {
          id: string
          plaid_account_id: string
          plaid_transaction_id: string
          amount: number
          date: string
          name: string
          merchant_name: string | null
          payment_channel: string | null
          pending: boolean
          transaction_type: string | null
          category_id: string | null
          category: string[] | null
          location: Json | null
          payment_meta: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          plaid_account_id: string
          plaid_transaction_id: string
          amount: number
          date: string
          name: string
          merchant_name?: string | null
          payment_channel?: string | null
          pending?: boolean
          transaction_type?: string | null
          category_id?: string | null
          category?: string[] | null
          location?: Json | null
          payment_meta?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          plaid_account_id?: string
          plaid_transaction_id?: string
          amount?: number
          date?: string
          name?: string
          merchant_name?: string | null
          payment_channel?: string | null
          pending?: boolean
          transaction_type?: string | null
          category_id?: string | null
          category?: string[] | null
          location?: Json | null
          payment_meta?: Json | null
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
