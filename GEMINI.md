# Task Management System - Context & Guidelines

This project is a comprehensive full-stack task management application designed to teach modern web development using .NET and React.

## Project Overview

*   **Purpose:** A collaborative task management system where users can create projects, assign tasks, and track progress.
*   **Architecture:**
    *   **Backend:** ASP.NET Core Web API (.NET 10) following a RESTful pattern.
    *   **Frontend:** React 19 Single Page Application (SPA) built with Vite and TypeScript.
    *   **Database:** PostgreSQL managed via Entity Framework Core (Code-First migrations).
    *   **Authentication:** JWT (JSON Web Token) based authentication.

## Building and Running

### Backend (`TaskManager.Api/`)
*   **Target Framework:** .NET 10.0
*   **Prerequisites:** .NET 10 SDK, PostgreSQL server.
*   **Configuration:** 
    *   Ensure a PostgreSQL database named `task_management_db` is created.
    *   Add a connection string in `appsettings.json` or `appsettings.Development.json` under `ConnectionStrings:DefaultConnection`.
*   **Commands:**
    ```bash
    cd TaskManager.Api
    dotnet restore
    dotnet build
    dotnet run     # or dotnet watch
    ```
*   **API Documentation:** Available at `http://localhost:5188/swagger` in development mode.

### Frontend (`task-manager-app/`)
*   **Framework:** React 19 + Vite + TypeScript.
*   **Prerequisites:** Node.js (LTS).
*   **Configuration:**
    *   API URL is configured via environment variables (default: `http://localhost:5000/api`).
*   **Commands:**
    ```bash
    cd task-manager-app
    npm install
    npm run dev
    ```

## Development Conventions

### Backend (`TaskManager.Api`)
*   **Coding Style:** Uses modern C# features (.NET 10), including file-scoped namespaces and global usings.
*   **Structure:**
    *   `Controllers/`: API endpoints handling HTTP requests.
    *   `Services/`: Business logic and orchestration.
    *   `Models/`: Entity Framework entities representing database tables.
    *   `DTOs/`: Data Transfer Objects for API request/response contracts.
    *   `Data/`: DbContext and migration configurations.
*   **Naming:** PascalCase for classes and methods; camelCase for local variables.
*   **Patterns:** Dependency Injection for services; asynchronous programming (`async/await`) for I/O operations.

### Frontend (`task-manager-app`)
*   **Framework:** React 19 Functional Components with Hooks.
*   **State Management:** React Context API for global state (e.g., `AuthContext`).
*   **API Integration:** Axios instances configured in `src/services/api.ts`.
*   **TypeScript:** Strict typing for props, state, and API responses. Interfaces are located in `src/types/`.
*   **Routing:** React Router 7 for navigation and protected routes.
*   **Styling:** Vanilla CSS (`App.css`, `index.css`).

## Key Files & Documentation
*   `README.md`: High-level project plan and learning goals.
*   `howtostart.md`: Detailed setup instructions.
*   `Database-Implementation-Guide.md`: Educational guide on EF Core (Code-First vs. Database-First).
*   `Create-PostgreSQL-Database-Guide.md`: Instructions for setting up the PostgreSQL database.
*   `TaskManager.Api/Program.cs`: Backend entry point and service registration.
*   `task-manager-app/src/App.tsx`: Frontend main entry point and routing configuration.
