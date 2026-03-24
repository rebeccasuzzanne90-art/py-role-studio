import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { getAnalyticsSummary, getTopPages, getMonthlyViews } from "@/lib/admin";

export const revalidate = 0;

export default async function AnalyticsPage() {
  let totalViews30d = 0;
  let topPages: { path: string; views: number }[] = [];
  let monthly: { month: string; views: number }[] = [];

  try {
    const [summary, pages, monthlyData] = await Promise.all([
      getAnalyticsSummary(),
      getTopPages(),
      getMonthlyViews(),
    ]);
    totalViews30d = summary.totalViews30d;
    topPages = pages;
    monthly = monthlyData;
  } catch {
    // Supabase not configured
  }

  const maxViews = Math.max(...monthly.map((d) => d.views), 1);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="mt-2 text-muted-foreground">
          Site traffic and engagement overview
        </p>
      </div>

      <div className="mb-8 grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Views (30d)
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {totalViews30d.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Top Pages Tracked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{topPages.length}</p>
            <p className="text-xs text-muted-foreground">Unique paths</p>
          </CardContent>
        </Card>
      </div>

      {monthly.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Monthly Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-4">
              {monthly.map((d) => (
                <div
                  key={d.month}
                  className="flex flex-1 flex-col items-center gap-2"
                >
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
                  <span className="text-xs text-muted-foreground">
                    {d.month}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Top Pages</CardTitle>
        </CardHeader>
        <CardContent>
          {topPages.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No page view data yet. Views are tracked automatically as visitors
              browse the site.
            </p>
          ) : (
            <div className="space-y-3">
              {topPages.map((page, i) => (
                <div
                  key={page.path}
                  className="flex items-center justify-between border p-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-bold">
                      {i + 1}
                    </span>
                    <p className="font-medium">{page.path}</p>
                  </div>
                  <Badge variant="secondary">
                    {page.views.toLocaleString()} views
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
