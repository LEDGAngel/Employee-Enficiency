import { MetricsCard } from "@/components/MetricsCard";
import { EmployeeTable } from "@/components/EmployeeTable";
import { PerformanceChart } from "@/components/PerformanceChart";
import { InsightsPanel } from "@/components/InsightsPanel";
import { Leaderboard } from "@/components/Leaderboard";
import { mockEmployees, mockChartData, mockInsights, mockLeaderboard } from "@/data/mockData";
import { Activity, CheckCircle, Clock, AlertCircle } from "lucide-react";

const Index = () => {
  const totalTasks = mockEmployees.reduce((sum, emp) => sum + emp.tasksCompleted, 0);
  const avgEfficiency = Math.round(
    mockEmployees.reduce((sum, emp) => sum + emp.efficiency, 0) / mockEmployees.length
  );
  const totalErrors = mockEmployees.reduce((sum, emp) => sum + emp.errors, 0);
  const avgTime = Math.round(
    mockEmployees.reduce((sum, emp) => sum + emp.avgTime, 0) / mockEmployees.length
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
            trend={{ value: 3.4, isPositive: false }}
            variant="warning"
          />
          <MetricsCard
            title="Total Errores"
            value={totalErrors}
            subtitle="Últimas 24h"
            icon={AlertCircle}
            trend={{ value: 12, isPositive: false }}
            variant="danger"
          />
        </div>

        {/* Charts and Insights */}
        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PerformanceChart
              data={mockChartData}
              type="area"
              title="Tendencia Semanal"
            />
          </div>
          <div>
            <Leaderboard entries={mockLeaderboard} />
          </div>
        </div>

        {/* Insights */}
        <div className="mb-8">
          <InsightsPanel insights={mockInsights} />
        </div>

        {/* Employee Table */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Empleados Activos</h2>
            <p className="text-sm text-muted-foreground">
              Monitoreo individual en tiempo real
            </p>
          </div>
          <EmployeeTable employees={mockEmployees} />
        </div>
      </main>
    </div>
  );
};

export default Index;
