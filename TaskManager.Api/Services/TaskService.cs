using TaskManager.Api.Data;
using TaskManager.Api.DTOs;
using TaskManager.Api.Models;
using TaskStatus = TaskManager.Api.Models.Enums.TaskStatus;

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
        var task = MapToModel(dto);

        _context.Tasks.Add(task);
        _context.SaveChanges();

        return MapToDto(task);
    }

    public void UpdateStatus(int id, string status)
    {
        var task = _context.Tasks.Find(id);

        if (task == null)
        {
            return;
        }

        task.Status = Enum.GetValues<TaskStatus>().FirstOrDefault(x => nameof(x) == status);
        _context.Tasks.Update(task);
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