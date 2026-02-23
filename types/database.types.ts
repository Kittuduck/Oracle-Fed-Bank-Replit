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
            profiles: {
                Row: {
                    id: string
                    full_name: string | null
                    avatar_url: string | null
                    risk_profile: string | null
                    mpin_hash: string | null
                    biometric_id: string | null
                    updated_at: string | null
                }
                Insert: {
                    id: string
                    full_name?: string | null
                    avatar_url?: string | null
                    risk_profile?: string | null
                    mpin_hash?: string | null
                    biometric_id?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    full_name?: string | null
                    avatar_url?: string | null
                    risk_profile?: string | null
                    mpin_hash?: string | null
                    biometric_id?: string | null
                    updated_at?: string | null
                }
            }
            accounts: {
                Row: {
                    id: string
                    user_id: string
                    account_number: string
                    type: 'SAVINGS' | 'FIXED_DEPOSIT'
                    balance: number
                    status: 'ACTIVE' | 'FROZEN'
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    account_number: string
                    type: 'SAVINGS' | 'FIXED_DEPOSIT'
                    balance?: number
                    status?: 'ACTIVE' | 'FROZEN'
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    account_number?: string
                    type?: 'SAVINGS' | 'FIXED_DEPOSIT'
                    balance?: number
                    status?: 'ACTIVE' | 'FROZEN'
                    created_at?: string
                }
            }
            transactions: {
                Row: {
                    id: string
                    account_id: string
                    amount: number
                    type: 'DEBIT' | 'CREDIT'
                    category: string | null
                    description: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    account_id: string
                    amount: number
                    type: 'DEBIT' | 'CREDIT'
                    category?: string | null
                    description?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    account_id?: string
                    amount?: number
                    type?: 'DEBIT' | 'CREDIT'
                    category?: string | null
                    description?: string | null
                    created_at?: string
                }
            }
            cards: {
                Row: {
                    id: string
                    user_id: string
                    card_number: string
                    card_code: 'CELESTA' | 'IMPERIO' | 'SIGNET'
                    expiry: string
                    status: 'ACTIVE' | 'BLOCKED' | 'FROZEN'
                    settings: Json
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    card_number: string
                    card_code: 'CELESTA' | 'IMPERIO' | 'SIGNET'
                    expiry: string
                    status?: 'ACTIVE' | 'BLOCKED' | 'FROZEN'
                    settings?: Json
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    card_number?: string
                    card_code?: 'CELESTA' | 'IMPERIO' | 'SIGNET'
                    expiry?: string
                    status?: 'ACTIVE' | 'BLOCKED' | 'FROZEN'
                    settings?: Json
                    created_at?: string
                }
            }
            loans: {
                Row: {
                    id: string
                    user_id: string
                    loan_type: 'PERSONAL' | 'HOME' | 'CAR'
                    principal: number
                    interest_rate: number
                    status: 'DISBURSED' | 'REPAID'
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    loan_type: 'PERSONAL' | 'HOME' | 'CAR'
                    principal: number
                    interest_rate: number
                    status?: 'DISBURSED' | 'REPAID'
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    loan_type?: 'PERSONAL' | 'HOME' | 'CAR'
                    principal?: number
                    interest_rate?: number
                    status?: 'DISBURSED' | 'REPAID'
                    created_at?: string
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
