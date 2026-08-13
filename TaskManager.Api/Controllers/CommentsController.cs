using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Api.DTOs;
using TaskManager.Api.Services;

namespace TaskManager.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class CommentsController : ControllerBase
{
    private readonly ICommentService _commentService;

    public CommentsController(ICommentService commentService)
    {
        _commentService = commentService;
    }

    // GET /api/comments/task/5
    [HttpGet("task/{taskId}")]
    public IActionResult GetByTask(int taskId)
    {
        return Ok(_commentService.GetByTask(taskId));
    }

    // POST /api/comments
    [HttpPost]
    public IActionResult Create(CreateCommentDto dto)
    {
        var userId = int.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier)!
        );

        var comment = _commentService.Create(dto, userId);
        return CreatedAtAction(nameof(GetByTask), new { taskId = comment.TaskId }, comment);
    }
}