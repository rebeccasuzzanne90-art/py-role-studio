"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface FeatureFlag {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

const INITIAL_FLAGS: FeatureFlag[] = [
  {
    id: "chat_widget",
    label: "Live Chat Widget",
    description: "Show the Crisp live chat widget on all pages",
    enabled: true,
  },
  {
    id: "shop",
    label: "Shop / Courses",
    description: "Enable the shop section with training courses and products",
    enabled: true,
  },
  {
    id: "newsletter",
    label: "Newsletter Signup",
    description: "Show newsletter subscription forms on the site",
    enabled: true,
  },
  {
    id: "dark_mode",
    label: "Dark Mode",
    description: "Allow visitors to toggle dark mode",
    enabled: true,
  },
  {
    id: "client_portal",
    label: "Client Portal",
    description: "Enable the authenticated client portal area",
    enabled: true,
  },
  {
    id: "maintenance_mode",
    label: "Maintenance Mode",
    description: "Show a maintenance page to all visitors (except admins)",
    enabled: false,
  },
];

export default function FeaturesPage() {
  const [flags, setFlags] = useState(INITIAL_FLAGS);

  function toggleFlag(id: string) {
    setFlags((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    );
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Feature Flags</h1>
        <p className="mt-2 text-muted-foreground">
          Toggle site features on or off without redeploying
        </p>
      </div>

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
                onCheckedChange={() => toggleFlag(flag.id)}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
