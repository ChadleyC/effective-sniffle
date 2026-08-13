namespace TaskManager.Api.DTOs;

public class CreateCommentDto
{
    public string Content { get; set; } = string.Empty;
    public int TaskId { get; set; }
}