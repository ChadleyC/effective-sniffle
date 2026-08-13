using TaskManager.Api.DTOs;

namespace TaskManager.Api.Services;

public interface ICommentService
{
    IEnumerable<CommentDto> GetByTask(int taskId);
    CommentDto Create(CreateCommentDto dto, int userId);
}