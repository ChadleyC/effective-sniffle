using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Models;
using TaskManager.Api.Models.Enums;


namespace TaskManager.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<TaskItem> Tasks { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<TaskItem> TaskItem { get; set; }
        public DbSet<Comment> Comments { get; set; }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Configuration for relationships can be added here
             modelBuilder.Entity<TaskItem>()
        .Property(t => t.Status)
        .HasConversion<string>();

        modelBuilder.Entity<TaskItem>()
        .Property(t => t.Priority)
        .HasConversion<string>();
        }
    }
}
