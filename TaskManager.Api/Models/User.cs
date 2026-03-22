using System.ComponentModel.DataAnnotations;
using TaskManager.Api.Models;
public class User
{
    public int Id { get; set; }

    [Required]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    public required ICollection<TaskItem> TaskItem { get; set; } = new List<TaskItem>();
}