"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface UsageStatsProps {
  totalUploads: number;
  usedUploads: number;
  totalCredits: number;
  usedCredits: number;
}

export default function UsageStats({ totalUploads, usedUploads, totalCredits, usedCredits }: UsageStatsProps) {
  const remainingUploads = Math.max(0, totalUploads - usedUploads);
  const remainingCredits = Math.max(0, totalCredits - usedCredits);
  const uploadPercentage = Math.min(100, (usedUploads / totalUploads) * 100);
  const creditPercentage = Math.min(100, (usedCredits / totalCredits) * 100);

  return (
    <Card className="bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Package Usage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploads</span>
            <span className="text-muted-foreground">
              {usedUploads} / {totalUploads} used
            </span>
          </div>
          <Progress value={uploadPercentage} className="h-2" />
          <div className="text-sm text-muted-foreground text-right">
            {remainingUploads} uploads remaining
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Credits</span>
            <span className="text-muted-foreground">
              {usedCredits} / {totalCredits} used
            </span>
          </div>
          <Progress value={creditPercentage} className="h-2" />
          <div className="text-sm text-muted-foreground text-right">
            {remainingCredits} credits remaining
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
