import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types para TypeScript
export type Employee = {
  id: string
  name: string
  tasks_completed: number
  avg_time: number
  errors: number
  efficiency: number
  shift: string
  created_at: string
}

export type PerformanceMetric = {
  id: string
  date: string
  name: string
  eficiencia: number
  tareas: number
  created_at: string
}

export type Insight = {
  id: string
  type: 'success' | 'warning' | 'info' | 'tip'
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  created_at: string
}