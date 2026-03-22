using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Data;
using TaskManager.Api.DTOs;
using TaskManager.Api.Models;

namespace TaskManager.Api.Services;

public class TaskService : ITaskService
{
    private readonly ApplicationDbContext _context;

    public TaskService(ApplicationDbContext context)
    {
        _context = context;
    }

    public IEnumerable<TaskDto> GetByProject(int projectId)
    {
        return _context.Tasks
            .Where(t => t.ProjectId == projectId)
            .Select(t => MapToDto(t))
            .ToList();
    }

    public TaskDto GetById(int id)
    {
        var task = _context.Tasks.Find(id)
            ?? throw new Exception("Task not found");

        return MapToDto(task);
    }

    public TaskDto Create(CreateTaskDto dto)
    {
        var task = new TaskItem
        {
            Title = dto.Title,
            Description = dto.Description,
            ProjectId = dto.ProjectId,
            AssignedToId = dto.AssignedToId,
            Priority = dto.Priority,
            Status = TaskStatus.Todo,
            DueDate = dto.DueDate
        };

        _context.Tasks.Add(task);
        _context.SaveChanges();

        return MapToDto(task);
    }

    public void UpdateStatus(int id, TaskStatus status)
    {
        var task = _context.Tasks.Find(id)
            ?? throw new Exception("Task not found");

        task.Status = status;
        _context.SaveChanges();
    }

    public void Delete(int id)
    {
        var task = _context.Tasks.Find(id);
        if (task == null) return;

        _context.Tasks.Remove(task);
        _context.SaveChanges();
    }

    private static TaskDto MapToDto(TaskItem t) => new()
    {
        Id = t.Id,
        Title = t.Title,
        Description = t.Description,
        Status = t.Status,
        Priority = t.Priority,
        ProjectId = t.ProjectId,
        AssignedToId = t.AssignedToId,
        CreatedAt = t.CreatedAt,
        DueDate = t.DueDate
    };
}