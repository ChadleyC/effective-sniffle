using System.ComponentModel.DataAnnotations;
using TaskManager.Api.Models.Enums;

namespace TaskManager.Api.DTOs;

public class CreateTaskDto
{
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = "";

    public string? Description { get; set; }

    [Required]
    public int ProjectId { get; set; }

    public int? AssignedToId { get; set; }

    public TaskPriority Priority { get; set; } = TaskPriority.Medium;

    public DateTime? DueDate { get; set; }
}