"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, TrendingUp, Clock, ArrowUpRight } from "lucide-react";

const TOP_PAGES = [
  { path: "/", views: 4832, label: "Home" },
  { path: "/services", views: 2145, label: "Services" },
  { path: "/blog", views: 1893, label: "Blog" },
  { path: "/services/hipaa", views: 1201, label: "HIPAA" },
  { path: "/contact", views: 987, label: "Contact" },
  { path: "/shop", views: 876, label: "Shop" },
  { path: "/faq", views: 654, label: "FAQ" },
  { path: "/about", views: 543, label: "About" },
];

const MONTHLY_DATA = [
  { month: "Aug", views: 8200 },
  { month: "Sep", views: 9100 },
  { month: "Oct", views: 10500 },
  { month: "Nov", views: 11200 },
  { month: "Dec", views: 12800 },
  { month: "Jan", views: 14302 },
];

export default function AnalyticsPage() {
  const maxViews = Math.max(...MONTHLY_DATA.map((d) => d.views));

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="mt-2 text-muted-foreground">
          Site traffic and engagement overview
        </p>
      </div>

      {/* Summary cards */}
      <div className="mb-8 grid gap-6 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Views (30d)
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">14,302</p>
            <p className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" /> +11.7% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Session Duration
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3m 42s</p>
            <p className="text-xs text-muted-foreground">Across all pages</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Bounce Rate
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">34.2%</p>
            <p className="text-xs text-muted-foreground">Industry avg: 40-60%</p>
          </CardContent>
        </Card>
      </div>

      {/* Simple bar chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Monthly Page Views</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4">
            {MONTHLY_DATA.map((d) => (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-medium">
                  {d.views.toLocaleString()}
                </span>
                <div
                  className="w-full rounded-t-md bg-primary transition-all"
                  style={{
                    height: `${(d.views / maxViews) * 200}px`,
                    minHeight: 20,
                  }}
                />
                <span className="text-xs text-muted-foreground">{d.month}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top pages */}
      <Card>
        <CardHeader>
          <CardTitle>Top Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {TOP_PAGES.map((page, i) => (
              <div
                key={page.path}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium">{page.label}</p>
                    <p className="text-xs text-muted-foreground">{page.path}</p>
                  </div>
                </div>
                <Badge variant="secondary">
                  {page.views.toLocaleString()} views
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
