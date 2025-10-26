import React, { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, TrendingUp, AlertTriangle, Target } from "lucide-react";
import { cn } from "@/lib/utils";

type RawInsight = any;

interface Insight {
  id: string;
  type: "success" | "warning" | "info" | "tip";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

interface InsightsPanelProps {
  // acepta ya sea un array de objetos o un JSON string (lo normaliza internamente)
  insights: RawInsight[] | string | null | undefined;
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

function normalizePriority(p: any): "high" | "medium" | "low" {
  if (!p && p !== 0) return "medium";
  const mapping: Record<string, "high" | "medium" | "low"> = {
    "1": "high",
    "2": "medium",
    "3": "low",
    high: "high",
    H: "high",
    High: "high",
    medium: "medium",
    Medium: "medium",
    low: "low",
    Low: "low"
  };
  if (typeof p === "number") return p === 1 ? "high" : p === 3 ? "low" : "medium";
  const key = String(p).trim();
  return mapping[key] ?? "medium";
}

function normalizeType(t: any): Insight["type"] {
  const allowed = ["success", "warning", "info", "tip"];
  if (!t) return "info";
  const s = String(t).toLowerCase();
  return allowed.includes(s) ? (s as Insight["type"]) : "info";
}

function normalizeRawToInsight(raw: RawInsight, idx: number): Insight {
  const id = raw?.id ? String(raw.id) : (raw?.title ? String(raw.title).slice(0, 30) : `insight-${idx}`);
  const type = normalizeType(raw?.type);
  const title = raw?.title ?? raw?.name ?? `Insight #${idx + 1}`;
  const description = raw?.description ?? raw?.desc ?? JSON.stringify(raw).slice(0, 300);
  const priority = normalizePriority(raw?.priority);
  return { id, type, title: String(title), description: String(description), priority };
}

export const InsightsPanel = ({ insights }: InsightsPanelProps) => {
  const normalized = useMemo<Insight[]>(() => {
    if (!insights) return [];
    let parsed: any[] = [];
    if (typeof insights === "string") {
      try {
        parsed = JSON.parse(insights);
        if (!Array.isArray(parsed)) parsed = [];
      } catch {
        // intentar extraer array JSON si viene envuelto en texto
        const match = insights.match(/\[[\s\S]*\]/);
        if (match) {
          try {
            parsed = JSON.parse(match[0]);
          } catch {
            parsed = [];
          }
        }
      }
    } else if (Array.isArray(insights)) {
      parsed = insights;
    } else {
      parsed = [];
    }

    return parsed.map((r, i) => normalizeRawToInsight(r, i));
  }, [insights]);

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
        {normalized.map((insight) => {
          const config = insightConfig[insight.type] ?? insightConfig.info;
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
