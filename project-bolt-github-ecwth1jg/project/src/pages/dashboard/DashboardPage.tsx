import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { PlusIcon, CalendarIcon, ReceiptIcon, UploadIcon, ArrowRightIcon, DollarSignIcon, UsersIcon, AlertCircleIcon, CheckIcon, XIcon, FileTextIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for admin dashboard
const pendingEvents = [
  {
    id: 1,
    name: "Marketing Summit",
    organizer: "Jane Wilson",
    date: "May 20, 2025",
    budget: 18000,
    status: "pending",
  },
  {
    id: 2,
    name: "Team Building Retreat",
    organizer: "John Doe",
    date: "June 5, 2025",
    budget: 12000,
    status: "pending",
  }
];

const pendingBills = [
  {
    id: 1,
    description: "Venue Booking",
    event: "Annual Conference 2025",
    organizer: "John Doe",
    amount: 5000,
    date: "April 15, 2025",
  },
  {
    id: 2,
    description: "Catering Deposit",
    event: "Product Launch",
    organizer: "Alice Smith",
    amount: 2500,
    date: "April 18, 2025",
  }
];

const organizerStats = [
  {
    id: 1,
    name: "John Doe",
    eventsCount: 3,
    totalBudget: 45000,
    spentAmount: 28000,
  },
  {
    id: 2,
    name: "Alice Smith",
    eventsCount: 2,
    totalBudget: 30000,
    spentAmount: 15000,
  }
];

// Mock data for organizer dashboard
const myEvents = [
  {
    id: 1,
    name: "Annual Conference",
    date: "April 15, 2025",
    budget: 12000,
    spent: 8500,
    status: "approved",
    remainingTasks: 3,
  },
  {
    id: 2,
    name: "Team Building Workshop",
    date: "April 22, 2025",
    budget: 5000,
    spent: 1200,
    status: "pending",
    remainingTasks: 5,
  }
];

const myExpenses = [
  {
    id: 1,
    description: "Venue Deposit",
    event: "Annual Conference",
    amount: 5000,
    date: "April 5, 2025",
    status: "approved",
    category: "Venue",
  },
  {
    id: 2,
    description: "Catering Advance",
    event: "Annual Conference",
    amount: 2500,
    date: "April 2, 2025",
    status: "pending",
    category: "Catering",
  }
];

const upcomingDeadlines = [
  {
    id: 1,
    task: "Submit Venue Contract",
    event: "Annual Conference",
    dueDate: "April 10, 2025",
    priority: "high",
  },
  {
    id: 2,
    task: "Finalize Menu Selection",
    event: "Annual Conference",
    dueDate: "April 12, 2025",
    priority: "medium",
  }
];

const AdminDashboard = () => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Events</CardDescription>
            <CardTitle className="text-3xl">12</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              8 active, 4 pending
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Budget Allocated</CardDescription>
            <CardTitle className="text-3xl">$125,000</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Across all events
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Approvals</CardDescription>
            <CardTitle className="text-3xl">6</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              2 events, 4 bills
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Organizers</CardDescription>
            <CardTitle className="text-3xl">5</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Managing 12 events
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pending Event Approvals</CardTitle>
            <CardDescription>Events awaiting your review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingEvents.map((event) => (
                <div key={event.id} className="flex flex-col space-y-2 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <div className="font-medium">{event.name}</div>
                    </div>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Organizer: {event.organizer}</div>
                    <div>Date: {event.date}</div>
                    <div>Budget: ${event.budget.toLocaleString()}</div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" className="w-full">
                      <CheckIcon className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive" className="w-full">
                      <XIcon className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Bills</CardTitle>
            <CardDescription>Bills requiring your approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingBills.map((bill) => (
                <div key={bill.id} className="flex flex-col space-y-2 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileTextIcon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{bill.description}</div>
                        <div className="text-sm text-muted-foreground">{bill.event}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${bill.amount.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{bill.date}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" className="w-full">View Bill</Button>
                    <Button size="sm" className="w-full">Approve</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Organizer Overview</CardTitle>
            <CardDescription>Performance and budget utilization by organizer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {organizerStats.map((organizer) => (
                <div key={organizer.id} className="flex flex-col space-y-2 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{organizer.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{organizer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {organizer.eventsCount} events
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        ${organizer.spentAmount.toLocaleString()} / ${organizer.totalBudget.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {Math.round((organizer.spentAmount / organizer.totalBudget) * 100)}% utilized
                      </div>
                    </div>
                  </div>
                  <Progress 
                    value={(organizer.spentAmount / organizer.totalBudget) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/events">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Review Events
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/allocations">
                  <DollarSignIcon className="mr-2 h-4 w-4" />
                  Allocate Funds
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/users">
                  <UsersIcon className="mr-2 h-4 w-4" />
                  Manage Users
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/reports">
                  <FileTextIcon className="mr-2 h-4 w-4" />
                  View Reports
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

const OrganizerDashboard = () => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Events</CardDescription>
            <CardTitle className="text-3xl">2</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              1 approved, 1 pending
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Available Budget</CardDescription>
            <CardTitle className="text-3xl">$7,300</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Remaining from $17,000
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Tasks</CardDescription>
            <CardTitle className="text-3xl">8</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              3 high priority
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Bills</CardDescription>
            <CardTitle className="text-3xl">3</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Awaiting approval
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>My Events</CardTitle>
            <CardDescription>Your active events and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myEvents.map((event) => (
                <div key={event.id} className="flex flex-col space-y-2 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{event.name}</div>
                        <div className="text-sm text-muted-foreground">{event.date}</div>
                      </div>
                    </div>
                    <Badge className={event.status === "approved" ? "bg-green-500" : "bg-amber-500"}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Budget Utilization</span>
                      <span>${event.spent.toLocaleString()} / ${event.budget.toLocaleString()}</span>
                    </div>
                    <Progress value={(event.spent / event.budget) * 100} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{event.remainingTasks} tasks remaining</span>
                      <span>{Math.round((event.spent / event.budget) * 100)}% spent</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2" asChild>
                    <Link to={`/events/${event.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
            <CardDescription>Latest expenses and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myExpenses.map((expense) => (
                <div key={expense.id} className="flex flex-col space-y-2 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ReceiptIcon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{expense.description}</div>
                        <div className="text-sm text-muted-foreground">{expense.event}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${expense.amount.toLocaleString()}</div>
                      <Badge className={expense.status === "approved" ? "bg-green-500" : "bg-amber-500"}>
                        {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Category: {expense.category}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Tasks requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-2 h-2 rounded-full ${
                      task.priority === "high" ? "bg-red-500" : 
                      task.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                    }`} />
                    <div>
                      <div className="font-medium">{task.task}</div>
                      <div className="text-sm text-muted-foreground">{task.event}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{task.dueDate}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {task.priority} priority
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for event management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/events/new">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Create Event
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/expenses/new">
                  <ReceiptIcon className="mr-2 h-4 w-4" />
                  Record Expense
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/bills/upload">
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Upload Bill
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/reports">
                  <FileTextIcon className="mr-2 h-4 w-4" />
                  View Reports
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default function DashboardPage() {
  // Mock user for demonstration - in a real app, this would come from auth context
  const user = {
    name: "John Doe",
    role: "organizer", // or "organizer"
  };
  
  const isAdmin = user.role === "admin";

  return (
    <AppShell>
      <PageHeader
        title={`Welcome back, ${user.name}`}
        description={isAdmin 
          ? "Manage funds, review events, and track financial activities" 
          : "Create events, track expenses, and manage your budget"}
      >
        {isAdmin ? (
          <Button asChild>
            <Link to="/allocations">
              <DollarSignIcon className="mr-2 h-4 w-4" />
              Allocate Funds
            </Link>
          </Button>
        ) : (
          <Button asChild>
            <Link to="/events/new">
              <PlusIcon className="mr-2 h-4 w-4" />
              Create Event
            </Link>
          </Button>
        )}
      </PageHeader>

      {isAdmin ? <AdminDashboard /> : <OrganizerDashboard />}
    </AppShell>
  );
}