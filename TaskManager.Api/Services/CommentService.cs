using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Data;
using TaskManager.Api.DTOs;
using TaskManager.Api.Models;

namespace TaskManager.Api.Services;

public class CommentService(ApplicationDbContext context) : ICommentService
{
    public IEnumerable<CommentDto> GetByTask(int taskId)
    {
        return context.Comments
            .Where(c => c.TaskId == taskId)
            .OrderBy(c => c.CreatedAt)
            .Select(c => new CommentDto
            {
                Id = c.Id,
                Content = c.Content,
                TaskId = c.TaskId,
                UserId = c.UserId,
                Username = c.User != null ? c.User.Username ?? c.User.Email : null,
                CreatedAt = c.CreatedAt
            })
            .ToList();
    }

    public CommentDto Create(CreateCommentDto dto, int userId)
    {
        var comment = new Comment
        {
            Content = dto.Content,
            TaskId = dto.TaskId,
            UserId = userId,
            CreatedAt = DateTime.UtcNow,
        };

        context.Comments.Add(comment);
        context.SaveChanges();

        return MapToDto(comment);
    }

    private static CommentDto MapToDto(Comment c) => new()
    {
        Id = c.Id,
        Content = c.Content,
        TaskId = c.TaskId,
        UserId = c.UserId,
        Username = c.User?.Username ?? c.User?.Email,
        CreatedAt = c.CreatedAt
    };
}