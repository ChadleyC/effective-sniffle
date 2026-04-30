# TaskFlow Design System: Corporate Minimalism

This document defines the visual language and implementation standards for the TaskFlow application, based on the **Corporate Minimalism** design philosophy. It bridges the gap between the high-fidelity UIUX prototypes and the React/Tailwind implementation.

## Core Principles

- **Precision:** Every element is aligned to an 8px grid.
- **Hierarchy:** Contrast in weight and color differentiates primary actions from secondary metadata.
- **Focus:** Intentional whitespace reduces cognitive load for power users.

## Design Tokens (Tailwind Mapping)

### Colors
These tokens should be added to the `tailwind.config.js` `theme.extend.colors` object.

| Category | Token | Value | Usage |
| :--- | :--- | :--- | :--- |
| **Foundation** | `background` | `#faf8ff` | Global body background |
| | `surface` | `#ffffff` | Cards, sidebars, modals |
| | `outline` | `#c3c6d7` | Borders and dividers |
| **Primary** | `primary` | `#004ac6` | Main brand color, buttons |
| | `primary-container` | `#2563eb` | Secondary active states |
| **Neutral** | `on-surface` | `#191b23` | High-emphasis text |
| | `on-surface-variant`| `#434655` | Medium-emphasis text / labels |
| **Semantic** | `success` | `#10b981` | Completed states |
| | `warning` | `#f59e0b` | In-progress / at-risk items |
| | `error` | `#ba1a1a` | High priority / overdue |

### Typography
Font Family: **Inter** (sans-serif)

| Style | Tailwind Class | Size | Weight |
| :--- | :--- | :--- | :--- |
| **Heading 1** | `font-h1 text-h1` | `32px` | `700` |
| **Heading 2** | `font-h2 text-h2` | `24px` | `600` |
| **Heading 3** | `font-h3 text-h3` | `20px` | `600` |
| **Body Base** | `font-body-base` | `16px` | `400` |
| **Body Small** | `font-body-sm` | `14px` | `400` |
| **Label MD** | `font-label-md` | `13px` | `600` (All Caps) |

### Spacing & Shapes
- **Base Unit:** `8px`
- **Border Radius:** `8px` (`rounded-lg`) for cards/buttons; `full` for avatars/badges.
- **Shadow:** `shadow-sm` (0px 2px 4px rgba(0,0,0,0.05)) for Level 1 elevation.

---

## Component Strategy (React)

### UI Primitives (`src/components/ui/`)
Low-level components that follow the "Flat UI" philosophy. They accept `className` overrides but default to design system tokens.

- `<Button variant="primary | secondary | ghost" />`
- `<Badge variant="success | warning | error | info" />`
- `<Card />`
- `<Avatar src={...} size="sm | md | lg" stacked />`
- `<InputField label="..." icon="..." />`

### Feature Components (`src/components/features/`)
Domain-aware components that compose UI primitives.

- `<TaskCard task={task} />`
- `<ProjectCard project={project} />`
- `<ActivityItem activity={activity} />`
- `<KanbanColumn title="Todo" count={4} />`

### Layout Shells (`src/components/layout/`)
Global structural components.

- `<SideNavBar />`: Fixed 280px sidebar.
- `<TopNavBar />`: Fixed 64px header with search and user profile.
- `<PageContainer />`: Main canvas with responsive padding (32px on desktop).

---

## Implementation Checklist
1. Install Tailwind CSS and Tailwind Forms/Container Queries plugins.
2. Update `tailwind.config.js` with the token table above.
3. Import `Inter` font in `index.html`.
4. Create the `src/components/ui` folder for primitives.
5. Create the `src/components/layout` shell.
6. Refactor `src/pages/Dashboard.tsx` to match the `dashboard_overview` layout.
7. Refactor `src/pages/ProjectDetails.tsx` to match the `kanban_task_board` layout.
