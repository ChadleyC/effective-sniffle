# Feature Implementation Guide: Proper Dashboard with AG Grid

**Target audience**: Graduate / Junior Developer  
**Estimated time**: 3–5 hours

This guide will walk you through building a fully functional dashboard for the Task Manager app. By the end, you will have a persistent sidebar, a professional AG Grid table showing all tasks, and working column-level filters and sorting.

> **Before you start** — make sure the app runs with `npm run dev` and you can reach the `/dashboard` route in your browser.

---

## What You Are Building

```
┌──────────┬─────────────────────────────────────────────┐
│          │  Dashboard                                  │
│          │  ● 12 total  ● 4 done  ● 2 overdue         │
│ Sidebar  │─────────────────────────────────────────────│
│          │ [Status ▼]  [Priority ▼]  [ 🔍 Search ]   │
│ Dashboard│                                             │
│ Projects │  Title         Status    Priority  Due      │
│          │  ─────────────────────────────────────────  │
│          │  Fix login bug InProgress High      Mar 30  │
│          │  Write docs    Todo       Low       Apr 5   │
│          │  …                                          │
└──────────┴─────────────────────────────────────────────┘
```

---

## Overview of All Steps

| Step | What you will do |
|------|-----------------|
| 0 | Install AG Grid |
| 1 | Create a shared `Layout` component |
| 2 | Build the `Sidebar` with navigation links |
| 3 | Hook up `Layout` to the router in `App.tsx` |
| 4 | Add `getAllTasks()` to the task service |
| 5 | Update `Dashboard.tsx` with state + data fetching |
| 6 | Render the `TaskStats` summary bar |
| 7 | Add dropdown filters above the grid |
| 8 | Introduce AG Grid with column definitions |
| 9 | Add a custom Priority badge cell renderer |
| 10 | Style the layout and sidebar |

---

## Step 0: Install AG Grid

**Why?** AG Grid is a powerful data grid library. The free Community edition gives you sorting, filtering, and pagination with almost no configuration.

Open a terminal in the project root (`task-manager-app/`) and run:

```bash
npm install ag-grid-react ag-grid-community
```

**Verify the install** — open `package.json`. You should now see `ag-grid-react` and `ag-grid-community` in `dependencies`.

---

## Step 1: Create a Shared Layout Component

**Why?** Right now every page is completely isolated. If you want a sidebar to appear on every authenticated page, you need a shared wrapper. React Router v6 solves this using a *Layout Route* — a special route whose component wraps all its child routes and renders their content via `<Outlet />`.

### 1.1 — Create the folder and file

```
src/
  components/
    layout/           ← create this folder
      Layout.tsx      ← create this file
      Sidebar.tsx     ← you will create this in Step 2
```

### 1.2 — Write `Layout.tsx`

```tsx
// src/components/layout/Layout.tsx

import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

/**
 * Layout wraps every authenticated page.
 * <Outlet /> is where the child route's component gets rendered.
 * Think of it as a "slot" — the sidebar stays, the content swaps.
 */
const Layout = () => {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
```

> **Key concept – `<Outlet />`**: When a user navigates to `/dashboard`, React Router renders `Layout` and then fills the `<Outlet />` with the `<Dashboard />` component. The Sidebar never unmounts — only the content inside `<main>` changes.

---

## Step 2: Build the Sidebar

**Why?** A sidebar gives the user a persistent, clear way to navigate. We use `NavLink` (not plain `Link`) because it automatically adds an `active` CSS class to the currently active link — no JavaScript needed.

### 2.1 — Write `Sidebar.tsx`

```tsx
// src/components/layout/Sidebar.tsx

import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout, user } = useAuth();

  return (
    <aside className="sidebar">
      {/* App branding */}
      <div className="sidebar-brand">
        <h2>TaskFlow</h2>
        <p className="sidebar-user">{user?.email}</p>
      </div>

      {/* Navigation links */}
      <nav>
        <ul className="sidebar-nav">
          <li>
            {/*
              NavLink automatically applies class="active"
              when the current URL matches `to`.
              We use `end` on dashboard so it doesn't
              match every URL that starts with "/".
            */}
            <NavLink to="/dashboard" end>
              📊 Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects">
              📁 Projects
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Logout at the bottom */}
      <button className="sidebar-logout" onClick={logout}>
        Sign out
      </button>
    </aside>
  );
};

export default Sidebar;
```

> **🔑 Tip**: The `end` prop on the Dashboard `NavLink` is important. Without it, `/dashboard` would be considered "active" even when you are on `/projects`, because both paths start with `/`.

---

## Step 3: Hook Up the Layout in the Router

**Why?** The router in `App.tsx` needs to know that `Layout` wraps your authenticated pages.

### 3.1 — Open `src/App.tsx`

Currently it looks like this:

```tsx
<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/projects/:id" element={<ProjectDetails />} />
  <Route path="/" element={<Navigate to="/dashboard" replace />} />
</Routes>
```

### 3.2 — Refactor to use `Layout`

```tsx
// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import Layout from './components/layout/Layout'; // ← import Layout

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes — no sidebar */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/*
            Layout route — any routes nested inside here
            will be rendered inside Layout's <Outlet />.
            The sidebar will be visible on all of them.
          */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
```

> **Check your work**: Run the app. You should see a blank sidebar appear next to the dashboard content. The sidebar should also be visible when you navigate to a project page.

---

## Step 4: Update the Task Service

**Why?** The current `getAllTasks()` does not exist yet — `taskService.ts` only has `getTasks(projectId)`, which fetches tasks for *one* project. The dashboard needs *all* tasks, regardless of project.

### 4.1 — Open `src/services/taskService.ts`

Add `getAllTasks` at the bottom:

```typescript
// src/services/taskService.ts

import type { Task } from "../types/Task";
import API from "./api";

// Existing functions — do not remove these
export const getTasks = async (projectId: number): Promise<Task[]> => {
  const res = await API.get(`/tasks/project/${projectId}`);
  return res.data;
};

export const createTask = async (task: Partial<Task>) => {
  const res = await API.post("/tasks", task);
  return res.data;
};

export const updateTaskStatus = async (id: number, status: string) => {
  const res = await API.patch(`/tasks/${id}/status`, { status });
  return res.data;
};

export const deleteTask = async (id: number) => {
  await API.delete(`/tasks/${id}`);
};

// ─── NEW FUNCTION ────────────────────────────────────────
/**
 * Fetches all tasks across every project for the current user.
 * The backend must have a GET /tasks endpoint for this to work.
 */
export const getAllTasks = async (): Promise<Task[]> => {
  const res = await API.get('/tasks');
  return res.data;
};
```

> **Note for the backend developer**: Make sure `GET /api/tasks` is implemented and returns all tasks associated with the logged-in user. It should use the JWT from the `Authorization` header to scope the results. If this endpoint does not exist yet, you can temporarily return mock data (see the tip below).

> **💡 Tip — mock data while the backend is being built**: If the backend endpoint is not ready, you can return fake data during development:
> ```typescript
> export const getAllTasks = async (): Promise<Task[]> => {
>   // TODO: replace with real API call when backend is ready
>   return [
>     { id: 1, title: 'Fix login bug', status: 'InProgress', priority: 'High',
>       description: '', projectId: 1, createdAt: '2024-01-01' },
>     { id: 2, title: 'Write tests', status: 'Todo', priority: 'Medium',
>       description: '', projectId: 1, createdAt: '2024-01-02' },
>   ];
> };
> ```

---

## Step 5: Rebuild Dashboard.tsx — State and Data Fetching

**Why?** The current `Dashboard.tsx` is almost empty (it only renders an `<h1>`). We need to add React state to hold tasks, a loading flag, and the current filter values, then fetch data when the component mounts.

### 5.1 — Understand the hooks you will use

| Hook | Purpose |
|------|---------|
| `useState` | Store mutable values (tasks list, loading flag, filter values) |
| `useEffect` | Trigger the API call once when the component first renders |
| `useMemo` | Compute the filtered task list without re-running on every render |

### 5.2 — Replace `Dashboard.tsx` with this skeleton

```tsx
// src/pages/Dashboard.tsx

import { useState, useEffect, useMemo } from 'react';
import type { Task } from '../types/Task';
import { getAllTasks } from '../services/taskService';
import TaskStats from '../components/TaskStats';

const Dashboard = () => {
  // ── State ────────────────────────────────────────────────
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state — empty string means "show all"
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  // ── Data fetching ────────────────────────────────────────
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await getAllTasks();
        setTasks(data);
      } catch (err) {
        setError('Failed to load tasks. Is the backend running?');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []); // The empty array means "only run once, when the component mounts"

  // ── Filtered data ────────────────────────────────────────
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const statusMatch = statusFilter ? task.status === statusFilter : true;
      const priorityMatch = priorityFilter ? task.priority === priorityFilter : true;
      return statusMatch && priorityMatch;
    });
  }, [tasks, statusFilter, priorityFilter]);

  // ── Render ───────────────────────────────────────────────
  if (loading) return <p className="loading-message">Loading tasks…</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>

      {/* Step 6: TaskStats summary bar — add in next step */}

      {/* Step 7: Filters — add in next step */}

      {/* Step 8: AG Grid — add in next step */}
    </div>
  );
};

export default Dashboard;
```

> **Check your work**: The page should now render with a "Loading tasks…" message, and then either show the dashboard heading or an error if the API is unreachable.

---

## Step 6: Add the TaskStats Summary Bar

**Why?** The `TaskStats` component already exists in `src/components/TaskStats.tsx`. It accepts a `tasks` prop and shows total, completed, and overdue counts. Always reuse existing components before creating new ones.

### 6.1 — Import and render `TaskStats`

Replace the comment in `Dashboard.tsx` with:

```tsx
{/* Reuse the existing TaskStats component */}
<TaskStats tasks={tasks} />
```

#### What `TaskStats` does internally (for reference)

```tsx
const total = tasks.length;
const completed = tasks.filter(t => t.status === 'Done').length;
const overdue = tasks.filter(
  t => new Date(t.dueDate!) < new Date() && t.status !== 'Done'
).length;
```

> **Note**: Pass `tasks` (the *unfiltered* array) to `TaskStats` so the stats always reflect the full picture, regardless of what filters are applied to the grid.

---

## Step 7: Add Dropdown Filters

**Why?** While AG Grid has built-in column filters (activated via right-click), providing explicit dropdowns above the grid is better UX — users can see what filters are active at a glance.

### 7.1 — Add the filter bar inside Dashboard

Replace the filter comment with:

```tsx
<div className="filter-bar">
  {/* Status filter */}
  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="">All Statuses</option>
    <option value="Todo">Todo</option>
    <option value="InProgress">In Progress</option>
    <option value="Done">Done</option>
  </select>

  {/* Priority filter */}
  <select
    value={priorityFilter}
    onChange={(e) => setPriorityFilter(e.target.value)}
  >
    <option value="">All Priorities</option>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>

  {/* Reset button */}
  <button
    onClick={() => { setStatusFilter(''); setPriorityFilter(''); }}
  >
    Clear Filters
  </button>
</div>
```

> **How it works**: Every time a dropdown changes, React re-runs the `useMemo` computation (because `statusFilter` or `priorityFilter` changed), which produces a new `filteredTasks` array. The grid then re-renders automatically with the new data.

---

## Step 8: Render the AG Grid

**Why?** AG Grid is a best-in-class table library. It handles sorting, column resizing, built-in filters, and pagination — features that would take days to build from scratch.

### 8.1 — Core concepts

| Concept | What it does |
|---------|-------------|
| `columnDefs` | An array of objects that describe each column |
| `rowData` | The array of data objects (your `filteredTasks`) |
| `field` | The key on your data object to display in that column |
| `filter` | Enables the built-in column filter |
| `sortable` | Enables click-to-sort on the column header |
| `flex` | Makes the column grow to fill available space (like CSS flex) |

### 8.2 — Define the columns

Add this *outside* the component function (it never changes):

```tsx
// Define once outside the component — this array never changes
const columnDefs = [
  {
    field: 'title',
    headerName: 'Task Title',
    filter: true,       // text search filter
    sortable: true,
    flex: 3,            // takes up 3x as much space as flex:1 columns
  },
  {
    field: 'status',
    headerName: 'Status',
    filter: 'agSetColumnFilter', // checkbox filter (shows unique values)
    flex: 1,
  },
  {
    field: 'priority',
    headerName: 'Priority',
    sortable: true,
    flex: 1,
  },
  {
    field: 'dueDate',
    headerName: 'Due Date',
    flex: 1,
  },
  {
    field: 'projectId',
    headerName: 'Project',
    flex: 1,
  },
];
```

### 8.3 — Import AG Grid and render it

At the top of the file, add:

```tsx
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
```

Replace the AG Grid comment in the JSX with:

```tsx
{/* AG Grid table */}
<div
  className="ag-theme-alpine"
  style={{ height: 500, width: '100%' }}
>
  <AgGridReact
    rowData={filteredTasks}    // The data to display (already filtered)
    columnDefs={columnDefs}    // How to display each column
    pagination={true}          // Show page controls at the bottom
    paginationPageSize={10}    // 10 rows per page
    defaultColDef={{           // Shared defaults for ALL columns
      resizable: true,         // User can drag to resize columns
    }}
  />
</div>
```

> **Check your work**: You should now see a table with your tasks. Try clicking a column header — it should sort. Right-click a column header — you should see a filter menu.

### 8.4 — Complete Dashboard.tsx at this point

For reference, the complete file should look like this:

```tsx
// src/pages/Dashboard.tsx

import { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import type { Task } from '../types/Task';
import { getAllTasks } from '../services/taskService';
import TaskStats from '../components/TaskStats';

// Column definitions — defined outside component so they are not
// re-created on every render
const columnDefs = [
  { field: 'title', headerName: 'Task Title', filter: true, sortable: true, flex: 3 },
  { field: 'status', headerName: 'Status', filter: 'agSetColumnFilter', flex: 1 },
  { field: 'priority', headerName: 'Priority', sortable: true, flex: 1 },
  { field: 'dueDate', headerName: 'Due Date', flex: 1 },
  { field: 'projectId', headerName: 'Project', flex: 1 },
];

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await getAllTasks();
        setTasks(data);
      } catch (err) {
        setError('Failed to load tasks. Is the backend running?');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const statusMatch = statusFilter ? task.status === statusFilter : true;
      const priorityMatch = priorityFilter ? task.priority === priorityFilter : true;
      return statusMatch && priorityMatch;
    });
  }, [tasks, statusFilter, priorityFilter]);

  if (loading) return <p className="loading-message">Loading tasks…</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>

      <TaskStats tasks={tasks} />

      <div className="filter-bar">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="Todo">Todo</option>
          <option value="InProgress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button onClick={() => { setStatusFilter(''); setPriorityFilter(''); }}>
          Clear Filters
        </button>
      </div>

      <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
        <AgGridReact
          rowData={filteredTasks}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          defaultColDef={{ resizable: true }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
```

---

## Step 9: Custom Cell Renderer — Priority Badge

**Why?** Right now the Priority column just shows the text "High", "Medium", or "Low". A coloured badge makes the priority immediately visible at a glance. This step teaches you how to inject a custom React component into a grid cell.

### 9.1 — Create the cell renderer

Create a new file `src/components/PriorityBadge.tsx`:

```tsx
// src/components/PriorityBadge.tsx

/**
 * AG Grid passes a `value` prop to cell renderers automatically.
 * `value` will be the raw cell value, e.g. "High".
 */
const PriorityBadge = ({ value }: { value: string }) => {
  const colourMap: Record<string, string> = {
    High: '#ef4444',    // red
    Medium: '#f59e0b',  // amber
    Low: '#22c55e',     // green
  };

  const colour = colourMap[value] ?? '#6b7280';

  return (
    <span style={{
      backgroundColor: colour,
      color: 'white',
      padding: '2px 8px',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: 600,
    }}>
      {value}
    </span>
  );
};

export default PriorityBadge;
```

### 9.2 — Register it in the column definition

Back in `Dashboard.tsx`, update the priority column definition:

```tsx
import PriorityBadge from '../components/PriorityBadge';

// In columnDefs:
{
  field: 'priority',
  headerName: 'Priority',
  sortable: true,
  flex: 1,
  cellRenderer: PriorityBadge, // ← point to the component
},
```

> **How it works**: AG Grid will call `PriorityBadge({ value: 'High' })` for every cell in this column, and render whatever JSX you return.

---

## Step 10: Styling the Layout

**Why?** The layout needs CSS so the sidebar sits to the left and the content fills the rest of the viewport.

### 10.1 — Add layout styles to `src/index.css`

Append these classes to the *bottom* of `index.css`:

```css
/* ── App Shell ───────────────────────────────────── */
.app-shell {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

/* ── Sidebar ─────────────────────────────────────── */
.sidebar {
  width: 240px;
  min-height: 100vh;
  background-color: #1e1e2e;
  color: #cdd6f4;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  gap: 1.5rem;
  flex-shrink: 0;
}

.sidebar-brand h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #cba6f7;
}

.sidebar-user {
  font-size: 0.75rem;
  color: #6c7086;
  margin: 0;
  margin-top: 0.25rem;
}

.sidebar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar-nav a {
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  color: #cdd6f4;
  text-decoration: none;
  transition: background 0.15s;
}

.sidebar-nav a:hover,
.sidebar-nav a.active {
  background-color: #313244;
  color: #cba6f7;
}

.sidebar-logout {
  margin-top: auto;
  background: transparent;
  border: 1px solid #45475a;
  color: #cdd6f4;
  cursor: pointer;
  border-radius: 8px;
  padding: 0.5rem;
  width: 100%;
}

/* ── Main Content ────────────────────────────────── */
.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

/* ── Dashboard Page ──────────────────────────────── */
.dashboard-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.filter-bar {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
}

.filter-bar select {
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #45475a;
  background-color: #313244;
  color: #cdd6f4;
  font-size: 0.875rem;
}

/* ── Utility ─────────────────────────────────────── */
.loading-message,
.error-message {
  padding: 2rem;
  text-align: center;
}

.error-message {
  color: #f38ba8;
}
```

> **Note on the app's dark theme**: The existing `index.css` sets the app background to `#242424`. These new classes use a similar dark palette to remain consistent.

---

## Troubleshooting

| Problem | Likely cause | Fix |
|---------|-------------|-----|
| Sidebar does not appear | `Layout` not in `App.tsx` routes | Check Step 3 |
| Grid is blank | `rowData` is empty | Check that `getAllTasks()` returns data; use mock data from Step 4 tip |
| AG Grid looks unstyled | CSS imports missing | Make sure both `ag-grid.css` and `ag-theme-alpine.css` are imported |
| TypeScript error on `columnDefs` | Inline `columnDefs` missing types | Add `ColDef[]` type: `const columnDefs: ColDef[] = [...]` (import `ColDef` from `ag-grid-community`) |
| Priority badge not rendering | `cellRenderer` typo | Make sure you used `cellRenderer: PriorityBadge` (not a string) |

---

## Success Criteria Checklist

- [ ] `npm run dev` runs without errors
- [ ] A sidebar appears on the Dashboard page with working links
- [ ] The sidebar **does not** appear on the Login or Register pages
- [ ] Active sidebar link is highlighted
- [ ] `TaskStats` bar shows total, completed, and overdue counts
- [ ] The AG Grid table renders all tasks
- [ ] Clicking a column header sorts the rows
- [ ] The Status and Priority dropdowns filter the rows
- [ ] "Clear Filters" button resets both dropdowns
- [ ] Priority column shows coloured badges
- [ ] Pagination controls appear at the bottom of the grid
- [ ] Layout is responsive and the sidebar does not overlap content

---

## What You Learned

By completing this feature, you have practised:

- **React Router v6 Layout Routes** — nesting routes inside a shared wrapper
- **`<Outlet />`** — rendering child page content inside a layout
- **`NavLink`** — automatic active-state CSS classes for nav links
- **`useState` / `useEffect` / `useMemo`** — React's core hooks for state, side effects, and derived data
- **Error and loading states** — graceful handling of async API calls
- **AG Grid basics** — `rowData`, `columnDefs`, `pagination`, `sortable`, `filter`
- **AG Grid cell renderers** — injecting custom React components into table cells
- **CSS Flexbox layout** — building a sidebar + content shell
