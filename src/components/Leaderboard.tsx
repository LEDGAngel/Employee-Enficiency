import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  badge?: string;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-warning" />;
    case 2:
      return <Medal className="h-5 w-5 text-muted-foreground" />;
    case 3:
      return <Award className="h-5 w-5 text-warning/60" />;
    default:
      return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
  }
};

const getRankStyle = (rank: number) => {
  if (rank === 1) return "bg-gradient-to-r from-warning/20 to-warning/5 border-warning/30";
  if (rank === 2) return "bg-gradient-to-r from-muted/20 to-muted/5 border-muted/30";
  if (rank === 3) return "bg-gradient-to-r from-warning/10 to-warning/5 border-warning/20";
  return "bg-card/30 border-border/50";
};

export const Leaderboard = ({ entries }: LeaderboardProps) => {
  return (
    <Card className="border-2 border-border bg-card/50 p-6 backdrop-blur-sm">
      <div className="mb-4 flex items-center gap-2">
        <Trophy className="h-5 w-5 text-warning" />
        <h3 className="text-lg font-semibold">Ranking de Eficiencia</h3>
      </div>
      
      <div className="space-y-2">
        {entries.map((entry) => (
          <div
            key={entry.rank}
            className={cn(
              "flex items-center gap-3 rounded-lg border-2 p-3 transition-all duration-300 hover:scale-[1.02]",
              getRankStyle(entry.rank)
            )}
          >
            <div className="flex h-10 w-10 items-center justify-center">
              {getRankIcon(entry.rank)}
            </div>
            
            <Avatar className="h-10 w-10 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                {entry.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <p className="font-semibold">{entry.name}</p>
              {entry.badge && (
                <Badge variant="outline" className="mt-1 text-xs">
                  {entry.badge}
                </Badge>
              )}
            </div>
            
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{entry.score}</p>
              <p className="text-xs text-muted-foreground">puntos</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
