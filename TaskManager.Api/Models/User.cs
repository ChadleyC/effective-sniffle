using System.ComponentModel.DataAnnotations;
using TaskManager.Api.Models;
public class User
{
    public int Id { get; set; }

    [Required]
    public string Email { get; set; } = string.Empty;

    public string? Username { get; set; }

    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<TaskItem> TaskItems { get; set; } = new List<TaskItem>();
}