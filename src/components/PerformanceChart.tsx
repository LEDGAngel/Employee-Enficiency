import { Card } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface ChartData {
  name: string;
  eficiencia: number;
  tareas: number;
}

interface PerformanceChartProps {
  data: ChartData[];
  type?: "line" | "area";
  title: string;
}

export const PerformanceChart = ({ data, type = "area", title }: PerformanceChartProps) => {
  const ChartComponent = type === "line" ? LineChart : AreaChart;
  const DataComponent = type === "line" ? Line : Area;

  return (
    <Card className="border-2 border-border bg-card/50 p-6 backdrop-blur-sm">
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ChartComponent data={data}>
          <defs>
            <linearGradient id="colorEficiencia" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorTareas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="name" 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Legend />
          {type === "area" ? (
            <>
              <Area 
                type="monotone" 
                dataKey="eficiencia" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1}
                fill="url(#colorEficiencia)"
                strokeWidth={2}
                name="Eficiencia %"
              />
              <Area 
                type="monotone" 
                dataKey="tareas" 
                stroke="hsl(var(--accent))" 
                fillOpacity={1}
                fill="url(#colorTareas)"
                strokeWidth={2}
                name="Tareas Completadas"
              />
            </>
          ) : (
            <>
              <Line 
                type="monotone" 
                dataKey="eficiencia" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                name="Eficiencia %"
              />
              <Line 
                type="monotone" 
                dataKey="tareas" 
                stroke="hsl(var(--accent))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--accent))', r: 4 }}
                name="Tareas Completadas"
              />
            </>
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </Card>
  );
};
