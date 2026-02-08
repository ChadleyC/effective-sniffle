namespace TaskManagementAPI.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Status { get; set; } // Todo, InProgress, Done
        public string Priority { get; set; } // Low, Medium, High
        public DateTime? DueDate { get; set; }
        public int ProjectId { get; set; }
        public int? AssignedToId { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation properties
        public Project Project { get; set; }
        public User AssignedTo { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}
