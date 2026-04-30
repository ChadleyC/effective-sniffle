---
name: Task Management Design System
colors:
  surface: '#faf8ff'
  surface-dim: '#d9d9e5'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fe'
  surface-container: '#ededf9'
  surface-container-high: '#e7e7f3'
  surface-container-highest: '#e1e2ed'
  on-surface: '#191b23'
  on-surface-variant: '#434655'
  inverse-surface: '#2e3039'
  inverse-on-surface: '#f0f0fb'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#faf8ff'
  on-background: '#191b23'
  surface-variant: '#e1e2ed'
typography:
  h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: '0'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  gutter: 24px
  margin: 32px
---

## Brand & Style

The design system is built upon the principles of **Corporate Minimalism**. It is designed to empower power users and project managers by reducing cognitive load through extreme clarity and intentional whitespace. The personality is authoritative yet unobtrusive—a silent partner in the user's productivity.

The visual style prioritizes functional aesthetics, utilizing a "Modern Corporate" aesthetic that leans on precision, balanced proportions, and a systematic approach to information hierarchy. The interface aims to feel like a high-performance tool: reliable, fast, and organized.

## Colors

The palette is centered around a high-utility **Professional Blue**, serving as the primary driver for actions and focus states. The foundational layer utilizes a range of **Slate Grays** to create a sophisticated, low-fatigue environment for long-term use.

Semantic colors are strictly reserved for status communication:
- **Success (Green):** Represents completed tasks and positive milestones.
- **Warning (Amber):** Indicates tasks in progress or items requiring attention.
- **Error (Red):** Flags high-priority blockers or overdue deadlines.

Backgrounds use the lightest slate shades to differentiate the workspace from the navigation, while text adheres to the darker slate values to ensure AAA accessibility.

## Typography

This design system utilizes **Inter** for its exceptional legibility and systematic weights. The type scale is optimized for data-heavy environments, ensuring that even at smaller sizes (12px-14px), task titles and metadata remain crisp.

- **Headlines:** Use tighter letter spacing and heavier weights to provide clear section entry points.
- **Body Text:** Standardizes on a 16px base for readability, with 14px reserved for secondary information and sidebar elements.
- **Labels:** Small, uppercase labels are used for category headers or status indicators to provide visual contrast against standard body text.

## Layout & Spacing

The layout employs a **Fluid Grid** system with a fixed-width sidebar (280px) for global navigation. The main content area utilizes a 12-column grid that adapts to the viewport, ensuring that Kanban boards and list views utilize all available horizontal real estate.

The spacing rhythm is built on an **8px base unit**. This 1:1 relationship between the spacing unit and the corner radius creates a cohesive visual harmony. Use `24px` (lg) for major container padding and `16px` (md) for internal component spacing to maintain a sense of airiness even when data density is high.

## Elevation & Depth

Depth is conveyed through **Tonal Layering** supplemented by **Ambient Shadows**. This design system avoids heavy gradients, opting instead for subtle elevation cues:

1.  **Level 0 (Surface):** The main application background, using Slate 50.
2.  **Level 1 (Cards/Sidebar):** Pure white (#ffffff) containers with a 1px border (Slate 200) and a very soft, diffused shadow (0px 2px 4px rgba(0,0,0,0.05)).
3.  **Level 2 (Popovers/Modals):** Floating elements with a more pronounced shadow (0px 10px 15px rgba(0,0,0,0.1)) to indicate a change in the interaction layer.

Interactive elements like task cards should subtly increase shadow depth on hover to provide tactile feedback.

## Shapes

The design system adheres to a consistent **8px (0.5rem) radius** for all primary components, including cards, input fields, and buttons. This "Rounded" setting strikes a balance between the clinical feel of sharp corners and the overly casual nature of pill-shapes.

Exceptions to this rule:
- **Avatars:** Always 100% circular to distinguish human elements from functional UI.
- **Status Badges:** Use a "pill" radius (999px) to clearly identify them as non-interactive metadata tags.

## Components

### Cards
Task cards are the primary vessel for information. They feature a white background, 8px rounded corners, and a Slate 200 border. Internal padding is strictly 16px.

### Status Badges
Badges use a background-tint approach. For example, a "Done" badge uses a 10% opacity Green background with 100% opacity Green text. This ensures the status is visible without competing with the primary call-to-action blue.

### Avatars
Team member avatars are 32px or 40px circles. When grouped, they should overlap slightly (stacking effect) with a 2px white stroke to maintain separation.

### Buttons
- **Primary:** Solid Professional Blue with white text.
- **Secondary:** White background with Slate 200 border and Slate 700 text.
- **Ghost:** No background or border, used for low-priority actions in toolbars.

### Navigation Elements
The sidebar uses a dark-on-light or light-on-dark approach depending on the brand implementation, but must feature a 4px vertical "active" indicator in Professional Blue on the left edge of the selected navigation item.

### Input Fields
Inputs use an 8px radius and a 1px Slate 200 border that transitions to a 2px Professional Blue border on focus, accompanied by a soft blue outer glow.