# How to Create a PostgreSQL Database

Since you have just learned PostgreSQL, the next step is creating your own database to store your application's data.

When you install PostgreSQL, it usually comes with a default database (often named `postgres`) and a default user (also named `postgres`). While you *can* use that default database, it is a best practice to create a brand new, separate database for every new application you build (like your `TaskManagementAPI`).

There are two main ways to create a database in PostgreSQL: using the command line (`psql`), or using a graphical user interface (GUI) like pgAdmin.

---

## Method 1: The Command Line (Using `psql`)

The command line is the most direct way to talk to your database server.

1. **Open your terminal or command prompt.**
2. **Connect to the PostgreSQL server.** You will use the `psql` command, specifying the default user `postgres`:
   ```bash
   psql -U postgres
   ```
   *You may be prompted to enter the password you set up when you installed PostgreSQL.*
3. **Write the SQL command.** Once you see the `postgres=#` prompt, you are inside the database shell. To create a new database, type the following SQL command and press Enter:
   ```sql
   CREATE DATABASE task_management_db;
   ```
   *(Important: Don't forget the semicolon `;` at the end! That tells PostgreSQL you are done typing the command).*
4. **Verify it was created.** You can list all the databases on your server by typing:
   ```sql
   \l
   ```
   You should see `task_management_db` in the list.
5. **Connect to your new database.** To start running commands inside your new database instead of the default one, type:
   ```sql
   \c task_management_db
   ```
   You should see a message saying you are now connected to database "task_management_db".
6. **Exit psql.** When you are done, type `\q` to quit and return to your normal terminal.

**Further Reading:**
- [PostgreSQL Official Docs: Creating a Database](https://www.postgresql.org/docs/current/tutorial-createdb.html)

---

## Method 2: Using a GUI (Like pgAdmin)

If you prefer pointing and clicking, a Graphical User Interface (GUI) is very helpful. **pgAdmin** is the most popular, free tool for managing PostgreSQL and is often installed alongside it.

1. **Open pgAdmin.**
2. **Connect to your server.** In the left-hand menu (the "Browser" pane), expand the **Servers** group. Click on your server (usually named something like "PostgreSQL 15" or "PostgreSQL 16"). You will likely need to enter your master password.
3. **Find the Databases folder.** Once connected, expand the server. You will see a folder icon labeled **Databases**.
4. **Create the Database.**
   - Right-click on the **Databases** folder.
   - Select **Create** > **Database...**
5. **Fill in the details.** A new window will pop up.
   - In the **General** tab, look for the **Database** field. Type in the name of your new database (e.g., `task_management_db`).
   - The **Owner** will default to `postgres`, which is fine for now.
6. **Save.** Click the **Save** button at the bottom of the window.
7. **Verify.** Look back at the left-hand menu. Expand the **Databases** folder, and you should now see your newly created `task_management_db` listed there! You can click on it to explore it.

**Further Reading:**
- [pgAdmin Official Docs: Creating a Database](https://www.pgadmin.org/docs/pgadmin4/development/database_dialog.html)

---

## What's Next?

Now that you have an empty database (e.g., `task_management_db`), the next step is connecting your .NET application to it!

In your `TaskManagementAPI`, you would update the "Connection String" found in your `appsettings.json` file to point to this new database, so your Code-First migrations know exactly where to create the tables.