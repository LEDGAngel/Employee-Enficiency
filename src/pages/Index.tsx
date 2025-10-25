import { MetricsCard } from "@/components/MetricsCard";
import { EmployeeTable } from "@/components/EmployeeTable";
import { PerformanceChart } from "@/components/PerformanceChart";
import { InsightsPanel } from "@/components/InsightsPanel";
import { Leaderboard } from "@/components/Leaderboard";
import { Activity, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useEmployees } from "@/hooks/useEmployees";
import { usePerformanceMetrics } from "@/hooks/usePerformanceMetrics";
import { useInsights } from "@/hooks/useInsights";
import { useLeaderboard } from "@/hooks/useLeaderboard";

const Index = () => {
  const { data: employees = [], isLoading: loadingEmployees, error: errorEmployees } = useEmployees();
  const { data: chartData = [], isLoading: loadingMetrics } = usePerformanceMetrics();
  const { data: insights = [], isLoading: loadingInsights } = useInsights();
  const { data: leaderboard = [], isLoading: loadingLeaderboard } = useLeaderboard();

  if (loadingEmployees || loadingMetrics || loadingInsights || loadingLeaderboard) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (errorEmployees) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center text-red-500">
          <AlertCircle className="h-12 w-12 mx-auto mb-4" />
          <p className="text-lg font-semibold">Error al cargar datos</p>
          <p className="text-sm">{errorEmployees.message}</p>
        </div>
      </div>
    );
  }

  const totalTasks = employees.reduce((sum, emp) => sum + emp.tasksCompleted, 0);
  const avgEfficiency = Math.round(
    employees.reduce((sum, emp) => sum + emp.efficiency, 0) / employees.length || 0
  );
  const totalErrors = employees.reduce((sum, emp) => sum + emp.errors, 0);
  const avgTime = Math.round(
    employees.reduce((sum, emp) => sum + emp.avgTime, 0) / employees.length || 0
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
                Smart Efficiency Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Sistema de monitoreo en tiempo real
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 border border-accent/20">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-accent"></span>
              </span>
              <span className="text-sm font-medium">Actualizado ahora</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricsCard
            title="Eficiencia Promedio"
            value={`${avgEfficiency}%`}
            subtitle="Todas las áreas"
            icon={Activity}
            trend={{ value: 5.2, isPositive: true }}
            variant="success"
          />
          <MetricsCard
            title="Tareas Completadas"
            value={totalTasks}
            subtitle="Hoy"
            icon={CheckCircle}
            trend={{ value: 8.1, isPositive: true }}
            variant="default"
          />
          <MetricsCard
            title="Tiempo Promedio"
            value={`${avgTime}s`}
            subtitle="Por tarea"
            icon={Clock}
            trend={{ value: 2.3, isPositive: false }}
            variant="warning"
          />
          <MetricsCard
            title="Errores Detectados"
            value={totalErrors}
            subtitle="Últimas 24h"
            icon={AlertCircle}
            trend={{ value: 15.2, isPositive: false }}
            variant="danger"
          />
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column: Table + Chart */}
          <div className="space-y-6 lg:col-span-2">
            <EmployeeTable employees={employees} />
            <PerformanceChart
              data={chartData}
              title="Rendimiento Semanal"
            />
          </div>

          {/* Right Column: Insights + Leaderboard */}
          <div className="space-y-6">
            <InsightsPanel insights={insights} />
            <Leaderboard entries={leaderboard} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
