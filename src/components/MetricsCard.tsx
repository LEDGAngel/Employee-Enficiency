import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "success" | "warning" | "danger";
}

export const MetricsCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  variant = "default" 
}: MetricsCardProps) => {
  const variantStyles = {
    default: "border-primary/20 bg-card/50",
    success: "border-accent/30 bg-accent/5",
    warning: "border-warning/30 bg-warning/5",
    danger: "border-destructive/30 bg-destructive/5"
  };

  const iconStyles = {
    default: "text-primary",
    success: "text-accent",
    warning: "text-warning",
    danger: "text-destructive"
  };

  return (
    <Card className={cn(
      "relative overflow-hidden border-2 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
      variantStyles[variant]
    )}>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="space-y-1">
              <p className="text-3xl font-bold tracking-tight">{value}</p>
              {subtitle && (
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              )}
            </div>
            {trend && (
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium",
                trend.isPositive ? "text-accent" : "text-destructive"
              )}>
                <span>{trend.isPositive ? "↑" : "↓"}</span>
                <span>{Math.abs(trend.value)}%</span>
                <span className="text-xs text-muted-foreground">vs ayer</span>
              </div>
            )}
          </div>
          <div className={cn(
            "rounded-xl bg-background/50 p-3",
            iconStyles[variant]
          )}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </div>
      <div className={cn(
        "absolute inset-x-0 bottom-0 h-1",
        variant === "success" && "bg-gradient-to-r from-accent/50 to-accent",
        variant === "warning" && "bg-gradient-to-r from-warning/50 to-warning",
        variant === "danger" && "bg-gradient-to-r from-destructive/50 to-destructive",
        variant === "default" && "bg-gradient-to-r from-primary/50 to-primary"
      )} />
    </Card>
  );
};
