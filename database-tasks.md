# Database Tasks: Connecting .NET to PostgreSQL

This guide provides a step-by-step walkthrough for setting up your PostgreSQL database and connecting it to your .NET application using **Entity Framework (EF) Core**.

---

## Prerequisites
Before you start, make sure you have:
1. **PostgreSQL** installed and running on your machine.
2. Created a database (e.g., `task_management_db`) using the steps in the [PostgreSQL Database Guide](./Create-PostgreSQL-Database-Guide.md).

---

## Step 1: Install Required NuGet Packages

To use PostgreSQL with EF Core, you need specific "drivers" or packages. Open your terminal in your project's root folder (`TaskManagementAPI/`) and run these commands:

```bash
# The PostgreSQL provider for Entity Framework Core
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL

# Tools for creating migrations and scaffolding (needed for both approaches)
dotnet add package Microsoft.EntityFrameworkCore.Design
```

---

## Step 2: Configure the Connection String

A **Connection String** is a line of text that tells your application where the database is, what its name is, and how to log in.

Open your `appsettings.json` file and add a `ConnectionStrings` section:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=task_management_db;Username=postgres;Password=your_password_here"
  },
  "Jwt": {
    "Key": "THIS_IS_A_SUPER_SECRET_KEY_CHANGE_ME",
    ...
  }
}
```
*(Note: Replace `your_password_here` with the actual password you set during PostgreSQL installation!)*

---

## Step 3: Register the DbContext in Program.cs

Now, you need to tell your .NET application to use the connection string and the PostgreSQL driver.

In `Program.cs`, find where the `DbContext` is registered and update it to use `UseNpgsql`:

```csharp
// 1. Add this using statement at the top:
using Microsoft.EntityFrameworkCore;

// 2. Update the builder services:
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
```

---

## Step 4: Approach A - Code-First (Creating Tables from C#)

Use this if you have C# Model classes and want to create the database tables from them.

1. **Create an initial Migration:** This takes a "snapshot" of your current C# models.
   ```bash
   dotnet ef migrations add InitialCreate
   ```
2. **Apply the Migration:** This actually connects to PostgreSQL and creates the tables.
   ```bash
   dotnet ef database update
   ```

---

## Step 5: Approach B - Database-First (Reverse Engineering)

Use this if the database already exists (it has tables and columns) and you want to generate C# classes automatically. This is also called **Scaffolding**.

1. **Run the Scaffolding Command:** This command looks at the database and creates your Model classes and a `DbContext` for you.
   ```bash
   dotnet ef dbcontext scaffold "Host=localhost;Database=task_management_db;Username=postgres;Password=your_password_here" Npgsql.EntityFrameworkCore.PostgreSQL -o Models
   ```

**What the command does:**
- `"Host=..."`: This is your connection string.
- `Npgsql.EntityFrameworkCore.PostgreSQL`: This tells the tool to use the PostgreSQL driver.
- `-o Models`: This tells the tool to put the newly created C# classes into the "Models" folder.

---

## Summary of Commands

| Task | Command |
| :--- | :--- |
| **Add Migration** | `dotnet ef migrations add NameOfMigration` |
| **Update Database** | `dotnet ef database update` |
| **Scaffold (Reverse Engineer)** | `dotnet ef dbcontext scaffold "ConnectionString" Npgsql... -o Folder` |
| **Remove Migration** | `dotnet ef migrations remove` (if you made a mistake) |

**Further Reading:**
- [EF Core Docs: PostgreSQL Provider](https://www.npgsql.org/efcore/)
- [Microsoft Docs: EF Core Connection Strings](https://learn.microsoft.com/en-us/ef/core/miscellaneous/connection-strings)
- [Microsoft Docs: EF Core Scaffolding](https://learn.microsoft.com/en-us/ef/core/managing-schemas/scaffolding/)