using System.ComponentModel.DataAnnotations;
using TaskManager.Api.Models.Enums;
using TaskStatus = TaskManager.Api.Models.Enums.TaskStatus;

namespace TaskManager.Api.Models;

public class TaskItem
{
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    // Todo | InProgress | Done  (we’ll convert to enum next step)
    [Required]
    public TaskStatus Status { get; set; } = TaskStatus.Todo;

    // Low | Medium | High
    [Required]
    public TaskPriority Priority { get; set; } = TaskPriority.Medium;

    // 🔗 Project relationship
    public int ProjectId { get; set; }
    public Project Project { get; set; } = null!;

    // 🔗 Assigned user (optional)
    public int? AssignedToId { get; set; }
    public User? AssignedTo { get; set; }

    public required DateTime? DueDate { get; set; }
    public required  DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // 🔗 Comments
    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
}