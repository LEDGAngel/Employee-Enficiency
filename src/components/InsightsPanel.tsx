import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, TrendingUp, AlertTriangle, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface Insight {
  id: string;
  type: "success" | "warning" | "info" | "tip";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

interface InsightsPanelProps {
  insights: Insight[];
}

const insightConfig = {
  success: {
    icon: TrendingUp,
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/30"
  },
  warning: {
    icon: AlertTriangle,
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/30"
  },
  info: {
    icon: Target,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30"
  },
  tip: {
    icon: Lightbulb,
    color: "text-primary-glow",
    bg: "bg-primary/5",
    border: "border-primary/20"
  }
};

const priorityBadges = {
  high: { label: "Alta", className: "bg-destructive/20 text-destructive-foreground" },
  medium: { label: "Media", className: "bg-warning/20 text-warning" },
  low: { label: "Baja", className: "bg-primary/20 text-primary-foreground" }
};

export const InsightsPanel = ({ insights }: InsightsPanelProps) => {
  return (
    <Card className="border-2 border-border bg-card/50 p-6 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Insights de IA</h3>
        <Badge variant="outline" className="gap-1">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
          </span>
          En tiempo real
        </Badge>
      </div>
      
      <div className="space-y-3">
        {insights.map((insight) => {
          const config = insightConfig[insight.type];
          const Icon = config.icon;
          const priorityBadge = priorityBadges[insight.priority];
          
          return (
            <div
              key={insight.id}
              className={cn(
                "group rounded-lg border-2 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-md",
                config.bg,
                config.border
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn("rounded-lg p-2", config.bg)}>
                  <Icon className={cn("h-5 w-5", config.color)} />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{insight.title}</p>
                    <Badge className={cn("text-xs", priorityBadge.className)}>
                      {priorityBadge.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
