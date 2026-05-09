# Feature Implementation Guide: Executive Dashboard

**Target audience**: Graduate / Junior Developer  
**Design Philosophy**: [Corporate Minimalism](./docs/DESIGN.md)  
**Estimated time**: 4–6 hours

This guide will walk you through building the **Executive Overview** dashboard. Unlike a simple data table, this dashboard provides high-level visibility into throughput, project velocity, and team activity using a clean, professional "Corporate Minimalism" aesthetic.

---

## What You Are Building

You are implementing a dashboard that looks like a premium SaaS product. It features:
- A persistent **SideNavBar** (280px) and **TopNavBar** (64px).
- A **StatsGrid** showing key performance indicators (KPIs).
- A "Velocity Trends" visualizer (simulated with CSS/Tailwind bars).
- A "Team Activity" feed for real-time collaboration context.

---

## Overview of All Steps

| Step | What you will do |
|------|-----------------|
| 1 | Set up the `PageLayout` shell |
| 2 | Configure navigation in `SideNavBar` |
| 3 | Build the `StatsGrid` and `StatCard` primitives |
| 4 | Implement `ProjectCard` for the dashboard view |
| 5 | Create the "Velocity Trends" CSS visualization |
| 6 | Build the "Team Activity" feed |
| 7 | Integrate real data from services |

---

## Step 1: The Page Layout Shell

**Why?** In Corporate Minimalism, consistent spacing is critical. We use a global `PageLayout` component that handles the fixed sidebar and top bar, providing a predictable "canvas" for every page.

### 1.1 — Review `src/components/layout/PageLayout.tsx`

```tsx
const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <TopNavBar />
      <SideNavBar />
      <main className="ml-[280px] mt-16 p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
```

**Key Points:**
- `ml-[280px]`: Offsets the main content to account for the fixed sidebar.
- `mt-16`: Offsets the content for the 64px top bar.
- `max-w-7xl`: Prevents the content from stretching too wide on ultra-wide monitors.

---

## Step 2: Key Performance Indicators (StatsGrid)

**Why?** Users need to see the "big picture" immediately. We use `StatCard` components to highlight counts for Total, In Progress, Completed, and Overdue tasks.

### 2.1 — The `StatCard` Primitive

Create `src/components/features/tasks/StatsGrid.tsx`. Each card should use Tailwind's semantic colors from our `DESIGN.md`:

```tsx
const StatCard = ({ label, value, trendValue, icon, iconColor, iconBg }: StatCardProps) => (
  <Card className="p-6 flex flex-col justify-between h-32">
    <div className="flex justify-between items-start">
      <span className="text-slate-500 font-label-md uppercase tracking-wider">{label}</span>
      <div className={`${iconBg} p-1.5 rounded-lg`}>
        <span className={`material-symbols-outlined ${iconColor} text-xl`}>{icon}</span>
      </div>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-bold text-slate-900">{value}</span>
      {trendValue && (
        <span className="text-xs font-bold px-1.5 py-0.5 rounded-md text-emerald-600 bg-emerald-50">
          {trendValue}
        </span>
      )}
    </div>
  </Card>
);
```

---

## Step 3: Velocity Trends Visualization

**Why?** Charts can be heavy. For a dashboard, simple CSS-based bar charts often provide enough context with zero performance overhead.

### 3.1 — Implementation

Inside your `Dashboard.tsx`, create a trend container:

```tsx
<Card className="p-6">
  <div className="flex items-center justify-between mb-6">
    <h2 className="font-h2 text-h2">Velocity Trends</h2>
  </div>
  <div className="w-full h-64 flex items-end justify-between gap-2 px-2">
    {data.map((val, i) => (
      <div key={i} className="flex flex-col items-center gap-2 w-full">
        <div className="w-full bg-slate-100 rounded-t-lg" style={{ height: `${val.planned}%` }}></div>
        <div className="w-full bg-primary rounded-t-lg" style={{ height: `${val.actual}%` }}></div>
        <span className="text-[10px] font-bold text-slate-400">{val.day}</span>
      </div>
    ))}
  </div>
</Card>
```

---

## Step 4: Data Integration

**Why?** Hardcoded mock data is for prototyping. Real dashboards fetch from the API.

### 4.1 — Fetching Projects and Tasks

Update `src/pages/Dashboard.tsx` to use the `useEffect` hook and our service layer:

```tsx
import { projectService } from '../services/projectService';
import { taskService } from '../services/taskService';

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    const loadData = async () => {
      const data = await projectService.getProjects();
      setProjects(data.slice(0, 2)); // Only show most recent 2
    };
    loadData();
  }, []);

  // ... render logic
}
```

---

## Step 5: Styling with Design Tokens

Ensure you are using the tokens defined in `tailwind.config.js`:

- **Primary Brand:** `text-primary`, `bg-primary`
- **Surface:** `bg-surface`
- **Text:** `text-on-surface` (High emphasis), `text-slate-500` (Medium emphasis)
- **Typography:** `font-h1` (32px), `font-h2` (24px)

---

## Success Criteria Checklist

- [ ] `PageLayout` properly wraps the dashboard with correct offsets.
- [ ] `StatsGrid` uses Material Symbols and matches the `DESIGN.md` color palette.
- [ ] `ProjectCard` displays project metadata correctly.
- [ ] `Velocity Trends` chart is responsive and scales with container width.
- [ ] `ActivityItem` distinguishes between "User" actions and "System" (Automation) events.
- [ ] Data is fetched from the backend services (or gracefully handles empty states).
- [ ] All typography uses the **Inter** font-family and proper font-weights.

---

## Troubleshooting

| Problem | Likely cause | Fix |
|---------|-------------|-----|
| Content hidden under sidebar | `ml-[280px]` missing on `<main>` | Add margin-left to main content area |
| Icons not appearing | Material Symbols not linked | Ensure `<link>` tag for Material Symbols is in `index.html` |
| Fonts look "wrong" | `tailwind.config.js` not updated | Add `h1`, `h2`, `body-base` to `extend.fontFamily` |
| Layout shifts on load | `loading` state not handled | Add a `Skeleton` loader or basic loading spinner |
