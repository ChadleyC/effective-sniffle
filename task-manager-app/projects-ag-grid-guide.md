# Feature Implementation Guide: Projects Grid (AG Grid)

**Target audience**: Graduate / Junior Developer  
**Design Philosophy**: [Corporate Minimalism](./docs/DESIGN.md)  
**Estimated time**: 3–4 hours

This guide will walk you through implementing **AG Grid** in the Projects view (`src/pages/Projects.tsx`). While the Dashboard provides a high-level executive summary, the Projects view requires a powerful, data-dense grid for sorting, filtering, and managing project data.

---

## What You Are Building

You are replacing the standard project list with a robust data grid. Features include:
- A full-width **AG Grid** table displaying all projects.
- Built-in sorting and column filtering.
- Custom cell renderers for Status/Progress using Tailwind CSS tokens.
- Styling overrides to make AG Grid match our Corporate Minimalism design system.

---

## Step 1: Install AG Grid

If AG Grid is not already installed in the project, open a terminal in the `task-manager-app/` directory and run:

```bash
npm install ag-grid-react ag-grid-community
```

---

## Step 2: Define Columns

**Why?** AG Grid needs to know what data to display and how to display it. We define `columnDefs` outside the component so they aren't recreated on every render.

Create your column definitions in `src/pages/Projects.tsx`:

```tsx
import { ColDef } from 'ag-grid-community';

// Define outside the component
const columnDefs: ColDef[] = [
  { 
    field: 'name', 
    headerName: 'Project Name', 
    flex: 2, 
    filter: true,
    cellRenderer: (params: any) => (
      <span className="font-bold text-primary">{params.value}</span>
    )
  },
  { 
    field: 'description', 
    headerName: 'Description', 
    flex: 3,
    filter: true 
  },
  { 
    field: 'ownerId', 
    headerName: 'Owner ID', 
    flex: 1 
  },
  { 
    field: 'createdAt', 
    headerName: 'Created Date', 
    flex: 1,
    valueFormatter: (params) => new Date(params.value).toLocaleDateString()
  },
  {
    headerName: 'Actions',
    flex: 1,
    sortable: false,
    filter: false,
    cellRenderer: (params: any) => (
      <button 
        className="text-primary hover:text-primary-container font-label-md"
        onClick={() => window.location.href = `/projects/${params.data.id}`}
      >
        VIEW
      </button>
    )
  }
];
```

---

## Step 3: Integrate AG Grid into the Page

**Why?** We need to fetch the project data from our backend and feed it into the `AgGridReact` component.

Update `src/pages/Projects.tsx`:

```tsx
import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import PageLayout from '../components/layout/PageLayout';
import { projectService } from '../services/projectService';
import type { Project } from '../types';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <PageLayout>
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="font-h1 text-h1 text-on-surface">Projects Portfolio</h1>
          <p className="font-body-base text-slate-500 mt-1">Manage and track all active initiatives.</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-label-md hover:bg-primary-container transition-colors">
          NEW PROJECT
        </button>
      </div>

      <div className="bg-surface rounded-lg shadow-sm border border-outline overflow-hidden">
        {/* The AG Grid wrapper must have a defined height and the theme class */}
        <div className="ag-theme-alpine corporate-grid" style={{ height: '600px', width: '100%' }}>
          <AgGridReact
            rowData={projects}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={15}
            defaultColDef={{
              sortable: true,
              resizable: true,
            }}
            loadingOverlayComponent={() => <div className="p-4">Loading data...</div>}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default Projects;
```

---

## Step 4: Styling AG Grid (Corporate Minimalism)

**Why?** The default `ag-theme-alpine` is good, but it doesn't quite match our `DESIGN.md`. We need to use CSS variables to map AG Grid's colors to our Tailwind design tokens.

Add the following CSS to `src/index.css` (or `src/App.css`):

```css
/* Corporate Minimalism overrides for AG Grid Alpine Theme */
.corporate-grid.ag-theme-alpine {
  /* Surface and Backgrounds */
  --ag-background-color: #ffffff;
  --ag-header-background-color: #faf8ff;
  --ag-odd-row-background-color: #faf8ff;
  
  /* Borders */
  --ag-borders: solid 1px;
  --ag-border-color: #c3c6d7;
  --ag-row-border-color: #c3c6d7;
  
  /* Typography */
  --ag-font-family: 'Inter', sans-serif;
  --ag-font-size: 14px;
  --ag-header-foreground-color: #434655; /* on-surface-variant */
  --ag-data-color: #191b23; /* on-surface */
  
  /* Primary Accents */
  --ag-checkbox-checked-color: #004ac6;
  --ag-range-selection-border-color: #004ac6;
  --ag-row-hover-color: #f0f4ff;
  
  /* Radii */
  --ag-border-radius: 8px;
  --ag-wrapper-border-radius: 8px;
}

/* Remove border from the very top to blend with our custom card wrapper */
.corporate-grid.ag-theme-alpine .ag-root-wrapper {
  border: none;
}

.corporate-grid.ag-theme-alpine .ag-header-cell-label {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 0.05em;
}
```

---

## Success Criteria Checklist

- [ ] `npm install ag-grid-react ag-grid-community` runs successfully.
- [ ] `Projects.tsx` renders the grid inside the `PageLayout` component.
- [ ] Columns are defined correctly and sortable.
- [ ] The "Actions" column contains a working "VIEW" button.
- [ ] The CSS overrides in `index.css` apply our Corporate Minimalism colors (Inter font, #faf8ff headers, #004ac6 accents).
- [ ] Data successfully populates from `projectService.getProjects()`.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Grid is invisible/height is 0 | Ensure the wrapper `<div>` around `<AgGridReact>` has an explicit height (e.g., `style={{ height: '600px' }}`). |
| Styles not applying | Ensure both `ag-grid.css` and `ag-theme-alpine.css` are imported in the component, and `index.css` is imported in `main.tsx`. |
| Type errors on `columnDefs` | Ensure you import `ColDef` from `ag-grid-community` and type the array: `const columnDefs: ColDef[] = [...]`. |
