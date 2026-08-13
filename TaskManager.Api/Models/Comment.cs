namespace TaskManager.Api.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public required string Content { get; set; }
        public int TaskId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation properties
        public TaskItem? TaskItem { get; set; }
        public User? User { get; set; }
    }
}
