# Kanban Board Implementation Plan

## Goal

Create a working Kanban board experience for the task manager front-end app and ensure the API surface can supply the data and update operations that the board needs.

## Current State

The application already has a project details route that renders a three-column task summary. That route is close to the Kanban board shape, but it is currently static and not wired to a full board workflow. The API already exposes the basic task operations, but the status update path is not aligned with the enum contract that the DTO and model use.

## Implementation Plan

### Front-end

1. Capture the current project page as the board page.
   - Use the existing project detail screen at [task-manager-app/src/pages/ProjectDetails.tsx](../../task-manager-app/src/pages/ProjectDetails.tsx) as the primary board surface.
   - Load the selected project ID from the route params and fetch the associated tasks through the API client.

2. Render the visible board columns.
   - Build a status map for `Todo`, `InProgress`, and `Done`.
   - Display each status bucket as a column and count the number of tasks in each one.
   - Keep the existing card design and show the board-specific headers with board-friendly labels.

3. Support boarding behavior.
   - Add card drag-and-drop on the board so a task can move from one status column to another.
   - When a drop is complete, call the API update-status operation with the new enum value.
   - Re-render the board after a successful status response.

4. Add creation flow.
   - Add a create-task CTA to the board or a modal that posts to the existing task endpoint.
   - The board should stabilize around one entry point for creating a task that belongs to the selected project.

### API

1. Confirm task collection and detail endpoints exist.
   - `GET /api/tasks/project/{projectId}` returns all tasks for a project.
   - `GET /api/tasks/{id}` returns a single task.

2. Confirm task creation endpoint exists.
   - `POST /api/tasks` accepts a `CreateTaskDto` payload and returns the newly created task shape.

3. Correct and expose status movement.
   - `PUT /api/tasks/{id}/status` is the board’s day-one status update operation.
   - The API must accept a real task status enum value and map it to the database-backed `TaskStatus` field.

4. Keep delete support as a stop-gap board action.
   - `DELETE /api/tasks/{id}` can remain available for board cleanup and card removal flows.

## Required API Contract

The Kanban board relies on the following API contract:

- `GET /api/tasks/project/{projectId}`
- `GET /api/tasks/{id}`
- `POST /api/tasks`
- `PUT /api/tasks/{id}/status`
- `DELETE /api/tasks/{id}`

The client-side task model should continue to use the enum shape already represented in the task type and DTOs.

## Root-cause note

The existing controller for task status updates currently pushes `nameof(status)` down into the service call instead of the status value itself. That means the API is passing the parameter name rather than the selected enum. The back-end service should accept the status enum directly and save it to the task record.

## Acceptance Criteria

- The board reads project tasks from the API and draws three visible board columns.
- The board can move a task from one status column to another.
- The board posts a new task payload through the API to persist new work.
- The status update endpoint stores the selected status instead of a mismatched string contract.
