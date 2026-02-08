Based on the research and your mentee's existing skills, I've designed a comprehensive full-stack project that will effectively teach Web API, TypeScript, and React while building on their C#, Flutter, and SQL foundation.

## Project: Task Management System with Team Collaboration

A full-stack task management application where users can create projects, assign tasks, track progress, and collaborate with team members. This project covers all the essential concepts while being practical enough for a portfolio piece.

## Why This Project Works

This project is ideal because it demonstrates CRUD operations, authentication, real-time updates, database relationships, and modern web development practices—all highly valued by employers. It builds directly on your mentee's C# and SQL knowledge while introducing the new technologies systematically.[1][2]

## Technology Stack

**Backend:**
- C# ASP.NET Core Web API (.NET 6 or later)
- Entity Framework Core for database access
- SQL Server for data storage
- JWT authentication

**Frontend:**
- React 18 with TypeScript
- React Router for navigation
- Axios for API calls
- Context API or Redux (optional) for state management

## Phase-by-Phase Learning Plan

### Phase 1: Backend - Web API Setup (Week 1)

**Learning Goals:** Understand REST principles, API structure, dependency injection, Entity Framework

**Tasks:**
1. Create new ASP.NET Core Web API project
2. Set up project structure (Controllers, Models, Services, Data folders)
3. Configure Entity Framework Core and create database context
4. Design database schema with these entities:
   - Users (Id, Username, Email, PasswordHash, CreatedAt)
   - Projects (Id, Name, Description, OwnerId, CreatedAt)
   - Tasks (Id, Title, Description, Status, Priority, ProjectId, AssignedToId, DueDate, CreatedAt)
   - Comments (Id, Content, TaskId, UserId, CreatedAt)
5. Create migrations and seed initial data
6. Implement basic CRUD endpoints for Projects

**Deliverables:**
- Working API that can create, read, update, and delete projects
- Database with proper relationships and constraints
- Tested endpoints using Swagger/Postman

### Phase 2: Backend - Advanced API Features (Week 2)

**Learning Goals:** DTOs, validation, error handling, authentication, authorization

**Tasks:**
1. Create DTOs (Data Transfer Objects) for request/response models
2. Implement AutoMapper for entity-to-DTO mapping
3. Add model validation using Data Annotations
4. Implement global exception handling middleware
5. Set up JWT authentication
6. Create authentication endpoints (Register, Login)
7. Add authorization attributes to protected endpoints
8. Implement CRUD for Tasks and Comments
9. Add filtering and sorting capabilities (e.g., get tasks by status, priority)
10. Implement pagination for list endpoints

**Deliverables:**
- Secure API with JWT authentication
- Complete CRUD operations for all entities
- Proper error responses and validation
- Comprehensive API documentation

### Phase 3: Frontend - React & TypeScript Basics (Week 3)

**Learning Goals:** TypeScript fundamentals, React component structure, hooks, routing

**Tasks:**
1. Create React app with TypeScript template (`npx create-react-app task-manager --template typescript`)
2. Install dependencies (react-router-dom, axios, @types packages)[3]
3. Set up folder structure:
   - `/components` - reusable UI components
   - `/pages` - page-level components
   - `/services` - API service layer
   - `/types` - TypeScript interfaces and types
   - `/context` - authentication context
   - `/utils` - helper functions
4. Create TypeScript interfaces for all data models matching backend DTOs
5. Set up React Router with routes for Login, Register, Dashboard, Project Details
6. Create authentication service with login/register functions
7. Implement authentication context for managing user state
8. Build Login and Register pages with forms
9. Add protected route wrapper component

**Deliverables:**
- Working authentication flow
- Type-safe API service layer
- Basic routing structure
- Reusable form components

### Phase 4: Frontend - Core Features (Week 4)

**Learning Goals:** State management, API integration, form handling, TypeScript with React hooks

**Tasks:**
1. Create API service functions for all endpoints with proper TypeScript typing[3]
2. Build Projects Dashboard page:
   - List all projects in cards/table
   - Add "Create Project" button with modal/form
   - Edit and delete project functionality
3. Create Project Details page:
   - Display project information
   - Show task list for the project
   - Filter tasks by status (Todo, In Progress, Done)
   - Sort tasks by priority or due date
4. Build Task components:
   - Task creation form with validation
   - Task card component showing details
   - Task status update (drag-drop or dropdown)
   - Task assignment to users
   - Due date picker
5. Implement Comments section:
   - Display comments on tasks
   - Add new comment form
   - Real-time comment updates
6. Add loading states and error handling
7. Create reusable components (Button, Input, Modal, Card, etc.)

**Deliverables:**
- Fully functional task management interface
- Type-safe components with proper props typing
- Smooth user experience with loading/error states
- Clean, reusable component architecture

### Phase 5: Polish & Advanced Features (Week 5)

**Learning Goals:** Performance optimization, advanced TypeScript patterns, testing basics

**Tasks:**
1. Add search functionality for tasks and projects
2. Implement task statistics dashboard (total tasks, completed, overdue)
3. Add user profile page with editable information
4. Create responsive design for mobile devices
5. Add input validation and user feedback (toast notifications)
6. Implement optimistic UI updates
7. Add environment configuration for API URLs
8. Write basic unit tests for critical functions
9. Optimize performance (React.memo, useMemo, useCallback)
10. Improve accessibility (ARIA labels, keyboard navigation)

**Deliverables:**
- Production-ready application
- Responsive design working on all devices
- Performance optimizations implemented
- Basic test coverage

## Project Structure

### Backend Structure
```
TaskManagementAPI/
├── Controllers/
│   ├── AuthController.cs
│   ├── ProjectsController.cs
│   ├── TasksController.cs
│   └── CommentsController.cs
├── Models/
│   ├── User.cs
│   ├── Project.cs
│   ├── Task.cs
│   └── Comment.cs
├── DTOs/
│   ├── LoginDto.cs
│   ├── RegisterDto.cs
│   ├── ProjectDto.cs
│   └── TaskDto.cs
├── Services/
│   ├── IAuthService.cs
│   └── AuthService.cs
├── Data/
│   └── ApplicationDbContext.cs
├── Middleware/
│   └── ErrorHandlingMiddleware.cs
└── Program.cs
```

### Frontend Structure
```
task-manager-app/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Modal.tsx
│   │   ├── projects/
│   │   │   ├── ProjectCard.tsx
│   │   │   └── ProjectForm.tsx
│   │   └── tasks/
│   │       ├── TaskCard.tsx
│   │       ├── TaskForm.tsx
│   │       └── TaskList.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   └── ProjectDetails.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── projectService.ts
│   │   └── taskService.ts
│   ├── types/
│   │   ├── User.ts
│   │   ├── Project.ts
│   │   └── Task.ts
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── utils/
│   │   └── helpers.ts
│   └── App.tsx
```

## GitHub Repository Structure

**README.md should include:**
- Project overview and features
- Technology stack
- Setup instructions (both backend and frontend)
- API endpoints documentation
- Screenshots/GIFs of the application
- Future enhancements

**Separate folders:**
- `/backend` - API project
- `/frontend` - React application
- `/docs` - Additional documentation, database schema diagram

## Key Learning Outcomes

**Web API Skills:**
- RESTful API design principles
- HTTP methods and status codes
- Request/response handling
- Authentication and authorization
- Error handling and validation
- API documentation

**TypeScript Skills:**
- Type annotations and interfaces
- Generics for reusable code
- Type inference
- Union and intersection types
- Working with external libraries' types

**React Skills:**
- Functional components and hooks (useState, useEffect, useContext)
- Component composition and props
- Conditional rendering
- Form handling and validation
- Routing with React Router
- API integration with Axios

## Teaching Tips

1. **Start with API first:** This allows your mentee to test endpoints independently before frontend integration
2. **Use Postman/Swagger extensively:** Document and test every endpoint thoroughly
3. **Introduce TypeScript gradually:** Start with basic types, then move to interfaces and generics[3]
4. **Code reviews at each phase:** Review code together before moving to the next phase
5. **Encourage documentation:** Have them write comments and README sections as they build
6. **Git best practices:** Create feature branches, write meaningful commit messages, use pull requests

## Extensions for Advanced Learning

Once the core project is complete, consider these additions:
- WebSocket implementation for real-time task updates
- File attachments for tasks
- Email notifications for task assignments
- Dark mode theme toggle
- Export projects/tasks to PDF
- Integration with external calendar APIs
- Docker containerization for deployment

This project provides a solid foundation for your mentee's portfolio while teaching industry-standard practices in a structured, achievable way. The progressive complexity ensures they master fundamentals before tackling advanced concepts.[2]

Sources
[1] Tutorial: How to Use C# with React and TypeScript https://kenny-designs.github.io/articles/2022-06-05-csharp-react-typescript-tutorial.html
[2] 12 Full-Stack Project Ideas for Your Portfolio https://www.frontendmentor.io/articles/full-stack-project-ideas
[3] Using TypeScript - Reactreact.dev › learn › typescript https://react.dev/learn/typescript
[4] BUILD A TYPESCRIPT REACT API PROJECT USING A WEATHER API. ReactJS, TypeScript, TailwindCSS, Fetch https://www.youtube.com/watch?v=6MKFKwwhbNo
[5] React Tutorial using TypeScript https://handsonreact.com/docs/labs/react-tutorial-typescript
[6] Top 15+ TypeScript Projects with Source Code https://www.guvi.in/blog/top-typescript-projects-for-all-beginners/
[7] Backend project ideas for a typescript learner https://www.reddit.com/r/typescript/comments/y8kxmw/backend_project_ideas_for_a_typescript_learner/
[8] How to Build a Strong Portfolio as a Full Stack Developer in 2026 https://www.seedinfotech.com/how-to-build-a-strong-portfolio-as-a-full-stack-developer-in-2026/
[9] Top 15 TypeScript Projects With Source Code - GeeksforGeeks https://www.geeksforgeeks.org/typescript/typescript-projects/
[10] 🔴 Learning React with TypeScript by Building an API app https://www.youtube.com/watch?v=mYE2-btCMBg
