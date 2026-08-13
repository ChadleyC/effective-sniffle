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

    [Required]
    public TaskStatus Status { get; set; } = TaskStatus.Todo;

    [Required]
    public TaskPriority Priority { get; set; } = TaskPriority.Medium;

    public int ProjectId { get; set; }
    public Project Project { get; set; } = null!;

    public int? AssignedToId { get; set; }
    public User? AssignedTo { get; set; }

    public DateTime? DueDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
}