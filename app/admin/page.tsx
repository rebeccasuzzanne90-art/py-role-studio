import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Eye, MessageSquare, ToggleLeft } from "lucide-react";
import { getDashboardStats, getRecentActivity } from "@/lib/admin";
import { formatDistanceToNow } from "@/lib/format-time";

export const revalidate = 0;

export default async function AdminDashboard() {
  let stats = {
    subscriberCount: 0,
    contactCount: 0,
    pageViewCount: 0,
    enabledFlags: 0,
    totalFlags: 0,
  };
  let activity: Awaited<ReturnType<typeof getRecentActivity>> = [];

  try {
    [stats, activity] = await Promise.all([
      getDashboardStats(),
      getRecentActivity(),
    ]);
  } catch {
    // Supabase not configured
  }

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Subscribers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {stats.subscriberCount.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Page Views
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {stats.pageViewCount.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Contact Messages
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {stats.contactCount.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Flags
            </CardTitle>
            <ToggleLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {stats.enabledFlags} / {stats.totalFlags}
            </p>
            <p className="text-xs text-muted-foreground">Features enabled</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-xl font-bold">Recent Activity</h2>
        {stats.subscriberCount === 0 &&
         stats.contactCount === 0 &&
         stats.pageViewCount === 0 &&
         activity.length === 0 && (
          <div className="border border-dashed p-6 text-center">
            <p className="font-medium">No data yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Connect Supabase to store subscribers, contact submissions, and
              page views. Or data will appear here as visitors interact with the site.
            </p>
          </div>
        )}
        {activity.length === 0 && (stats.subscriberCount > 0 || stats.contactCount > 0) ? (
          <p className="text-sm text-muted-foreground">
            No recent activity to display.
          </p>
        ) : activity.length > 0 ? (
          <div className="space-y-3">
            {activity.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between border p-4"
              >
                <div>
                  <p className="font-medium">{item.action}</p>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatDistanceToNow(item.time)}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}
