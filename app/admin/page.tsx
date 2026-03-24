import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Eye, ShoppingCart, ToggleLeft } from "lucide-react";

export default function AdminDashboard() {
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
            <p className="text-2xl font-bold">1,248</p>
            <p className="text-xs text-muted-foreground">+23 this week</p>
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
            <p className="text-2xl font-bold">14,302</p>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">87</p>
            <p className="text-xs text-muted-foreground">$26,100 revenue</p>
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
            <p className="text-2xl font-bold">5 / 6</p>
            <p className="text-xs text-muted-foreground">Features enabled</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity */}
      <div className="mt-10">
        <h2 className="mb-4 text-xl font-bold">Recent Activity</h2>
        <div className="space-y-3">
          {[
            {
              action: "New subscriber",
              detail: "john@acme.com joined the newsletter",
              time: "2 hours ago",
            },
            {
              action: "Order completed",
              detail: "HIPAA Compliance Training purchased",
              time: "5 hours ago",
            },
            {
              action: "Feature toggled",
              detail: "Dark mode enabled",
              time: "1 day ago",
            },
            {
              action: "New subscriber",
              detail: "sarah@healthco.com joined the newsletter",
              time: "1 day ago",
            },
            {
              action: "Document uploaded",
              detail: "Q4 Risk Assessment shared with Acme Corp",
              time: "2 days ago",
            },
          ].map((activity, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.detail}
                </p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
