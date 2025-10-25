import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export function useLeaderboard() {
  return useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employees')
        .select('id, name, efficiency')
        .order('efficiency', { ascending: false })
        .limit(6)

      if (error) throw error

      return (data || []).map((emp, index) => {
        const score = emp.efficiency * 10
        let badge = undefined

        if (index === 0) badge = '🔥 Racha 7 días'
        else if (index === 1) badge = '⚡ Velocidad Pro'
        else if (index === 2) badge = '🎯 Precisión'

        return {
          rank: index + 1,
          name: emp.name,
          score,
          badge,
        }
      })
    },
  })
}