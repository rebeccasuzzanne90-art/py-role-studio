"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toggleFeatureFlag } from "@/lib/admin";

interface Flag {
  id: string;
  label: string;
  description: string | null;
  enabled: boolean;
}

export function FeatureFlagsList({ flags }: { flags: Flag[] }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleToggle(id: string, current: boolean) {
    startTransition(async () => {
      await toggleFeatureFlag(id, !current);
      router.refresh();
    });
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Feature Flags</h1>
        <p className="mt-2 text-muted-foreground">
          Toggle site features on or off without redeploying
        </p>
      </div>

      {flags.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No feature flags configured. Run the SQL schema to seed defaults.
        </p>
      ) : (
        <div className="grid gap-4">
          {flags.map((flag) => (
            <Card key={flag.id}>
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">{flag.label}</CardTitle>
                    <Badge variant={flag.enabled ? "default" : "secondary"}>
                      {flag.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <CardDescription className="mt-1">
                    {flag.description}
                  </CardDescription>
                </div>
                <Switch
                  checked={flag.enabled}
                  disabled={pending}
                  onCheckedChange={() => handleToggle(flag.id, flag.enabled)}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
