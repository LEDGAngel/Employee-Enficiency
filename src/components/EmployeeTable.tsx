import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface Employee {
  id: string;
  name: string;
  tasksCompleted: number;
  avgTime: number;
  errors: number;
  efficiency: number;
  shift: string;
}

interface EmployeeTableProps {
  employees: Employee[];
}

const getEfficiencyBadge = (efficiency: number) => {
  if (efficiency >= 90) return { variant: "default" as const, label: "Excelente", color: "bg-accent text-accent-foreground" };
  if (efficiency >= 75) return { variant: "secondary" as const, label: "Bueno", color: "bg-primary/20 text-primary-foreground" };
  if (efficiency >= 60) return { variant: "outline" as const, label: "Aceptable", color: "bg-warning/20 text-warning" };
  return { variant: "destructive" as const, label: "Bajo", color: "bg-destructive/20 text-destructive-foreground" };
};

export const EmployeeTable = ({ employees }: EmployeeTableProps) => {
  return (
    <div className="rounded-xl border-2 border-border bg-card/50 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-muted/50">
            <TableHead className="font-semibold">Empleado</TableHead>
            <TableHead className="font-semibold">Turno</TableHead>
            <TableHead className="text-right font-semibold">Tareas</TableHead>
            <TableHead className="text-right font-semibold">Tiempo Prom.</TableHead>
            <TableHead className="text-right font-semibold">Errores</TableHead>
            <TableHead className="text-right font-semibold">Eficiencia</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => {
            const badge = getEfficiencyBadge(employee.efficiency);
            return (
              <TableRow 
                key={employee.id} 
                className="border-border transition-colors hover:bg-muted/30"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span>{employee.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">
                    {employee.shift}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-sm">
                  {employee.tasksCompleted}
                </TableCell>
                <TableCell className="text-right font-mono text-sm">
                  {employee.avgTime}s
                </TableCell>
                <TableCell className="text-right">
                  <span className={cn(
                    "font-mono text-sm font-semibold",
                    employee.errors > 5 ? "text-destructive" : 
                    employee.errors > 2 ? "text-warning" : "text-accent"
                  )}>
                    {employee.errors}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Badge className={cn("font-semibold", badge.color)}>
                    {employee.efficiency}%
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
