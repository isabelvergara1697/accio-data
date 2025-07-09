import { useState } from "react";
import {
  Search,
  Plus,
  Bell,
  ChevronDown,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export default function Index() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`${sidebarCollapsed ? "w-16" : "w-64"} transition-all duration-300 bg-sidebar border-r border-sidebar-border flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            {!sidebarCollapsed && (
              <span className="font-semibold text-lg text-sidebar-foreground">
                Acio Data
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground font-medium"
              >
                <div className="w-5 h-5 bg-current rounded-sm opacity-60"></div>
                {!sidebarCollapsed && <span>Dashboard</span>}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <div className="w-5 h-5 bg-current rounded-sm opacity-60"></div>
                {!sidebarCollapsed && <span>Tools</span>}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <div className="w-5 h-5 bg-current rounded-sm opacity-60"></div>
                {!sidebarCollapsed && (
                  <>
                    <span>Screening</span>
                    <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      8
                    </span>
                  </>
                )}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <div className="w-5 h-5 bg-current rounded-sm opacity-60"></div>
                {!sidebarCollapsed && <span>Reporting</span>}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <div className="w-5 h-5 bg-current rounded-sm opacity-60"></div>
                {!sidebarCollapsed && <span>Support & Resources</span>}
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-background border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Search */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-9 pr-12 py-2 w-80 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
                <Plus className="w-4 h-4" />
                Quick Create
              </button>
              <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-foreground" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
                <div className="text-sm">
                  <div className="font-medium">Alexandra Fitzwilliam</div>
                  <div className="text-muted-foreground">[User Role]</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              View recent activity, task progress, and key data to stay informed
              and organized
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mt-6">
              <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
                Customize
              </button>
              <button className="px-4 py-2 bg-background border border-input text-foreground rounded-lg font-medium hover:bg-accent transition-colors flex items-center gap-2">
                Default
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="text-sm text-muted-foreground bg-muted px-3 py-2 rounded-lg">
                Jan 10, 2025 – Jan 16, 2025
              </div>
            </div>
          </div>

          {/* Quick Overview */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Metric Card 1 */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    [Metric]
                  </span>
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">347</span>
                  <div className="flex items-center gap-1 text-success">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">+100%</span>
                  </div>
                </div>
                <div className="mt-3 h-8 bg-muted rounded flex items-end gap-1 px-2">
                  <div className="w-2 bg-chart-1 h-2 rounded-sm"></div>
                  <div className="w-2 bg-chart-1 h-4 rounded-sm"></div>
                  <div className="w-2 bg-chart-1 h-3 rounded-sm"></div>
                  <div className="w-2 bg-chart-1 h-6 rounded-sm"></div>
                  <div className="w-2 bg-chart-1 h-5 rounded-sm"></div>
                </div>
              </div>

              {/* Metric Card 2 */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    [Metric]
                  </span>
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">482</span>
                  <div className="flex items-center gap-1 text-destructive">
                    <TrendingDown className="w-4 h-4" />
                    <span className="text-sm font-medium">-50%</span>
                  </div>
                </div>
                <div className="mt-3 h-8 bg-muted rounded flex items-end gap-1 px-2">
                  <div className="w-2 bg-chart-2 h-6 rounded-sm"></div>
                  <div className="w-2 bg-chart-2 h-4 rounded-sm"></div>
                  <div className="w-2 bg-chart-2 h-3 rounded-sm"></div>
                  <div className="w-2 bg-chart-2 h-2 rounded-sm"></div>
                  <div className="w-2 bg-chart-2 h-3 rounded-sm"></div>
                </div>
              </div>

              {/* Metric Card 3 */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    [Metric]
                  </span>
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">391</span>
                  <div className="flex items-center gap-1 text-success">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">+100%</span>
                  </div>
                </div>
                <div className="mt-3 h-8 bg-muted rounded flex items-end gap-1 px-2">
                  <div className="w-2 bg-chart-3 h-3 rounded-sm"></div>
                  <div className="w-2 bg-chart-3 h-5 rounded-sm"></div>
                  <div className="w-2 bg-chart-3 h-4 rounded-sm"></div>
                  <div className="w-2 bg-chart-3 h-6 rounded-sm"></div>
                  <div className="w-2 bg-chart-3 h-5 rounded-sm"></div>
                </div>
              </div>

              {/* Metric Card 4 */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    [Metric]
                  </span>
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">482</span>
                  <div className="flex items-center gap-1 text-destructive">
                    <TrendingDown className="w-4 h-4" />
                    <span className="text-sm font-medium">-50%</span>
                  </div>
                </div>
                <div className="mt-3 h-8 bg-muted rounded flex items-end gap-1 px-2">
                  <div className="w-2 bg-chart-4 h-5 rounded-sm"></div>
                  <div className="w-2 bg-chart-4 h-3 rounded-sm"></div>
                  <div className="w-2 bg-chart-4 h-4 rounded-sm"></div>
                  <div className="w-2 bg-chart-4 h-2 rounded-sm"></div>
                  <div className="w-2 bg-chart-4 h-4 rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Widgets Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Latest Reports Widget */}
            <div className="bg-card border border-border rounded-lg">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Latest Reports</h3>
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground pb-2 border-b border-border">
                    <span>Order</span>
                    <span>Status</span>
                    <span>Requester</span>
                    <span>Progress</span>
                  </div>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="grid grid-cols-4 gap-4 text-sm">
                      <span className="font-medium">
                        #2024-{String(i).padStart(3, "0")}
                      </span>
                      <span className="text-muted-foreground">Pending</span>
                      <span className="text-muted-foreground">User {i}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div
                            className={`bg-primary h-2 rounded-full`}
                            style={{ width: `${Math.random() * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {Math.floor(Math.random() * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Turnaround Time Widget */}
            <div className="bg-card border border-border rounded-lg">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Turnaround Time</h3>
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-end justify-between h-32 gap-2">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map(
                    (month, i) => (
                      <div
                        key={month}
                        className="flex flex-col items-center gap-2 flex-1"
                      >
                        <div
                          className="bg-chart-1 rounded-t w-full"
                          style={{ height: `${(i + 1) * 15 + 20}px` }}
                        ></div>
                        <span className="text-xs text-muted-foreground">
                          {month}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Orders by Status Widget */}
            <div className="bg-card border border-border rounded-lg">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Orders by Status</h3>
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="w-32 h-32 relative">
                    <div className="w-full h-full rounded-full border-8 border-chart-1"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">482</div>
                        <div className="text-xs text-muted-foreground">
                          Total
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 ml-6 space-y-3">
                    {[
                      { label: "Completed", value: 120, color: "bg-chart-1" },
                      { label: "Pending", value: 98, color: "bg-chart-2" },
                      { label: "Updated", value: 87, color: "bg-chart-3" },
                      { label: "Unordered", value: 65, color: "bg-chart-4" },
                      { label: "Reviewed", value: 54, color: "bg-chart-5" },
                      { label: "Archived", value: 58, color: "bg-chart-6" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${item.color}`}
                          ></div>
                          <span>{item.label}</span>
                        </div>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Assigned Tasks Widget */}
            <div className="bg-card border border-border rounded-lg">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Assigned Tasks</h3>
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      order: "#2024-001",
                      task: "Complete screening documentation for new client onboarding process",
                    },
                    {
                      order: "#2024-002",
                      task: "Review and update compliance procedures for Q1 audit",
                    },
                    {
                      order: "#2024-003",
                      task: "Process background check results and generate final reports",
                    },
                    {
                      order: "#2024-004",
                      task: "Coordinate with legal team on policy updates and implementations",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-medium text-sm">{item.order}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.task}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
