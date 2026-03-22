using TaskManager.Api.Models.Enums;
using TaskStatus = TaskManager.Api.Models.Enums.TaskStatus;

namespace TaskManager.Api.DTOs;

public class TaskDto
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public TaskStatus Status { get; set; }

    public TaskPriority Priority { get; set; }

    public int ProjectId { get; set; }

    public int? AssignedToId { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime? DueDate { get; set; }
}