# How to Start the Task Management System

This guide explains how to set up and run the backend (ASP.NET Core Web API) and frontend (React + TypeScript) applications.

## Prerequisites

-   **[.NET 9.0 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)**: Required for the backend.
-   **[Node.js](https://nodejs.org/)**: Required for the frontend (LTS version recommended).

---

## 1. Backend Setup (ASP.NET Core Web API)

The backend provides the API for the application. It runs on `http://localhost:5188` (HTTP) and `https://localhost:7083` (HTTPS).

1.  Open your terminal and navigate to the `TaskManagementAPI` directory:
    ```bash
    cd TaskManagementAPI
    ```

2.  Restore the .NET packages:
    ```bash
    dotnet restore
    ```

3.  Run the application:
    ```bash
    dotnet run
    ```
    Alternatively, if you want to run it with hot-reload:
    ```bash
    dotnet watch
    ```

4.  Verify it's running:
    -   Open your browser to: `http://localhost:5188/swagger`. You should see the Swagger UI documentation.

---

## 2. Frontend Setup (React + TypeScript)

The frontend is a React application built with Vite. It typically runs on `http://localhost:5173`.

1.  Open a **new** terminal window and navigate to the `task-manager-app` directory:
    ```bash
    cd task-manager-app
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Verify it's running:
    -   Open your browser to the URL shown in the terminal (usually `http://localhost:5173`).

---

## 3. Database Note

The current project uses an in-memory or local database configuration (skeleton phase). Ensure any required database services (like SQL Server) are running if you proceed to implementation phases that require persistence.

## Project Structure Overview

-   `TaskManagementAPI/`: Contains the C# backend code.
-   `task-manager-app/`: Contains the React frontend code.
