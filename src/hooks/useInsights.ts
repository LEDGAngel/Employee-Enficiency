import { useQuery } from '@tanstack/react-query';
import { useEmployees } from './useEmployees';

const API_URL = 'http://localhost:3000/api';

export function useInsights() {
  const { data: employees = [] } = useEmployees();

  return useQuery({
    queryKey: ['insights'],
    queryFn: async () => {
      try {
        const response = await fetch(`${API_URL}/insights/generate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ employeeData: employees }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return await response.json();
      } catch (error) {
        console.error('Error fetching insights:', error);
        return [];
      }
    },
    enabled: employees.length > 0,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    retry: 0,
  });
}