import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export function useInsights() {
  return useQuery({
    queryKey: ['insights'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('insights')
        .select('*')
        .order('priority', { ascending: false })
        .order('created_at', { ascending: false })

      if (error) throw error

      return data || []
    },
  })
}