import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export function usePerformanceMetrics() {
  return useQuery({
    queryKey: ['performance-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('performance_metrics')
        .select('*')
        .order('date', { ascending: true })

      if (error) throw error

      return (data || []).map(metric => ({
        name: metric.name,
        eficiencia: metric.eficiencia,
        tareas: metric.tareas,
      }))
    },
  })
}