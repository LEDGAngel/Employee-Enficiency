import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, type Employee as DBEmployee } from '@/lib/supabase'
import type { Employee } from '@/components/EmployeeTable'

// Función para transformar de snake_case a camelCase
const transformEmployee = (emp: DBEmployee): Employee => ({
  id: emp.id,
  name: emp.name,
  tasksCompleted: emp.tasks_completed,
  avgTime: emp.avg_time,
  errors: emp.errors,
  efficiency: emp.efficiency,
  shift: emp.shift,
})

export function useEmployees() {
  return useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('efficiency', { ascending: false })

      if (error) throw error

      return (data || []).map(transformEmployee)
    },
  })
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Employee> & { id: string }) => {
      const { data, error } = await supabase
        .from('employees')
        .update({
          tasks_completed: updates.tasksCompleted,
          avg_time: updates.avgTime,
          errors: updates.errors,
          efficiency: updates.efficiency,
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return transformEmployee(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
    },
  })
}

export function useAddEmployee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (employee: Omit<Employee, 'id'>) => {
      const { data, error } = await supabase
        .from('employees')
        .insert({
          name: employee.name,
          tasks_completed: employee.tasksCompleted,
          avg_time: employee.avgTime,
          errors: employee.errors,
          efficiency: employee.efficiency,
          shift: employee.shift,
        })
        .select()
        .single()

      if (error) throw error
      return transformEmployee(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
    },
  })
}