using TaskManager.Api.Data;
using TaskManager.Api.DTOs;
using TaskManager.Api.Models;
using TaskStatus = TaskManager.Api.Models.Enums.TaskStatus;

namespace TaskManager.Api.Services;

public class TaskService(ApplicationDbContext context) : ITaskService
{
    public IEnumerable<TaskDto> GetByProject(int projectId)
    {
        return context.Tasks
            .Where(t => t.ProjectId == projectId)
            .Select(t => MapToDto(t))
            .ToList();
    }

    public TaskDto GetById(int id)
    {
        var task = context.Tasks.Find(id)
            ?? throw new Exception("Task not found");

        return MapToDto(task);
    }

    public TaskDto Create(CreateTaskDto dto)
    {
        var task = MapToModel(dto);

        context.Tasks.Add(task);
        context.SaveChanges();

        return MapToDto(task);
    }

    public void UpdateStatus(int id, TaskStatus status)
    {
        var task = context.Tasks.Find(id);

        if (task == null)
        {
            return;
        }

        task.Status = status;
        context.Tasks.Update(task);
        context.SaveChanges();
    }

    public void Delete(int id)
    {
        var task = context.Tasks.Find(id);
        if (task == null) return;

        context.Tasks.Remove(task);
        context.SaveChanges();
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

    private static TaskItem MapToModel(CreateTaskDto dto) => new()
    {
        Title = dto.Title,
        Description = dto.Description,
        Priority = dto.Priority,
        ProjectId = dto.ProjectId,
        AssignedToId = dto.AssignedToId,
        CreatedAt = DateTime.UtcNow,
        DueDate = dto.DueDate,
        Status = dto.Status
    };
}