using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Api.DTOs;
using TaskManager.Api.Services;
using TaskManager.Api.Models.Enums;

namespace TaskManager.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;

    public TasksController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    // GET /api/tasks/project/5
    [HttpGet("project/{projectId}")]
    public IActionResult GetByProject(int projectId)
    {
        return Ok(_taskService.GetByProject(projectId));
    }

    // GET /api/tasks/10
    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        return Ok(_taskService.GetById(id));
    }

    // POST /api/tasks
    [HttpPost]
    public IActionResult Create([FromBody] CreateTaskDto dto)
    {
        var task = _taskService.Create(dto);
        return CreatedAtAction(nameof(Get), new { id = task.Id }, task);
    }

    // PUT /api/tasks/10/status?status=Done
    [HttpPut("{id}/status")]
    public IActionResult UpdateStatus(int id, [FromQuery] TaskStatus status)
    {
        _taskService.UpdateStatus(id, status);
        return NoContent();
    }

    // DELETE /api/tasks/10
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _taskService.Delete(id);
        return NoContent();
    }
}