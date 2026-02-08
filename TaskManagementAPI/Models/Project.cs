namespace TaskManagementAPI.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int OwnerId { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation properties
        public User Owner { get; set; }
        public ICollection<Task> Tasks { get; set; }
    }
}
